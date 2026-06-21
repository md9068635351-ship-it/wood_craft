var _a;
import { PrismaClient } from "@prisma/client";
var globalForPrisma = globalThis;
var prismaClient = null;
if (process.env.DATABASE_URL) {
    prismaClient = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
    if (process.env.NODE_ENV !== "production")
        globalForPrisma.prisma = prismaClient;
}
export var prisma = prismaClient;
