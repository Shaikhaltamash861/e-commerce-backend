const jwt = require('jsonwebtoken');
exports.generate = (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" }, { algorithm: "HS256" });
    return token;
}

exports.verify = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decoded.id;
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new Error("TokenExpiredError: The token has expired.");
        }
        throw new Error("TokenInvalidError: Invalid token.");
    }
}