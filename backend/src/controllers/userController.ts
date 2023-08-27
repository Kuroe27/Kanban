// userController.ts

import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../model/userModel";

// create token
const generateToken = (res: Response, id: any) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 1000,
    domain: ".vercel.app",
  };

  res.cookie("jwt", token, cookieOptions);
};

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
      token: generateToken(res, user._id),
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
    expires: new Date(0),
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
    expires: new Date(0),
  };

  res.cookie("jwt", "", cookieOptions);
  res.status(200).json({
    message: "User deleted successfully",
  });
});

export { getUser, loginUser, logoutUser, registerUser, updateUser, deleteUser };
