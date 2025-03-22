import express from "express";
import { createBooking,
        getUserBookings,
        getBookingById,
        updateBooking,
        deleteBooking,
        getAvailableCourts,
        getCourtDetails,
        getCourtAppointments,
 } from "../controllers/Booking.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", verifyToken, getUserBookings);
router.get("/:id", verifyToken, getBookingById);
router.put("/:id", verifyToken, updateBooking);
router.delete("/:id", verifyToken, deleteBooking);
router.get('/available-courts', getAvailableCourts);
router.get('/court-details/:courtId', getCourtDetails);
router.get('/court-appointments/:courtId', verifyToken, getCourtAppointments);

export default router;