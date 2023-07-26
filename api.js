const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Pool = require("pg").Pool;
const fs = require('fs')

const errorLog = fs.createWriteStream('./errors.log');
const outputLog = fs.createWriteStream('./outputs.log');
const consoler = new console.Console(outputLog, errorLog)


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
    origin: [process.env.frontEndHost + ':' + process.env.frontEndPort, 
    process.env.frontEndHost + ':' + 5000, 
    process.env.frontEndHost,
    process.env.frontEndHost + ':' + process.env.devPort]
}));

app.get('/api/courses', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Starting: /api/courses");
        const courses = await pool.query("SELECT * FROM courses;");
        consoler.log("[" + Date.now().toString() + "]" + "Retrieved all courses from endpoint:/api/courses");
        res.json({courses:courses.rows})

        console.log("Test");
    }catch (err){
        res.json({status:-1, message:"Failed to retrieve courses"});
        consoler.error("[" + Date.now().toString() + "]" + "Failed to retrieve data from endpoint:/api/courses");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
    }
    
});

app.get('/api/courseSegment', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Starting:/api/courseSegment");
        const courses = await pool.query("SELECT * FROM courses LIMIT 3;");
        consoler.log("[" + Date.now().toString() + "]" + "Retrieved course segment from endpoint:/api/courseSegment");
        res.json({courses:courses.rows})
    }catch (err){
        res.json({status:-1, message:"Failed to retrieve courses"});
        consoler.error("[" + Date.now().toString() + "]" + "Failed to retrieve data from endpoint:/api/courseSegment");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
    }
    
});

app.get('/api/articles', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Starting:/api/articles");
        const articles = await pool.query("SELECT * FROM articles");
        consoler.log("[" + Date.now().toString() + "]" + "Retrieved all articles from endpoint:/api/articles");
        res.json({articles:articles.rows});
    }catch (err){
        console.error(err);
        res.json({status:-1, message:"Failed to retrieve articles"});
        consoler.error("[" + Date.now().toString() + "]" + "Failed to retrieve data from endpoint:/api/articles");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
    }
});

app.get('/api/articleContent/:courseCode/:id', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Attempting to retrieve article content: " + req.params.courseCode + "/" + req.params.id);
        const articleDetails = await pool.query("SELECT title, content, description, thumbnail FROM articles WHERE path = $1", ['/posts/' + req.params.courseCode + "/" + req.params.id]);
        consoler.log("[" + Date.now().toString() + "]" + "Retrieved article content from endpoint:/api/articleContent/:courseCode/:id");
        
        res.json({title:articleDetails.rows[0].title, content: articleDetails.rows[0].content, 
        description: articleDetails.rows[0].description, thumbnail: articleDetails.rows[0].thumbnail});
    }catch(err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to retrieve data from endpoint:/api/articleContent/:courseCode/:id");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to retrieve article"});
    }
})

app.get('/api/articlesSegment', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Starting: /api/articlesSegment");
        const articles = await pool.query("SELECT * FROM articles LIMIT 3");
        consoler.log("[" + Date.now().toString() + "]" + "Retrieved articles from endpoint:/api/articlesSegment");
        res.json({articles:articles.rows});
    }catch (err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to retrieve data from endpoint:/api/articlesSegment");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to retrieve articles"});
    }
});

app.post('/api/userCourses', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Attempting to retrieve and decode JWT token");
        const {token} = req.body;
        const jwtRes = jwt.verify(token,process.env.jwtSecret);

        consoler.log("[" + Date.now().toString() + "]" + "Attempting to retrieve user course data");
        const courses = await pool.query("SELECT courses.* FROM enrollments INNER JOIN courses ON enrollments.course_id = courses.id WHERE enrollments.user_id = $1", [jwtRes.user_id]);
        
        consoler.log("[" + Date.now().toString() + "]" + "Retrieved all courses from endpoint:/api/userCourses");
        res.json({courses:courses.rows});
    }catch(err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to post data for endpoint:/api/userCourses");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to retrieve courses"});
    }
});

app.get('/api/courseContent/:id', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Attempting to retrieve courses with ID: " + req.params.id);
        const courseDetails = await pool.query("SELECT * FROM courses WHERE path = $1",['/' + req.params.id])
        consoler.log("[" + Date.now().toString() + "]" + "Attempting to retrieve modules with ID: " + courseDetails.rows[0].id);
        const modules = await pool.query("SELECT * FROM modules WHERE course_id = $1", [courseDetails.rows[0].id])
        consoler.log("[" + Date.now().toString() + "]" + "Attemtping to retrieve lessons with ID: " + courseDetails.rows[0].id);
        const lessons = await pool.query("SELECT * FROM lessons WHERE course_id = $1 ORDER BY module_id, id ASC", [courseDetails.rows[0].id])

        consoler.log("[" + Date.now().toString() + "]" + "Retrieved all course content from endpoint:/api/courseContent/:id");
        res.json({details:courseDetails.rows[0], modules:modules.rows, lessons:lessons.rows});
    }catch (err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to retrieve data from endpoint:/api/courseContent/:id");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to enroll"});
    }
    
});

