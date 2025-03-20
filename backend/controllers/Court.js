import Court from "../models/Court.js";
import { createError } from "../error.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Create Court
export const createCourt = async (req, res, next) => {
    try {
      //send the name, location, and owner to the database
      //req.user.id is the id of the user who is logged in  
      const { name, location,  price, description,owner, availableDates, images, googlemaplink} = req.body;
      //create a new court
      const newCourt = new Court({
        name,
        location,
        owner,
        images,
        price,
        description,
        availableDates,
        googlemaplink,
      });
      console.log(newCourt.images);
  
      const savedCourt = await newCourt.save();
      return res.status(201).json(savedCourt);
    } catch (error) {
      return next(error);
    }
  };


// Get All Courts
export const getCourts = async (req, res, next) => {

    try {
      //this populate method will populate the owner field of each court with the name and email of the owner
      const courts = await Court.find();
      return res.status(200).json(courts);
    } catch (error) {
      return next(error);
    }
  };
  export const getMyCourts = async (req, res, next) => {
    try {
      const courts = await Court.find({ owner: req.userId });
      return res.status(200).json(courts);
    } catch (error) {
      console.error("Error in getMyCourts:", error); // Add this log
      return next(error);
    }
  };

// Get Court by ID
export const getCourtById = async (req, res, next) => {
    try {
      //this below line will populate the owner field of each court with the name and email of the owner
      const court = await Court.findById(req.params.id).populate("owner", "name email");
      if (!court) return next(createError(404, "Court not found"));
      return res.status(200).json(court);
    } catch (error) {
      return next(error);
    }
  };

// Update Court
export const updateCourt = async (req, res, next) => {
    try {
      //here req.params means the id of the court 
      const court = await Court.findById(req.params.id);
      if (!court) return next(createError(404, "Court not found"));
        
      //here we are checking if the owner of the court is the same as the user who is updating the court
      if (court.owner.toString() !== req.userId) {
        return next(createError(403, "You can only update your own courts"));
      }
      console.log(req.body);
      
      const updates = req.body;
      //here we assign the updates to the court
      Object.assign(court, updates);
      //here we save the updated court
      const updatedCourt = await court.save();
      
      //here we return the updated court
      return res.status(200).json(updatedCourt);
    } catch (error) {
      return next(error);
    }
};


// Delete Court
export const deleteCourt = async (req, res, next) => {
    try {
      //find the court by id
      const court = await Court.findById(req.params.id);
      if (!court) return next(createError(404, "Court not found"));
  
      //check if the owner of the court is the same as the user who is deleting the court
      if (court.owner.toString() !== req.userId) {
        return next(createError(403, "You can only delete your own courts"));
      }
      
      //delete the court
      //check this delete method
      await Court.findByIdAndDelete(req.params.id); 
      return res.status(200).json({ message: "Court deleted successfully" });
    } catch (error) {
      return next(error);
    }
  };
  