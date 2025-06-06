import express from "express";
import {
    UserLogin,
    UserRegister,
    updateUser,
    deleteUser,
    requestPasswordReset,
    resetPassword,
    getProfile,
    makePayment,
    verifyEmail,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// for user login and signup and profile update and delete
router.post("/signup", UserRegister);
router.post("/signin", UserLogin);
router.get("/verify-email/:token", verifyEmail);
router.put("/profile", verifyToken, updateUser);
router.get("/myprofile",verifyToken,getProfile)
router.delete("/profile", verifyToken, deleteUser);
router.post('/payment', makePayment)

// for user password reset
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

/*
router.get("/verify-email", verifyEmail);
router.post("/verify-phone", verifyPhone);
*/
export default router;