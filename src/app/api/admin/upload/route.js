var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getAdminSession } from "@/lib/auth";
export function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var session, formData, file, MAX_SIZE, bytes, buffer, uploadDir, ext, filename, filepath, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = getAdminSession();
                    if (!session) {
                        return [2 /*return*/, NextResponse.json({ error: "Unauthorized" }, { status: 401 })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, req.formData()];
                case 2:
                    formData = _a.sent();
                    file = formData.get("file");
                    if (!file) {
                        return [2 /*return*/, NextResponse.json({ error: "No file provided" }, { status: 400 })];
                    }
                    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
                        return [2 /*return*/, NextResponse.json({ error: "Only JPG, PNG, WebP, and GIF images are allowed" }, { status: 400 })];
                    }
                    MAX_SIZE = 5 * 1024 * 1024;
                    if (file.size > MAX_SIZE) {
                        return [2 /*return*/, NextResponse.json({ error: "Image must be smaller than 5MB" }, { status: 400 })];
                    }
                    return [4 /*yield*/, file.arrayBuffer()];
                case 3:
                    bytes = _a.sent();
                    buffer = Buffer.from(bytes);
                    uploadDir = path.join(process.cwd(), "public", "uploads");
                    return [4 /*yield*/, mkdir(uploadDir, { recursive: true })];
                case 4:
                    _a.sent();
                    ext = ({ "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif" })[file.type];
                    filename = "".concat(Date.now(), "-").concat(Math.random().toString(36).slice(2, 8)).concat(ext);
                    filepath = path.join(uploadDir, filename);
                    return [4 /*yield*/, writeFile(filepath, buffer)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, NextResponse.json({ url: "/uploads/".concat(filename) })];
                case 6:
                    error_1 = _a.sent();
                    console.error("Upload error:", error_1);
                    return [2 /*return*/, NextResponse.json({ error: "Upload failed" }, { status: 500 })];
                case 7: return [2 /*return*/];
            }
        });
    });
}
