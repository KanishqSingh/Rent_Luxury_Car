import Booking from "../models/Booking.js"
import Car from "../models/Cars.js";


//Function to check availabilbity of car 
const checkAvailability = async(car,pickupDate,returnDate)=>{
    const bookings = await Booking.find({
        car,
        pickupDate:{$lte:returnDate},
        returnDate:{$gte:pickupDate}
    })
    return bookings.length === 0;
}

//api to check availabilty of cars for the given date and location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    const cars = await Car.find({ 
location, isAvailable: true });
    console.log('location',cars);
    

    // check car availability using promises
    const availableCarsPromise = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
      return { ...car._doc, isAvailable: isAvailable };
    });

    let availableCars = await Promise.all(availableCarsPromise);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    return res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


//api to create booking
export const createBooking = async(req,res)=>{
    try {
        
        console.log("req.user -- ",req.user);
        
        const {_id} = req.user;
        console.log("_id -- ",_id);
        
        const {car,pickupDate,returnDate} = req.body;

        if (!pickupDate || !returnDate) {
  return res.json({ success: false, message: "Pickup and return date are required" });
}
        const isAvailable = await checkAvailability(car,pickupDate,returnDate)



        if(!isAvailable){
            return res.json({ success: false, message: "car not available" })

        }

        const carData = await Car.findById(car)

        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000*60*60*24))
        const price = carData.pricePerDay * noOfDays;

        await Booking.create({
            car,owner:carData.owner,user:_id,pickupDate,returnDate,price
        })

        res.json({success:true,message:"Booking Created"})


        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//Get list of user booking
export const getUserBookings = async(req,res)=>{
    try {

        const {_id} = req.user;
        const bookings = await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
        
    
        return res.json({success:true,bookings})
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//get owner bookings

export const getOwnerBooking = async(req,res)=>{
    try {

        if (req.user.role !== 'owner') {
            return res.json({success:false,message:"unauthorized"})
        }

        const bookings = await Booking.find({owner:req.user._id}).populate('car user').select("-user.password").sort({createdAt:-1})

        res.json({success:true,bookings})
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//api to change booking status
export const changeBookingStatsu = async(req,res)=>{
    try {

        const {_id} = req.user;
        const {bookingId,status} = req.body
        const booking = await Booking.findById(bookingId)

        if (booking.owner.toString() !== _id.toString() ) {

           return res.json({ success: false, message: "not authorized" })
    
        }

        booking.status = status;
        await booking.save()

        res.json({success:true,message:"status updated"})
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}
