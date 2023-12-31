// userController.ts

import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../model/userModel";
import generateToken from "../utils/generateToken";

// register user
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please complete all fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already taken");
  }

  const user = await User.create({
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

// login user
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credits");
  }
});

// get user
const getUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(req.user);
});

// logout user
const logoutUser = (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
    domain:
      process.env.NODE_ENV !== "development"
        ? ".kanbanflow.tech"
        : ".localhost",
  };

  res.cookie("jwt", "", cookieOptions);
  res.status(200).json({ message: "Logged Out succesfully" });
};

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("Error Not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  const updateUser = await user.save();

  res.status(200).json({
    _id: updateUser._id,
    email: updateUser.email,
    name: updateUser.name,
    message: "Updated succesfully",
  });
});
const updatePasword = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("Error Not found");
  }

  if (!req.body.password || !req.body.newPassword) {
    res.status(400);
    throw new Error("Please complete all fields");
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    message: "Password updated successfully",
  });
});

// deleteUser
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await User.deleteOne({ _id: user.id });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
    domain:
      process.env.NODE_ENV !== "development"
        ? ".kanbanflow.tech"
        : ".localhost",
  };

  res.cookie("jwt", "", cookieOptions);
  res.status(200).json({
    message: "User deleted successfully",
  });
});

export {
  deleteUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  updatePasword,
};
