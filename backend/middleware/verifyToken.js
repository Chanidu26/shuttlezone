import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Check for Authorization header
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    // Extract token from Authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(createError(401, "You are not authenticated!"));

    // Verify token and decode payload
    const decode = jwt.verify(token, process.env.JWT);

    // Attach the user ID from the token to req.userId
    req.userId = decode.id; // Align with `getProfile` usage
    return next(); // Pass control to the next middleware
  } catch (err) {
    next(err); // Pass errors to the error-handling middleware
  }
};
