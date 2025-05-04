const User = require('../models/user.model');

exports.isAuthorize = (roles) => async (req, res, next) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            const error = new Error("User not found.");
            error.status = 401;
            return next(error);
        }

        if (!roles.includes(user.role)) {
            const error = new Error("You are not authorized to access this route.");
            error.status = 403;
            return next(error);
        }
        next();
    } catch (err) {
        console.log(err)
        const error = new Error("User not found.");
        error.status = 401;
        error.data = err.message;
        return next(error);
    }
}