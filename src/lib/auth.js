import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
var JWT_SECRET = process.env.JWT_SECRET || "dev-only-secret-change-before-deploying";
var COOKIE_NAME = "woodcraft_admin_token";
var CUSTOMER_COOKIE_NAME = "infinity_customer_token";
export function signAdminToken(payload) {
    if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET must be configured in production");
    }
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
export function verifyAdminToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (_a) {
        return null;
    }
}
export function getAdminSession() {
    var _a;
    var token = (_a = cookies().get(COOKIE_NAME)) === null || _a === void 0 ? void 0 : _a.value;
    if (!token)
        return null;
    return verifyAdminToken(token);
}
export function signCustomerToken(payload) {
    return jwt.sign({ ...payload, role: "customer" }, JWT_SECRET, { expiresIn: "30d" });
}
export function getCustomerSession() {
    var token = cookies().get(CUSTOMER_COOKIE_NAME)?.value;
    if (!token) return null;
    var session = verifyAdminToken(token);
    return session?.role === "customer" ? session : null;
}
export { COOKIE_NAME, CUSTOMER_COOKIE_NAME };
