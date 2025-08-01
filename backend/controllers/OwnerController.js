import imagekit from "../configs/imagekit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Cars.js";
import User from "../models/User.js";
import fs from 'fs'

export const changeRoleToOwner = async (req, res) => {

    try {

        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list cars" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }

}

export const addCar = async (req, res) => {
    try {

        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [{
                width: '1280'
            }, {
                quality: 'auto'
            }, {
                format: 'webp'
            }]
        });

        const image = optimizedImageUrl;
        await Car.create({ ...car, owner: _id, image })

        res.json({ success: true, message: "Car Added" })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//get owner cars
export const getOwnerCars = async (req, res) => {


    try {

        const { _id } = req.user;
        const cars = await Car.find({ owner: _id })
        res.json({ success: true, cars })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//toggle car availabilty

export const toggleCarAvailabilty = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;

        const car = await Car.findById(carId); // ✅ Correct

        if (!car) {
            return res.json({ success: false, message: "Car not found" });
        }

        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        car.isAvailable = !car.isAvailable;
        await car.save();

        res.json({ success: true, message: "Availability Toggled" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


//api to delete car
export const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;  

        const car = await Car.findById(carId); // ✅ Correct


        if (!car) {
            return res.json({ success: false, message: "Car not found" });
        }

        if (car.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        car.owner = null;
        car.isAvailable = false;
        await car.save();

        res.json({ success: true, message: "Car removed" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


//Dashboard data
export const getDashBoardData = async (req, res) => {


    try {

        const { _id, role } = req.user;

        if (role !== "owner") {
            return res.json({ success: false, message: "unauthorized" })

        }
        const cars = await Car.find({ owner: _id })

        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 })

        const pendingBookings = await Booking.find({ owner: _id, status: "pending" })
        const completedBookings = await Booking.find({ owner: _id, status: "confirmed" })

        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price, 0)

        const dashBoardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue
        }

        console.log(dashBoardData.totalCars);


        res.json({ success: true, dashBoardData })

        res.json({ success: true, message: "Availability Toggled" })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//api to update user image
export const updateUserImage = async (req, res) => {
    try {

        const { _id } = req.user;

        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [{
                width: '400'
            }, {
                quality: 'auto'
            }, {
                format: 'webp'
            }]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id, { image });

        res.json({ success: true, message: "Image updated" })

        res.json({ success: true, message: "Car Added" })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}