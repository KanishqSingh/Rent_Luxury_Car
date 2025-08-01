

import express from 'express';
import { protect } from '../middleware/auth.js';
import { addCar, changeRoleToOwner, deleteCar, getDashBoardData, getOwnerCars, toggleCarAvailabilty, updateUserImage } from '../controllers/OwnerController.js';
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

ownerRouter.post('/change-role',protect,changeRoleToOwner)
ownerRouter.post('/add-car',upload.single("image"),protect,addCar)
ownerRouter.get('/cars',protect,getOwnerCars)
ownerRouter.post('/toggle-car',protect,toggleCarAvailabilty)
ownerRouter.post('/delete-car',protect,deleteCar)
ownerRouter.get('/dashboard',protect,getDashBoardData)
ownerRouter.post('/update-image',upload.single('image'),protect,updateUserImage)
export default ownerRouter;