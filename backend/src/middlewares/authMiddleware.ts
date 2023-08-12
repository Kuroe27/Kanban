import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../model/userModel";
import { Request, Response, NextFunction } from "express";

// Middleware to protect routes by verifying JWT token
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract JWT token from the cookie
    const token = req.cookies.jwt;

    // Check if token is missing
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized / No Token");
    }

    try {
      // Verify the JWT token with the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user details from the database using the decoded user ID
      req.user = await User.findById(decoded.id).select("-password");

      // Continue to the next middleware/route handler
      next();
    } catch (error) {
      // If JWT verification fails or any other error occurs
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
);

export default protect;
