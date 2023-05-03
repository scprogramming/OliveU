const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const MongoDbHandler = require("./MongoHandler.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.use(cors({
    origin: [process.env.frontEndHost + ':' + process.env.frontEndPort, process.env.frontEndHost + ':' + 5000, process.env.frontEndHost]
}));

app.post('/api/register', async(req,res) => {
    
    try{
        const mongoConn = new MongoDbHandler.MongoDbHandler(process.env.host, process.env.port, process.env.database);
        const {email, password, confirmPassword} = req.body;

        if (email === '' || password === '' || confirmPassword === '' || email === undefined || password === undefined || confirmPassword === undefined){
            res.status(400);
            res.json({message:"All fields must have a value!"});
        }else{
            if (password !== confirmPassword){
                res.status(400);
                res.json({message:"Passwords provided do not match!"});
            }

            const checkEmail = await mongoConn.singleFind("Users", {email:email});

            if (checkEmail === null){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password,salt);

                await mongoConn.singleInsert("Users", {email:email, password:hash, active:1, role:"user", first_name:"", last_name:""});

                res.status(200);
                res.json({message:"Successfully registered!"});
            }else{
                res.status(400);
                res.json({message:"Email already exists, please pick another email!"});
            }
        }
    }catch (err){
        console.error(err);
        res.status(500);
        res.json({message:"Failed to register user!"});
    }
    

});

app.post('/api/login', async(req,res) => {
    
    try{
        const mongoConn = new MongoDbHandler.MongoDbHandler(process.env.host, process.env.port, process.env.database);
        const {email, password} = req.body;

        const checkEmail = await mongoConn.singleFind("Users", {email:email});

        if (checkEmail !== null){
            const comp = await bcrypt.compare(password, checkEmail.password);

            if (comp){
                const token = jwt.sign(email,process.env.jwtSecret);
                res.json({token:token, status:1});
            }else{
                res.json({message:"Invalid username or password", status:-1});
            }
        }else{
            res.json({message:"Invalid username or password", status:-1});
        }
    }catch (err){
        console.error(err);
        res.json({message:"Failed to register user!", status:-1});
    }
    

});

app.listen("5000", () => {
    console.log("API Started");
})