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
    try{
        const courseDetails = await pool.query("SELECT * FROM courses WHERE path = $1",['/' + req.params.id])
        const modules = await pool.query("SELECT * FROM modules WHERE course_id = $1", [courseDetails.rows[0].id])
        const lessons = await pool.query("SELECT * FROM lessons WHERE course_id = $1 ORDER BY module_id, id ASC", [courseDetails.rows[0].id])
        res.json({details:courseDetails.rows[0], modules:modules.rows, lessons:lessons.rows});
    }catch (err){
        console.error(err);
        res.json({status:-1, message:"Failed to enroll"});
    }
    
});

app.post('/api/updateUserDetails', async(req,res) => {
    try{
        const {token,email, first_name, last_name, country} = req.body;
        const jwtRes = jwt.verify(token,process.env.jwtSecret);
    
        await pool.query("UPDATE user_details SET first_name = $1, last_name = $2, country = $3 WHERE user_id = $4", [first_name, last_name, country, jwtRes.user_id]);
        await pool.query("UPDATE users SET email = $1 WHERE user_id = $2", [email, jwtRes.user_id]);

        res.json({status:1, message:"Successfully updated!"});
    }catch(err){
        console.error(err);
        res.json({status:-1, message:"Failed to update user"});
    }
    
})

app.post('/api/userDetails', async(req,res) => {
    try{
        const {token} = req.body;
        const jwtRes = jwt.verify(token, process.env.jwtSecret);

        const details = await pool.query("SELECT * FROM user_details WHERE user_id = $1", [jwtRes.user_id]);
        const email = await pool.query("SELECT email FROM users WHERE user_id = $1", [jwtRes.user_id])
        res.json({status:1, message:"Retrieved data", email:email.rows[0].email, user_details:details.rows[0], user_id:jwtRes.user_id});
    }catch(err){
        console.error(err);
        res.json({status:-1, message:"Failed to get user details"})
    }
});

app.post('/api/updatePassword', async(req,res) => {
    try{
        const {token,old_password, new_password, confirm_password} = req.body;
        const jwtRes = jwt.verify(token, process.env.jwtSecret);

        const user = await pool.query("SELECT * FROM users WHERE user_id=$1", [jwtRes.user_id])

        if (user.rowCount !== 0){
            const comp = await bcrypt.compare(old_password, user.rows[0].password);

            if (comp){
                if (new_password === confirm_password){
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(new_password,salt);
                    await pool.query("UPDATE users SET password = $1 WHERE user_id = $2", [hash,jwtRes.user_id])
                }
                res.json({status:1, message:"Password updated successfully!"});
            }else{
                res.json({status:-1, message:"Your current password is incorrect!"});
            }
        }else{
            res.json({status:-1, message:"Invalid user provided"});
        }

    }catch(err){
        console.error(err);
        res.json({status:-1, message:"Failed to get user details"})
    }
});

async function checkEnroll(token, course_id){
    const checkEnroll = await pool.query("SELECT COUNT(user_id) AS countId FROM enrollments WHERE user_id=$1 AND course_id = $2 ",[token.user_id,course_id]);

    if (checkEnroll.rows[0].countid > 0){
        return true;
    }else{
        return false;
    }
}

app.post('/api/checkEnroll', async(req,res) => {
    try{
        const {token, course_id} = req.body;
        const jwtRes = jwt.verify(token, process.env.jwtSecret);
        const isEnroll = await checkEnroll(jwtRes,course_id);
        res.json({status:1,message:"Success",value:isEnroll});
    }catch (err){
        console.error(err);
        res.json({status:-1, message:"Failed to enroll"});
    }
    
});

app.post('/api/enroll/', async(req,res) => {
    try{
        const {token, course_id} = req.body;
        const jwtRes = jwt.verify(token, process.env.jwtSecret);
        
        const enrollStatus = await checkEnroll(jwtRes,course_id)
        
        if (!enrollStatus){
            const queryRes = await pool.query("INSERT INTO enrollments VALUES($1,$2,CURRENT_DATE)",[jwtRes.user_id, course_id]);
            res.json({status:1, message:"Successfully Registered"});
        }else{
            res.json({status:-1, message:"User is already registered!"});
        }
        
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

                const maxId = await pool.query("SELECT MAX(user_id) AS max_id FROM users;");
                let user_id = 1;

                if (maxId.rows[0].max_id !== null){
                    user_id = maxId.rows[0].max_id + 1;
                }

                await pool.query("INSERT INTO users(user_id, email,password, active, role) VALUES ($1,$2,$3,$4,$5)", [user_id, email,hash,1,"user"]);
                await pool.query("INSERT INTO user_details(user_id) VALUES($1)",[user_id]);
                
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
                const token = jwt.sign({user_id:checkEmail.rows[0].user_id},process.env.jwtSecret);
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