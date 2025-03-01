const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const cors = require("cors");
const User=require('./models/User')
const bcrypt=require('bcryptjs')


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.get("/",(req,res)=>{
    res.send("<h1 align=center>Welcome to the WebPage</h1>");
})



mongoose.connect("mongodb+srv://1234:1234@cluster.hnk0e.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster").then(()=>{
    console.log("Connected to MongoDB........")
}).catch(
    (err)=>console.log(err)
)

//Register API
app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const hashedPassword= await bcrypt.hash(password,10)
        const user=new User({username,email,password:hashedPassword})
        await user.save()
        res.json({message: "User Registred.."})
        console.log("User Registration completed...")
    }
    catch(err){
        console.log(err)
    }
})



app.post('/login', async(req, res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }
          res.json({ message: "Login Successful", username: user.username });
        }
    catch(err)
    {
        console.log(err)
    }
})


app.listen(PORT,(err)=>{
    if(err) {console.log(err);}
    else {console.log("Server is running on port :"+PORT);}
});

