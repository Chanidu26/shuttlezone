import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserRouter from "./routes/User.js";
import CourtRouter from "./routes/Court.js";
import PlatformreviewRouter from "./routes/Platformreview.js";
import BookingRouter from "./routes/Booking.js"
import { createError } from "./error.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello Developers",
  });
});

app.use("/api/user", UserRouter);
app.use("/api/court", CourtRouter);
app.use("/api/platformreview", PlatformreviewRouter);
app.use("/api/booking", BookingRouter);

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("Failed to connect to MongoDB");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(3030, () => console.log("Server started on port 3030"));
  } catch (error) {
    console.error(error);
  }
};

startServer();
