import { response } from 'express';
import {catchAsyncErrors} from '../middleware/catchAsyncErrors.js'
import ErrorHandler from '../middleware/error.js';
import {User} from '../models/userSchema.js';
import {sendToken} from '../utils/jwtToken.js';
import cloudinary from 'cloudinary'

export const register = catchAsyncErrors(async (req, res, next) => {
// c
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please enter all fields", 400));
    } 
// g
if(!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload an avatar", 400)); 
}
const { avatar } = req.files;
const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
if(!allowedFormats.includes(avatar.mimetype)){
    return next(new ErrorHandler("Invalid file format. Please provide your avatar in png, jpeg or webp format.",400)
);
}

    const { name, email, password, phone, role, education} = req.body;
    if (!name || !email || !password || !phone || !role || !education || !avatar) {
        return next(new ErrorHandler("Please enter all fields", 400)); 
    }
    let user = await User.findOne({email});
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }

    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath);
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      return next(new ErrorHandler("Cloudinary upload failed. Please try again later.", 500));
    }
    

    user = await User.create({
        name,
        email,
        password,
        phone,
        role,
        education,
        avatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    sendToken(user, 200, "User registered successfully!", res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    const user = await User.findOne({ email}).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    if (user.role !== role) {
        return next(new ErrorHandler("Invalid role", 400));
    }
    sendToken(user, 200, "User logged in successfully!", res);
});

export const logout = catchAsyncErrors((req, res, next)=>{
    res.status(200).cookie("token", "", {
        expires: new Date( Date.now()),
        httpOnly: true
    })
    .json({
        success: true,
        message: "user logged out!",
    });
});


export const getMyProfile = catchAsyncErrors((req, res, next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const getAllAuthors = catchAsyncErrors(async (req, res, next) => {
    const authors = await User.find({ role: "Author" });
    res.status(200).json({
        success: true,
        authors,
    });
})
