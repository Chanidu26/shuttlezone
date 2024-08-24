import jwt from "jsonwebtoken";
import { createError } from "../error.js";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    try {
      // req.headers.authorization contains the token and 
      if (!req.headers.authorization) {
        return next(createError(401, "You are not authenticated!"));
      }

      // using next to pass control to the next middleware
      const token = req.headers.authorization.split(" ")[1];
      if (!token) return next(createError(401, "You are not authenticated!"));
      const decode = jwt.verify(token, process.env.JWT);
      req.user = decode;

      /*
      const user = await User.findById(decode.id);
      if (!user.isEmailVerified || !user.isPhoneVerified) {
        return next(createError(403, "Please verify your email and phone number to access this resource"));
      }
      */

      return next();
    } catch (err) {
      next(err);
    }
  };