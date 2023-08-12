"use strict";
// userController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.registerUser = exports.logoutUser = exports.loginUser = exports.getUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
// create token
const generateToken = (res, id) => {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 1000,
    };
    res.cookie("jwt", token, cookieOptions);
};
// register user
const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please complete all fields");
    }
    const userExist = await userModel_1.default.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User already taken");
    }
    const user = await userModel_1.default.create({
        name,
        email,
        password,
    });
    if (!user) {
        res.status(500);
        throw new Error("Failed to create user");
    }
    generateToken(res, user._id);
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});
exports.registerUser = registerUser;
// login user
const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel_1.default.findOne({ email });
    if (user && (await bcryptjs_1.default.compare(password, user.password))) {
        generateToken(res, user._id);
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(res, user._id),
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid Credits");
    }
});
exports.loginUser = loginUser;
// get user
const getUser = (0, express_async_handler_1.default)(async (req, res) => {
    res.status(200).json(req.user);
});
exports.getUser = getUser;
// logout user
const logoutUser = (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(0),
    };
    res.cookie("jwt", "", cookieOptions);
    res.status(200).json({ message: "Logged Out succesfully" });
};
exports.logoutUser = logoutUser;
const updateUser = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userModel_1.default.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("Error Not found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.user.password) {
        user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
        _id: updateUser._id,
        email: updateUser.email,
        name: updateUser.name,
    });
});
exports.updateUser = updateUser;
// deleteUser
const deleteUser = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userModel_1.default.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    await userModel_1.default.deleteOne({ _id: user.id });
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(0),
    };
    res.cookie("jwt", "", cookieOptions);
    res.status(200).json({
        message: "User deleted successfully",
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map