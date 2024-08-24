import express from "express";
import { createBooking,
        getUserBookings,
        getBookingById,
        updateBooking,
        deleteBooking
 } from "../controllers/Booking.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, getUserBookings);
router.get("/:id", verifyToken, getBookingById);
router.put("/:id", verifyToken, updateBooking);
router.delete("/:id", verifyToken, deleteBooking);

export default router;