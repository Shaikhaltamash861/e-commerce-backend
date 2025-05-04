const mongoose = require("mongoose");

const mongoDB = async () => {
  
  try {
      // eslint-disable-next-line no-undef
      await mongoose.connect(process.env.DB_URL, {
      connectTimeoutMS: 60000,
      socketTimeoutMS: 60000,
    });
    
    console.log("MongoDB Database connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message, error.stack);
    throw error;
  }
};

module.exports = {
  mongoDB,
};