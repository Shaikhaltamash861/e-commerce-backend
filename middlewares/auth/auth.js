const User = require("../../models/user.model");
const { verify } = require("../../utills/token");

const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            const error = new Error("Authentication token not found.");
            error.status = 401;
            return next(error);
        }
        let userId;
        try {
            userId = verify(token);
        } catch (err) {
            console.log(err);
            if (error.message.startsWith("TokenExpiredError")) {
                const error = new Error("Token has expired. Please log in again.");
                error.status = 401;
                return next(error);
            }
            const error = new Error("Invalid token.");
            error.status = 401;
            return next(error);
        }

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found.");
            error.status = 401;
            return next(error);
        }
        req.user = user?._id;
        next();
    } catch (err) {
        console.error("Internal Server Error", err);
        const error = new Error("Internal Server Error");
        error.status = 500;
        return next(error);
    }
};

module.exports = { checkAuth };