app.post('/api/updateUserDetails', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Attempting to decode and verify JWT");
        const {token,email, first_name, last_name, country} = req.body;
        const jwtRes = jwt.verify(token,process.env.jwtSecret);
    
        consoler.log("[" + Date.now().toString() + "]" + "/api/updateUserDetails Params: " + email + " " + first_name + " " + last_name + " " + country);

        consoler.log("[" + Date.now().toString() + "]" + "Attempting to update user_details table");
        await pool.query("UPDATE user_details SET first_name = $1, last_name = $2, country = $3 WHERE user_id = $4", [first_name, last_name, country, jwtRes.user_id]);

        consoler.log("[" + Date.now().toString() + "]" + "Attempting to update users tabale");
        await pool.query("UPDATE users SET email = $1 WHERE user_id = $2", [email, jwtRes.user_id]);

        res.json({status:1, message:"Successfully updated!"});
    }catch(err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to post data for endpoint:/api/updateUserDetails");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to update user"});
    }
    
})

app.post('/api/userDetails', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Attempting to retrieve and decode JWT");
        const {token} = req.body;
        const jwtRes = jwt.verify(token, process.env.jwtSecret);

        consoler.log("[" + Date.now().toString() + "]" + "Attempting to retrieve user details");
        const details = await pool.query("SELECT * FROM user_details WHERE user_id = $1", [jwtRes.user_id]);

        consoler.log("[" + Date.now().toString() + "]" + "Attempting to retrieve email");
        const email = await pool.query("SELECT email FROM users WHERE user_id = $1", [jwtRes.user_id])
        res.json({status:1, message:"Retrieved data", email:email.rows[0].email, user_details:details.rows[0], user_id:jwtRes.user_id});

        consoler.log("[" + Date.now().toString() + "]" + "Retrieved all user details from endpoint:/api/userDetails");
    }catch(err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to post data for endpoint:/api/userDetails");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to get user details"})
    }
});

app.post('/api/updatePassword', async(req,res) => {
    try{

        consoler.log("[" + Date.now().toString() + "]" + "Attempting to retrieve and verify JWT");
        const {token,old_password, new_password, confirm_password} = req.body;
        const jwtRes = jwt.verify(token, process.env.jwtSecret);

        consoler.log("[" + Date.now().toString() + "]" + "Starting update password process");
        const user = await pool.query("SELECT * FROM users WHERE user_id=$1", [jwtRes.user_id])

        if (user.rowCount !== 0){
            consoler.log("[" + Date.now().toString() + "]" + "User row count is not 0");
            const comp = await bcrypt.compare(old_password, user.rows[0].password);

            if (comp){
                consoler.log("[" + Date.now().toString() + "]" + "Old password matched, updating password");
                if (new_password === confirm_password){
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(new_password,salt);
                    await pool.query("UPDATE users SET password = $1 WHERE user_id = $2", [hash,jwtRes.user_id])
                }
                consoler.log("[" + Date.now().toString() + "]" + "Password updated successfully");
                res.json({status:1, message:"Password updated successfully!"});
            }else{
                consoler.log("[" + Date.now().toString() + "]" + "Current password was incorrect");
                res.json({status:-1, message:"Your current password is incorrect!"});
            }
        }else{
            consoler.log("[" + Date.now().toString() + "]" + "User provided does not exist");
            res.json({status:-1, message:"Invalid user provided"});
        }

    }catch(err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to post data for endpoint:/api/updatePassword");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to get user details"})
    }
});

async function checkEnroll(token, course_id){

    try{
        consoler.log("[" + Date.now().toString() + "]" + "Checking if user is enrolled in course");
        const checkEnroll = await pool.query("SELECT COUNT(user_id) AS countId FROM enrollments WHERE user_id=$1 AND course_id = $2 ",[token.user_id,course_id]);

        if (checkEnroll.rows[0].countid > 0){
            consoler.log("[" + Date.now().toString() + "]" + "User is enrolled");
            return true;
        }else{
            consoler.log("[" + Date.now().toString() + "]" + "User is not enrolled");
            return false;
        }
    }catch (err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to run the checkEnroll function");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        return false;
    }
    
}

app.post('/api/checkEnroll', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Starting /api/checkEnroll");
        consoler.log("[" + Date.now().toString() + "]" + "Attempting to decode JWT");
        const {token, course_id} = req.body;
        const jwtRes = jwt.verify(token, process.env.jwtSecret);

        consoler.log("[" + Date.now().toString() + "]" + "Checking enrollment status");
        const isEnroll = await checkEnroll(jwtRes,course_id);
        res.json({status:1,message:"Success",value:isEnroll});
    }catch (err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to post data to endpoint:/api/checkEnroll");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to enroll"});
    }
    
});

