const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Pool = require("pg").Pool;


const pool = new Pool({
    user:process.env.databaseUser,
    host:process.env.host,
    database:process.env.database,
    password:process.env.databasePassword,
    port:process.env.port
})

const app = express();
app.use(express.json());

app.use(cors({
    origin: [process.env.frontEndHost + ':' + process.env.frontEndPort, process.env.frontEndHost + ':' + 5000, process.env.frontEndHost]
}));

app.get('/api/courses', async(req,res) => {
    const courses = await pool.query("SELECT * FROM courses;");

    res.json({courses:courses.rows})
});

app.get('/api/courseContent/:id', async(req,res) => {
    const courseDetails = await pool.query("SELECT * FROM courses WHERE path = $1",['/' + req.params.id])
    const modules = await pool.query("SELECT * FROM modules WHERE course_id = $1", [courseDetails.rows[0].id])
    const lessons = await pool.query("SELECT * FROM lessons WHERE course_id = $1 ORDER BY module_id, id ASC", [courseDetails.rows[0].id])
    res.json({details:courseDetails.rows[0], modules:modules.rows, lessons:lessons.rows});
});

app.post('/api/enroll/', async(req,res) => {
    try{
        const {token, course_id} = req.body;
        const jwtRes = jwt.verify(token, process.env.jwtSecret);
        
        console.log(jwtRes);
        const queryRes = await pool.query("INSERT INTO enrollments VALUES($1,$2,CURRENT_DATE)",[jwtRes, course_id])
        res.json({status:1, message:"Successfully Registered"});
    }catch (err){
        console.error(err);
        res.json({status:-1, message:"Failed to enroll"});
    }
});

app.post('/api/register', async(req,res) => {
    
    try{
        const {email, password, confirmPassword} = req.body;

        if (email === '' || password === '' || confirmPassword === '' || email === undefined || password === undefined || confirmPassword === undefined){
            res.json({status:-1, message:"All fields must have a value!"});
        }else{
            if (password !== confirmPassword){
                res.json({status:-1, message:"Passwords provided do not match!"});
            }

            const checkEmail = await pool.query("SELECT email FROM users WHERE email=$1", [email])

            if (checkEmail.rowCount === 0){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password,salt);

                await pool.query("INSERT INTO users VALUES ($1,$2,$3,$4,$5,$6)", [email,hash,1,"user","",""]);

                res.json({status:1,message:"Successfully registered!"});
            }else{
                res.json({status:-1,message:"Email already exists, please pick another email!"});
            }
        }
    }catch (err){
        console.error(err);
        res.json({status:-1, message:"Failed to register user!"});
    }
    

});

app.post('/api/login', async(req,res) => {
    
    try{
        const {email, password} = req.body;

        const checkEmail = await pool.query("SELECT * FROM users WHERE email=$1", [email])

        if (checkEmail.rowCount !== 0){
            const comp = await bcrypt.compare(password, checkEmail.rows[0].password);

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

app.post('/api/verifyToken', async(req,res) => {
    const {token} = req.body;

    try{
        jwt.verify(token, process.env.jwtSecret);
        return res.json({status:true});
    }catch (err){
        return res.json({status:false});
    }

});

app.listen("5000", () => {
    console.log("API Started");
})