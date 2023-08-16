"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const taskController_1 = require("../controllers/taskController");
const TaskRouter = express_1.default.Router();
TaskRouter.route("/").get(authMiddleware_1.default, taskController_1.getTask).post(authMiddleware_1.default, taskController_1.createTask);
TaskRouter.route("/:id")
    .delete(authMiddleware_1.default, taskController_1.deleteTask)
    .put(authMiddleware_1.default, taskController_1.updateTask)
    .get(authMiddleware_1.default, taskController_1.getSpecificTask);
exports.default = TaskRouter;
//# sourceMappingURL=taskRouter.js.map