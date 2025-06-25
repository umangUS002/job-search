import JobApplication from "../models/JobApplications.js";
import User from "../models/User.js";
import { v2 as cloudinary } from 'cloudinary';

// Get user data
export const getUserData = async(req, res) => {

    const { userId } = await req.auth();

    try {
        
        const user = await User.findById(userId);

        if(!user){
            return res.json({success: false, message: 'User Not Found'});
        }

        res.json({success: true, user});

    } catch (error) {
        res.json({success: false, message: error.message});
    }

}

// Apply for a job
export const applyForJob = async(req, res) => {

    const { jobId } = req.body;
    const userId = req.auth.userId;

    try {
        const isAlreadyApplied = await JobApplication.find({jobId, userId});

        if (isAlreadyApplied) {
            return res.json({success: false, message: 'Already Applied'});
        }

        const jobData = await Job.findById(jobId);

        if (!jobData) {
            return res.json({success: false, message: 'Job Not Found'})
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({success: true, message: 'Applied Successfully'});

    } catch (error) {
        res.json({success: false, message: error.message });
    }

}

// Get applied jobs of user
export const getUserJobApplications = async(req, res) => {
    try {

        const userId = req.auth.userId
        const applications = await JobApplication.find({ userId })
        .populate('companyId', 'name email image')
        .populate('jobId', 'title description location category level salary')
        .exec()

        if(!applications){
            return res.json({success: false, message: 'No Job Applications Found'});
        }

        return res.json({success: true, applications});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

// Update user profile (resume only)
export const updateUserResume = async(req, res) => {

    try {
        
        const userId = req.auth.userId;
        const resumeFile = req.resumeFile;
        const userData = await User.findById(userId);

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()
        return res.json({success: true, message: 'Resume Updated'});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }

}