import mongoose from "mongoose";

const CourtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String, // "Point"
      required: true,
     },
    images: {
      type: [String],
      required: false,
    },
    price:{
        type: Number,
        required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    googlemaplink: {
      type: String,
      required: false,
    },
    availableDates: [
      {
        date: {
          type: Date,
          required: false,
        },
        times: [{
          type: String,
          required: false,
        }],
        isBooked: {
          type: Boolean,
          default: false,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Court", CourtSchema);
