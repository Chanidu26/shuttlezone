import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../error.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
//import nodemailer from "nodemailer"; // Email sending library
//import twilio from "twilio"; // SMS sending library

// User Register
export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email is already in use"));
    }
    // Password hashing using bcrypt
    const salt = await bcrypt.genSalt(10);
    // bycrypt.hash is used to hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user with the hashed password
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    // using jwt to create a token with the user id
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      // expiresIn is used to set the expiration time of the token
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user: createdUser });
  } catch (error) {
    return next(error);
  }
};

// User Login
export const UserLogin = async (req, res, next) => {
  try {
    // req.body contains the email and password
    const { email, password } = req.body;
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(createError(404, "User not found"));
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }
    // using jwt to create a token with the user id 
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user: existingUser });
    
  } catch (error) {
    return next(error);
  }
};

//User Update
export const updateUser = async (req, res, next) => {
  const userId = req.userId;
  
  try {
    // Get the current user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare updates object
    const updates = {};
    
    // Handle basic fields
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) {
      // Check if email is already taken by another user
      const emailExists = await User.findOne({ 
        email: req.body.email,
        _id: { $ne: userId } 
      });
      
      if (emailExists) {
        return res.status(400).json({ 
          message: "Email is already in use" 
        });
      }
      updates.email = req.body.email;
    }

    // Handle password update
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(req.body.password, salt);
    }

    // Handle file upload
    if (req.body.photo) {
      updates.photo = req.body.photo; // Assuming Cloudinary URL
    }

    // Update user with sanitized data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { 
        new: true,
        runValidators: true,
        select: '-password -emailVerificationToken -phoneVerificationToken -resetPasswordToken -resetPasswordExpire'
      }
    );

    return res.status(200).json({
      success: true,
      data: updatedUser
    });

  } catch (error) {
    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: Object.values(error.errors).map(err => err.message)
      });
    }
    
    // Handle other errors
    return res.status(500).json({
      message: "Error updating profile",
      error: error.message
    });
  }
};
export const getProfile = async (req, res, next) => {
  const userId = req.userId; // Retrieved from verifyToken middleware

  try {
    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return next(createError(404, `User with ID ${userId} not found`));

    // Exclude password from the response
    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Profile info retrieved successfully",
      data: rest,
    });
  } catch (error) {
    next(error); // Handle errors
  }
};

// User delete
export const deleteUser = async (req, res, next) => {
  try {
      // Find the user by ID
      const user = await User.findById(req.user.id);
      if (!user) return next(createError(404, "User not found"));

      // Check if the user is the same as the one making the request (or an admin)
      if (user._id.toString() !== req.user.id && !req.user.isAdmin) {
          return next(createError(403, "You can only delete your own account"));
      }
      
      // Delete the user
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      return next(error);
  }
};

// Request Password Reset
export const requestPasswordReset = async (req, res, next) => {
  try {
    // req.body contains the email
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    // Generate a reset token
    // crypto is used to generate a random string
    // randomBytes is used to generate a random string of bytes and hex is used to convert the bytes to a hexadecimal string
    const resetToken = crypto.randomBytes(32).toString('hex');

    // crypto.createHash is used to create a hash of the reset token
    // sha256 is used to create a hash of the reset token and digest is used to convert the hash to a hexadecimal string
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // resetPasswordExpire is used to set the expiration time of the reset token
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour from now

    // save the user after generating the reset token
    await user.save();

    // create reset link
    const resetUrl = `http://localhost:3030/reset-password/${resetToken}`;

    // send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // EMAIL_USER and EMAIL_PASS are our email service credentials and can be found in your email service console
        user: process.env.EMAIL_USER,
        pass: 'chdq xzli hnyd zbdp',
      },
      tls: {
        rejectUnauthorized: false, // This line prevents the certificate validation issue
      },
    });

    // to is used to send the email to the user
    // subject is used to set the subject of the email
    // html is used to set the HTML content of the email and it includes the reset link
    const message = {
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You have requested to reset your password. Please click the link below to reset your password:</p><p><a href="${resetUrl}">Reset Password</a></p>`,
    };

    // transporter.sendMail is used to send the email
    await transporter.sendMail(message);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    return next(error);
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    // req.body contains the token and new password
    // token is used to verify the token and new password is used to set the new password
    const { token, newPassword } = req.body;

    // hashedToken is used to verify the token and new password is used to set the new password
    // crypto.createHash is used to create a hash of the token
    // sha256 is used to create a hash of the token and digest is used to convert the hash to a hexadecimal string
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user by token and check if the token has expired
    const user = await User.findOne({
      // hashedToken is used to verify the token and new password is used to set the new password
      // date.now() is used to check if the token has expired
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    // Check if user exists
    if (!user) {
      return next(createError(400, 'Invalid or expired token'));
    }

    // Set the new password
    user.password = newPassword;
    // we set undefined to reset the resetPasswordToken and resetPasswordExpire
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    return next(error);
  }
};




// have to check before implement verifications

/*
// Twilio setup (Replace with your Twilio credentials)
// this is used to send sms verification to the user
// ACCOUNT_SID and AUTH_TOKEN are your Twilio credentials and can be found in your Twilio console
// twilioClient is used to send sms verification to the user
const twilioClient = twilio("ACCOUNT_SID", "AUTH_TOKEN");

// Nodemailer setup (Replace with your email service credentials)
// this is used to send email verification to the user
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // EMAIL_USER and EMAIL_PASS are your email service credentials and can be found in your email service console
    // .env file is used to store the email service credentials
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Email Verification
const sendEmailVerification = async (user) => {
  // Generate a verification token and it will be stored in the user model in the emailVerificationToken field
  // expiresIn is used to set the expiration time of the token
  const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1h' });
  // token is used to verify the user's email
  user.emailVerificationToken = token;
  // and then save the user model
  await user.save();

  // The url is used to verify the user's email
  const url = `http://localhost:3030/api/user/verify-email?token=${token}`;

  // Send email verification
  await transporter.sendMail({
    to: user.email,
    subject: 'Verify your email address',
    html: `<p>Please click the link below to verify your email address:</p><p><a href="${url}">Verify Email</a></p>`,
  });
};

// Send Phone Verification
const sendPhoneVerification = async (user) => {
  // Generate a verification token and it will be stored in the user model in the phoneVerificationToken field
  const token = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
  // token is used to verify the user's phone
  user.phoneVerificationToken = token;
  await user.save();

  // create a message using the Twilio client
  await twilioClient.messages.create({
    body: `Your verification code is: ${token}`,
    from: '+1234567890', // Your Twilio phone number
    to: user.phone,
  });
};

// Update User Profile
export const updateUserProfile = async (req, res, next) => {
  try {
    // req.user is the user that is logged in
    // req.body contains the updates that the user wants to make
    const userId = req.user.id;
    const updates = req.body;

    // Check if user exists
    const user = await User.findById(userId);

    // if the email and phone are not the same as the user's email and phone, send email and phone verification
    if (updates.email && updates.email !== user.email) {
      user.email = updates.email;
      user.isEmailVerified = false;
      await sendEmailVerification(user);
    }

    if (updates.phone && updates.phone !== user.phone) {
      user.phone = updates.phone;
      user.isPhoneVerified = false;
      await sendPhoneVerification(user);
    }

    Object.assign(user, updates);
    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

*/