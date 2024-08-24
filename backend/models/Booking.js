import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    court: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Court",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "Confirmed", "Cancelled"],
        default: "pending"
    }
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema)