"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificTask = exports.updateTask = exports.deleteTask = exports.getTask = exports.createTask = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const taskModel_1 = __importDefault(require("../model/taskModel"));
const statusModel_1 = __importDefault(require("../model/statusModel"));
const mongoose_1 = __importDefault(require("mongoose"));
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
// get tasks
const getTask = (0, express_async_handler_1.default)(async (req, res) => {
    const tasks = await taskModel_1.default.find({ user: req.user.id });
    res.status(200).json({ tasks });
});
exports.getTask = getTask;
// get specific task
const getSpecificTask = (0, express_async_handler_1.default)(async (req, res) => {
    const selectedTask = await taskModel_1.default.findById(req.params.id);
    res.status(200).json(selectedTask);
});
exports.getSpecificTask = getSpecificTask;
// delete Task
const deleteTask = (0, express_async_handler_1.default)(async (req, res) => {
    const task = await taskModel_1.default.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    if (!req.user) {
        res.status(400);
        throw new Error("User not found");
    }
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not Authorized");
    }
    await taskModel_1.default.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Task deleted" });
});
exports.deleteTask = deleteTask;
const updateTask = (0, express_async_handler_1.default)(async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;
    const userId = req.user?.id;
    if (!mongoose_1.default.Types.ObjectId.isValid(taskId)) {
        res.status(400);
        throw new Error("Invalid task ID");
    }
    const task = await taskModel_1.default.findById(taskId);
    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(status)) {
        res.status(400);
        throw new Error("Invalid status ID");
    }
    const existingStatus = await statusModel_1.default.findById(status);
    if (!existingStatus ||
        existingStatus.user.toString() !== userId ||
        !mongoose_1.default.Types.ObjectId.isValid(status)) {
        res.status(400);
        throw new Error("Invalid status or status ID");
    }
    const updatedTask = await taskModel_1.default.findByIdAndUpdate(taskId, req.body, {
        new: true,
    });
    res.status(200).json(updatedTask);
});
exports.updateTask = updateTask;
//# sourceMappingURL=taskController.js.map