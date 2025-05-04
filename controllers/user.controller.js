const User = require('../models/user.model');
const { generate } = require('../utills/token');

exports.signUp = async(req,res) => {
    try {
        const { name, email, password, profile, role } = req.body;
        if(!name || !email || !password || !role) {
            return res.status(400).json({message: "Missing field", success: false});
        }
        const user = await User.findOne({email});
        if(user) {
            return res.status(409).json({message: "User with this email already exists.", success: false});
        }
        const response = await User(req.body);
        await response.save();
        return res.status(200).json({message: "Sign up successfully.", success: true});
        console.log(response);
    } catch (error) {
        console.dir(error, { depth: null});
        return res.status(500).json({ message: "Internal Server error" });
    }
}

exports.login = async(req,res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(409).json({ message: 'Credentials are missing', success: false});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({ message: 'Email not found', success: false});
        }

        if(user.password !== password) {
            return res.status(401).json({ message: 'Wrong password', success: false});
        } 

        const token = generate(user);
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        }
        );
        return res.status(200).json({ message: 'Logged in successfully', success: true});

    } catch (error) {
        
    }
}