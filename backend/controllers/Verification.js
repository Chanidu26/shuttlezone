import User from "../models/User.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

/*
// Verify Email
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decoded.id);

    if (!user || user.emailVerificationToken !== token) {
      return next(createError(400, "Invalid or expired email verification token"));
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return next(error);
  }
};

// Verify Phone
export const verifyPhone = async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({ phoneVerificationToken: token });

    if (!user) {
      return next(createError(400, "Invalid or expired phone verification token"));
    }

    user.isPhoneVerified = true;
    user.phoneVerificationToken = null;
    await user.save();

    return res.status(200).json({ message: "Phone number verified successfully" });
  } catch (error) {
    return next(error);
  }
};

*/