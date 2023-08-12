"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const userRouter = express_1.default.Router();
// Define the POST route for user registration
userRouter.post("/", userController_1.registerUser);
userRouter.post("/login", userController_1.loginUser);
userRouter.get("/user", authMiddleware_1.default, userController_1.getUser);
userRouter.post("/logout", userController_1.logoutUser);
userRouter.put("/updateUser", authMiddleware_1.default, userController_1.updateUser);
userRouter.delete("/user", authMiddleware_1.default, userController_1.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map