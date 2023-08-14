"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getStatus = exports.getSpecificStatus = exports.deleteStatus = exports.createStatus = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const statusModel_1 = __importDefault(require("../model/statusModel"));
const createStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const statusName = req.body;
    if (!statusName) {
        res.status(400);
        throw new Error("Please complete the form");
    }
    const newStatus = await statusModel_1.default.create({
        statusName: req.body.statusName,
        user: req.user.id,
    });
    res.status(200).json(newStatus);
});
exports.createStatus = createStatus;
const getStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const status = await statusModel_1.default.find({ user: req.user.id });
    res.status(200).json(status);
});
exports.getStatus = getStatus;
const getSpecificStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const status = await statusModel_1.default.findById(req.params.id);
    res.status(200).json(status);
});
exports.getSpecificStatus = getSpecificStatus;
const deleteStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const status = await statusModel_1.default.findById(req.params.id);
    if (!status) {
        res.status(404);
        throw new Error("Post not found");
    }
    if (!req.user) {
        res.status(400);
        throw new Error("User not found");
    }
    if (status.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Status not authorized");
    }
    await statusModel_1.default.deleteOne({ _id: req.params.id });
    res
        .status(200)
        .json({ message: `status ${status.statusName} deleted successfully` });
});
exports.deleteStatus = deleteStatus;
const updateStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const status = await statusModel_1.default.findById(req.params.id);
    if (!status) {
        res.status(404);
        throw new Error("Post not found");
    }
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }
    if (status.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Post not authorized");
    }
    const updateStatus = await statusModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json(updateStatus);
});
exports.updateStatus = updateStatus;
//# sourceMappingURL=statusController.js.map