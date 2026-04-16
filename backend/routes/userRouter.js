import express from 'express'

import { loginAdmin,loginUser,registerUser } from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin-login',loginAdmin);

export default userRouter;

