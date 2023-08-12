"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = await userModel_1.default.findById(decode.id).select("-passowrd");
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized / No Token");
    }
});
exports.default = protect;
//# sourceMappingURL=authMiddleware.js.map