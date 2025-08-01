import mongoose from "mongoose";

const connextDB = async() =>{
    try {
        mongoose.connection.on('connected',()=>console.log("Database connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
    } catch (error) {
        console.log(error.message);
    }
}

export default connextDB;