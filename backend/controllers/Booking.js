import Booking from "../models/Booking.js";
import Court from "../models/Court.js";
import { createError } from "../error.js";

export const createBooking = async (req, res, next) => {
    try {
        const { courtId, date, slots, userId, price } = req.body;
    
        // Create booking record in the database
        const booking = new Booking({
          court: courtId,
          date,
          times: slots,
          user: userId,
          price,
          status: 'Confirmed',
        });
        await booking.save();

        const court = await Court.findOneAndUpdate(
            {
                _id: courtId,
                "availableDates.date": new Date(date),
            },
            {
                $pull: { "availableDates.$.times": { $in: slots } }, // Remove booked times
            },
            { new: true } // Return updated document
        );

    
        res.status(201).json({
          message: 'Court booked successfully!',
          booking,
          court,
        });
      } catch (error) {
        next(error);
      }
};

export const getUserBookings = async (req, res, next) => {
    const userId = req.userId;
    try {
      // find all bookings for the current user and populate method to populate the court field
      const bookings = await Booking.find({ user: userId }).populate("court");
      return res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
};

export const getBookingById = async (req, res, next) => {
    try {
      // find the booking by id and populate method to populate the court field
      const booking = await Booking.findById(req.params.id).populate("court");
      if (!booking) {
        return next(createError(404, "Booking not found"));
      }

      // check if the booking belongs to the current user
      if (booking.user.toString() !== req.user.id) {
        return next(createError(403, "You can only view your own bookings"));
      }
      
      return res.status(200).json(booking);
    } catch (error) {
      return next(error);
    }
  };
  
export const updateBooking = async (req, res, next) => {    
    try {
        // req.body contains the courtId, date, startTime, endTime
        const { courtId, date, startTime, endTime } = req.body;

        // bookingId is the id of the booking to be updated
        const bookingId = req.params.id;

        // check if the booking exists
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return next(createError(404, "Booking not found"));
        }

        // check if the booking belongs to the current user
        if (booking.user.toString() !== req.user.id) {
            return next(createError(403, "You can only update your own bookings"));
        }

        // check if the new court exists
        const court = await Court.findById(courtId);
        if (!court) {
            return next(createError(404, "Court not found"));
        }

        // check if the new booking time is available
        const newBooking = await Booking.findOne({ court: courtId, date, startTime, endTime });

        // newBooking and newBooking._id.toString() are the same
        // newBooking is not null and newBooking._id.toString() is not equal to bookingId
        if (newBooking && newBooking._id.toString() !== bookingId) {
            return next(createError(400, "This time slot is already booked"));
        }

        // update the booking
        booking.court = courtId;
        booking.date = date;
        booking.startTime = startTime;
        booking.endTime = endTime;
        booking.status = "pending";

        // save the booking to the database
        const updatedBooking = await booking.save();

        // send the updated booking to the client as a response
        return res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    }
    catch (error) {
        return next(error);
    }   
};

export const deleteBooking = async (req, res, next) => {
    try {
        const bookingId = req.params.id;

        // Check if the booking exists
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return next(createError(404, "Booking not found"));
        }

        // Check if the booking belongs to the current user
        if (booking.user.toString() !== req.userId) {
            return next(createError(403, "You can only cancel your own bookings"));
        }

        // Find the related court
        const court = await Court.findById(booking.court);
        if (!court) {
            return next(createError(404, "Court not found"));
        }

        // Re-add the canceled booking time slots to the court's available times
        const { date, times } = booking;
        const courtAvailability = court.availableDates.find(a => 
            new Date(a.date).toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
        );

        if (courtAvailability) {
            // Merge time slots while ensuring uniqueness
            courtAvailability.times = Array.from(new Set([...courtAvailability.times, ...times])).sort();
        }

        await court.save();

        // Delete the booking
        await booking.deleteOne(); // Use deleteOne() instead of remove()

        return res.status(200).json({ message: "Booking canceled successfully, time slots restored" });
    } catch (error) {   
        return next(error);
    }
};


export const getAvailableCourts = async (req, res, next) => {  
    // Get available courts for the given date and time slot
    try {
        const { date, timeSlot } = req.query;

    // Find courts that are not booked for the given date and time slot
    const availableCourts = await Court.find({
        bookings: { 
            // Check if the court is not booked for the given date and time slot
            $not: {
                // elemMatch is used to check if the court is booked for the given date and time slot
                $elemMatch: { date: date, timeSlot: timeSlot }
            }
        }
    });

    return res.status(200).json(availableCourts);
    } catch (error) {
        next(error);
    }   
};

export const getCourtDetails = async (req, res, next) => {
    try {
        // req.params contains the courtId
        const courtId = req.params.courtId;
        // find the court by that id
        const court = await Court.findById(courtId);

        // if the court is not found, return an error
        if (!court) {
            return next(createError(404, "Court not found"));
        }

        // if the court is found, return the court
        return res.status(200).json(court);

    } catch (error) {
        return next(error);
    }
}

export const getCourtAppointments = async (req, res) => {
    try {
        const { courtId } = req.params; // Get the court ID from request parameters

        const appointments = await Booking.find({ court: courtId })
            .populate("user", "name email phone") // Fetch user details (name, email)
            .select("user date times status price") // Select required fields
            .sort({ date: 1, times: 1 }); // Sort by date and time

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching court appointments", error });
    }
};



