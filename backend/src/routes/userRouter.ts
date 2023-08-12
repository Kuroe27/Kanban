import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const userRouter = express.Router();

// Define the POST route for user registration
userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user", protect, getUser);
userRouter.post("/logout", logoutUser);
userRouter.put("/updateUser", protect, updateUser);
export default userRouter;
