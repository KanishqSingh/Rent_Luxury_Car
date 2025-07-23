import express from 'express'
import { changeBookingStatsu, checkAvailabilityOfCar, createBooking, getOwnerBooking, getUserBookings } from '../controllers/BookingController.js';
import { protect } from '../middleware/auth.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availabilty',checkAvailabilityOfCar)
bookingRouter.post('/create',protect,createBooking)
bookingRouter.get('/user',protect,getUserBookings)
bookingRouter.get('/owner',protect,getOwnerBooking)
bookingRouter.post('/change-status',protect,changeBookingStatsu)

export default bookingRouter;