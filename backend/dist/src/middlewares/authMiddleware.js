"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
// Middleware to protect routes by verifying JWT token
const protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    // Extract JWT token from the cookie
    const token = req.cookies.jwt;
    // Check if token is missing
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized / No Token");
    }
    try {
        // Verify the JWT token with the secret key
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Fetch user details from the database using the decoded user ID
        req.user = await userModel_1.default.findById(decoded.id).select("-password");
        // Continue to the next middleware/route handler
        next();
    }
    catch (error) {
        // If JWT verification fails or any other error occurs
        console.error(error);
        res.status(401);
        throw new Error("Not Authorized");
    }
});
exports.default = protect;
//# sourceMappingURL=authMiddleware.js.map