import express from 'express'
import { getUserData, registerUser, userLogin } from '../controllers/UserContoller.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',userLogin);
userRouter.get('/data',protect,getUserData);

export default userRouter;