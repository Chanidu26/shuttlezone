import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createCourt,
  getCourts,
  getCourtById,
  updateCourt,
  deleteCourt,
} from "../controllers/Court.js";

const router = express.Router();

//verifyToken and createCourt 
router.post("/", verifyToken, createCourt);
router.get("/", getCourts);
router.get("/:id", getCourtById);
router.put("/:id", verifyToken, updateCourt);
router.delete("/:id", verifyToken, deleteCourt);

export default router;