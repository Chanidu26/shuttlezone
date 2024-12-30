import Platformreview from "../models/Platformreview.js";
import User from "../models/User.js";
export const createPlatformReview = async (req, res) => {
    try {
        const { reviewText, date } = req.body;
        const newPlatformReview = new Platformreview({
            user : req.userId,
            reviewText,
            date,
        });
        await newPlatformReview.save();
        return res.status(201).json(newPlatformReview);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create platform review" });
    }
};
export const getAllPlatformReviews = async (req, res) => {
    try {
        const platformReviews = await Platformreview.find();
        return res.status(200).json(platformReviews);
    } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve platform reviews" });
    }
};
