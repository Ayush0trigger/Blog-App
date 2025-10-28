export const sendToken = (user, statusCode, message, res) => {
const token = user.getJWTToken();
const cookieExpires = parseInt(process.env.COOKIE_EXPIRES) || 7;

    const options = {
        expires: new Date(
            Date.now() + cookieExpires * 24 * 60 * 60 * 1000),
        httpOnly: true,

    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
};  