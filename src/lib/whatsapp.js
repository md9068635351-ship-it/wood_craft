var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919068635351";
function formatPrice(amount) {
    return "\u20B9".concat(amount.toLocaleString("en-IN"));
}
/** Builds a WhatsApp deep link with a pre-filled order message for a single product. */
export function buildSingleProductWhatsAppLink(product, quantity) {
    if (quantity === void 0) { quantity = 1; }
    var lines = [
        "Hi! I'd like to order:",
        "",
        "*".concat(product.name, "*"),
        "Quantity: ".concat(quantity),
        "Price: ".concat(formatPrice(product.price * quantity)),
        product.woodType ? "Wood: ".concat(product.woodType) : "",
        "",
        "Product link: ".concat(typeof window !== "undefined" ? window.location.href : ""),
    ].filter(Boolean);
    var message = encodeURIComponent(lines.join("\n"));
    return "https://wa.me/".concat(WHATSAPP_NUMBER, "?text=").concat(message);
}
/** Builds a WhatsApp deep link with a pre-filled order message for a full cart. */
export function buildCartWhatsAppLink(items) {
    var itemLines = items.map(function (item, i) {
        return "".concat(i + 1, ". ").concat(item.product.name, " x").concat(item.quantity, " - ").concat(formatPrice(item.product.price * item.quantity));
    });
    var total = items.reduce(function (sum, item) { return sum + item.product.price * item.quantity; }, 0);
    var lines = __spreadArray(__spreadArray([
        "Hi! I'd like to place an order:",
        ""
    ], itemLines, true), [
        "",
        "*Total: ".concat(formatPrice(total), "*"),
        "",
        "Please share delivery details and confirm availability. Thank you!",
    ], false);
    var message = encodeURIComponent(lines.join("\n"));
    return "https://wa.me/".concat(WHATSAPP_NUMBER, "?text=").concat(message);
}
/** Generic enquiry link, e.g. for customisation requests. */
export function buildEnquiryWhatsAppLink(productName) {
    var message = encodeURIComponent("Hi! I have a question about: ".concat(productName));
    return "https://wa.me/".concat(WHATSAPP_NUMBER, "?text=").concat(message);
}
export { formatPrice };
