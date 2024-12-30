import mongoose from "mongoose";

const PlatformReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    }
    
});

export default mongoose.model("PlatformReview", PlatformReviewSchema);