"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
const statusModel_1 = __importDefault(require("../model/statusModel"));
const createTask = (0, express_async_handler_1.default)(async (req, res) => {
    const { taskName, status } = req.body;
    if (!taskName || !status) {
        res.status(400);
        throw new Error("Please complete all details");
    }
    // Check if the provided status ID exists in the Status model
    const existingStatus = await statusModel_1.default.findById(status);
    if (!existingStatus) {
        res.status(400);
        throw new Error("Invalid status ID");
    }
    const newTask = await taskModel_1.default.create({
        taskName,
        user: req.user.id,
        status,
    });
    res.status(201).json(newTask);
});
exports.createTask = createTask;
//# sourceMappingURL=taskController.js.map