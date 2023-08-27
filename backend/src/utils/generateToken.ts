import { Response } from "express";
import jwt from "jsonwebtoken";
const generateToken = (res: Response, id: any) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 1000,
    domain: ".kanban-kuroe27.vercel.app",
    path: "/",
  };

  res.cookie("jwt", token, cookieOptions);
};

export default generateToken;
