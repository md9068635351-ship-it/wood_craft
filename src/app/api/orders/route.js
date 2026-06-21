import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cleanString, databaseUnavailable, isEmail, isPhone, jsonError, optionalString } from "@/lib/api";
import { getCustomerSession } from "@/lib/auth";

function makeOrderNumber() {
  return `WC${Date.now().toString(36).toUpperCase()}${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
}

export async function POST(request) {
  if (!prisma) return databaseUnavailable(new Error("DATABASE_URL is not configured"));
  const session = getCustomerSession();
  if (!session) return jsonError("Please sign in before placing an order", 401);
  let body;
  try { body = await request.json(); } catch { return jsonError("Invalid JSON body"); }

  const account = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!account) return jsonError("Account not found", 401);
  const customerName = account.name;
  const customerPhone = cleanString(body.customerPhone, 20);
  const customerEmail = account.email;
  if (!customerName || !isPhone(customerPhone)) return jsonError("A valid customer name and phone are required");
  if (!isEmail(customerEmail)) return jsonError("Email address is invalid");
  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 50) return jsonError("Order must contain 1 to 50 items");

  const quantities = new Map();
  for (const item of body.items) {
    const productId = cleanString(item?.productId, 100);
    const quantity = Number(item?.quantity);
    if (!productId || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return jsonError("Each item needs a valid productId and quantity (1-99)");
    quantities.set(productId, (quantities.get(productId) || 0) + quantity);
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({ where: { id: { in: [...quantities.keys()] }, isActive: true } });
      if (products.length !== quantities.size) throw new Error("PRODUCT_NOT_FOUND");
      const items = products.map((product) => ({ product, quantity: quantities.get(product.id) }));
      if (items.some(({ product, quantity }) => product.stock < quantity)) throw new Error("INSUFFICIENT_STOCK");
      const totalAmount = items.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
      const created = await tx.order.create({
        data: {
          orderNumber: makeOrderNumber(), customerName, customerPhone, customerEmail, userId: account.id,
          address: optionalString(body.address, 500), city: optionalString(body.city, 100),
          pincode: optionalString(body.pincode, 12), notes: optionalString(body.notes, 1000),
          channel: body.channel === "WHATSAPP" ? "WHATSAPP" : "ONLINE", totalAmount,
          items: { create: items.map(({ product, quantity }) => ({ productId: product.id, quantity, price: product.price })) },
        },
        include: { items: { include: { product: { select: { id: true, name: true, slug: true } } } } },
      });
      for (const { product, quantity } of items) {
        const updated = await tx.product.updateMany({ where: { id: product.id, stock: { gte: quantity } }, data: { stock: { decrement: quantity } } });
        if (updated.count !== 1) throw new Error("INSUFFICIENT_STOCK");
      }
      return created;
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") return jsonError("One or more products are unavailable", 409);
    if (error.message === "INSUFFICIENT_STOCK") return jsonError("One or more products do not have enough stock", 409);
    return databaseUnavailable(error);
  }
}
