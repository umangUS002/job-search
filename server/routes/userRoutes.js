import express from 'express';
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js';
import upload from '../configs/multer.js';

const userRouter = express.Router();

userRouter.get('/user', getUserData);
userRouter.post('/apply', applyForJob);
userRouter.get('/applications', getUserJobApplications);
userRouter.post('/update-resume', upload.single('resume'), updateUserResume);

export default userRouter;