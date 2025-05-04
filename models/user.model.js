const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    profile:{
        type: String,
        default:"https://i.pinimg.com/originals/0c/bc/54/0cbc54c7e20492fdef6713147922d0f2.png"
    },
    name: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default: "USER",
        enum: ["USER", "ADMIN", "SELLER"],
        required: true
    },
    email: {
        type: String,
        required: true,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique:true
    },
    password: {
        type: String,
        required: true,
        min:6
    },
    contact: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports=mongoose.model("User",userSchema)