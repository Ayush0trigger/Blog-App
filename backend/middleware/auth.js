import {catchAsyncErrors} from '../middleware/catchAsyncErrors.js';
import {User} from '../models/userSchema.js'
import ErrorHandler from '../middleware/error.js';
import jwt from 'jsonwebtoken'

// AUTHENTICATION
export const isAuthenticated = catchAsyncErrors(async(req, res, next)=>{
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login to access this resource",
            redirect: true
        });
    }
    const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
    
});

// AUTHORIZATION 

export const isAuthorized = (...roles)=> {
return (req, res, next) =>{
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`User with this role(${req.user.role})not allowed to access this resource`

      )
    );  
    }
    next();
};
};