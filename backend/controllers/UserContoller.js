import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from '../models/Cars.js';
//generate jwt token
const generateToken = (userId) => {
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET)

}

//Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password || password.length < 8) {
            return res.json({ success: false, message: "Fill All The Fields" })
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.json({ success: false, message: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, password: hashedPassword
        })

        const token = generateToken(user._id.toString())
        res.json({ success: true, token, message: "user created" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//Login User
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: error.message })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
        const token = generateToken(user._id.toString());
        res.json({ success: true, token })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//Get user data using token
export const getUserData = async (req, res) => {
    try {
        const { user } = req;
        res.json({ success: true, user })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//api for get car list
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvailable: true })
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}