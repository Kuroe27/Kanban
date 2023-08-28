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
    path: "/",
    domain:
      process.env.NODE_ENV !== "development" ? ".kanbanflow.tech" : "localhost",
  };

  res.cookie("jwt", token, cookieOptions);
  console.log("Token generated and cookie set:", token);
};

export default generateToken;
