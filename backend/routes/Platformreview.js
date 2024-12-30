import express from "express";
import { createPlatformReview , getAllPlatformReviews} from "../controllers/Platformreview.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get('/', getAllPlatformReviews)
router.post('/',verifyToken,createPlatformReview)

export default router;