app.post('/api/enroll/', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Starting /api/enroll");
        const {token, course_id} = req.body;
        const jwtRes = jwt.verify(token, process.env.jwtSecret);
        
        consoler.log("[" + Date.now().toString() + "]" + "Checking user enrollment status");
        const enrollStatus = await checkEnroll(jwtRes,course_id)
        
        if (!enrollStatus){
            consoler.log("[" + Date.now().toString() + "]" + "Not currently enrolled, enrolling now");
            const queryRes = await pool.query("INSERT INTO enrollments VALUES($1,$2,CURRENT_DATE)",[jwtRes.user_id, course_id]);
            res.json({status:1, message:"Successfully Registered"});
        }else{
            consoler.log("[" + Date.now().toString() + "]" + "User is already enrolled");
            res.json({status:-1, message:"User is already registered!"});
        }
        
    }catch (err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to post data to endpoint:/api/enroll");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to enroll"});
    }
});

app.post('/api/register', async(req,res) => {
    
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Starting registration process");
        const {email, password, confirmPassword} = req.body;

        if (email === '' || password === '' || confirmPassword === '' || email === undefined || password === undefined || confirmPassword === undefined){
            consoler.log("[" + Date.now().toString() + "]" + "Field has a missing value");
            res.json({status:-1, message:"All fields must have a value!"});
        }else{
            if (password !== confirmPassword){
                consoler.log("[" + Date.now().toString() + "]" + "Passwords do not match");
                res.json({status:-1, message:"Passwords provided do not match!"});
            }else{

                consoler.log("[" + Date.now().toString() + "]" + "Checking if email exists");
                const checkEmail = await pool.query("SELECT email FROM users WHERE email=$1", [email])

                if (checkEmail.rowCount === 0){
                    consoler.log("[" + Date.now().toString() + "]" + "email does not exist, generating salt and hash");
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password,salt);

                    consoler.log("[" + Date.now().toString() + "]" + "Getting next available user ID");
                    const maxId = await pool.query("SELECT MAX(user_id) AS max_id FROM users;");
                    let user_id = 1;

                    if (maxId.rows[0].max_id !== null){
                        user_id = maxId.rows[0].max_id + 1;
                    }

                    consoler.log("[" + Date.now().toString() + "]" + "Adding user to database");
                    await pool.query("INSERT INTO users(user_id, email,password, active, role) VALUES ($1,$2,$3,$4,$5)", [user_id, email,hash,1,"user"]);
                    await pool.query("INSERT INTO user_details(user_id) VALUES($1)",[user_id]);
                    
                    res.json({status:1,message:"Successfully registered!"});
                }else{
                    consoler.log("[" + Date.now().toString() + "]" + "User email already exists");
                    res.json({status:-1,message:"Email already exists, please pick another email!"});
                }
            }
        }
    }catch (err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to post data to endpoint:/api/register");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({status:-1, message:"Failed to register user!"});
    }
    

});

app.post('/api/login', async(req,res) => {
    
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Starting login process");
        const {email, password} = req.body;

        const checkEmail = await pool.query("SELECT * FROM users WHERE email=$1", [email])

        if (checkEmail.rowCount !== 0){
            consoler.log("[" + Date.now().toString() + "]" + "User exists, verifying password");
            const comp = await bcrypt.compare(password, checkEmail.rows[0].password);

            if (comp){
                consoler.log("[" + Date.now().toString() + "]" + "Password matches");
                const token = jwt.sign({user_id:checkEmail.rows[0].user_id},process.env.jwtSecret);
                res.json({token:token, status:1});
            }else{
                consoler.log("[" + Date.now().toString() + "]" + "Invalid password");
                res.json({message:"Invalid username or password", status:-1});
            }
        }else{
            consoler.log("[" + Date.now().toString() + "]" + "Invalid username");
            res.json({message:"Invalid username or password", status:-1});
        }
    }catch (err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to post data to endpoint:/api/login");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        res.json({message:"Failed to register user!", status:-1});
    }
    

});

app.post('/api/verifyToken', async(req,res) => {
    try{
        consoler.log("[" + Date.now().toString() + "]" + "Verifying user token");
        const {token} = req.body;
        jwt.verify(token, process.env.jwtSecret);
        return res.json({status:true});
    }catch (err){
        consoler.error("[" + Date.now().toString() + "]" + "Failed to post data to endpoint:/api/verifyToken");
        consoler.error("[" + Date.now().toString() + "]" + "Error: " + err);
        return res.json({status:false});
    }

});

app.listen("5000", () => {
    console.log("API Started");
})