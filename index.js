const express = require('express');
require('dotenv').config()
const app = express();

const cookieParser = require("cookie-parser");
const { mongoDB } = require('./config/mongoDB');

const PORT = process.env.PORT || 3000;

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const sellerRoute = require('./routes/admin/admin.product');

app.use(express.json());
app.use(cookieParser())

mongoDB();
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/seller/product', sellerRoute);
app.get('/test',(req,res) => {
    res.send("i'm live")
})


app.listen(PORT, ()=> console.log(`App is running on ${PORT}`))