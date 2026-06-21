# WoodCraft

A complete e-commerce website for handmade wooden craft products, built with Next.js 14, Prisma, and PostgreSQL.

**For full setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md) — written for non-technical use.**

## Features

- Storefront with shop, product detail, custom-order, and about pages
- Cart + checkout that routes orders to WhatsApp with a pre-filled message
- Direct "Order on WhatsApp" button on every product
- Admin panel (JWT-secured) to add/edit/delete products and manage orders
- Image upload for product photos
- Responsive, warm wood-craft visual design

## Quick Start

```bash
npm install
cp .env.example .env   # then fill in your DATABASE_URL, JWT_SECRET, WhatsApp number
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Visit `http://localhost:3000` for the storefront and `http://localhost:3000/admin/login` for the admin panel.

## API

- `GET /api/products` supports `page`, `limit`, `search`, `category`, and `featured=true`
- `GET /api/products/:slug`
- `GET /api/categories`
- `POST /api/orders` recalculates prices from the database and reserves stock atomically
- `POST /api/inquiries` accepts contact and custom-build enquiries
- `/api/admin/*` provides authenticated product, category, order, inquiry, and upload management

For Neon, paste the pooled connection string into `DATABASE_URL`, then run `npm run db:generate`, `npm run db:push`, and `npm run db:seed`. Neon is the PostgreSQL database provider; a second “Neon URL” is not required by Prisma. Local file uploads do not persist on serverless hosts, so production deployments should use object storage (for example Vercel Blob or Cloudinary) for product images.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL via Prisma ORM
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State:** Zustand (cart)
- **Auth:** JWT in HTTP-only cookies (admin panel)
