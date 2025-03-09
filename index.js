const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path')

const app = express()

const PORT = process.env.PORT || 4000;

dotEnv.config();
app.use(cors())


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB........")
}).catch(
    (err)=>console.log(err)
)

app.use(bodyParser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads',express.static('uploads'));
``

app.use('/',(req,res)=>{
    res.send("Welcome to SUBY");
})

app.listen(PORT,(err)=>{
    if(err) {console.log(err);}
    else {console.log("Server is running on port :"+PORT);}
});

