const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const MongoDbHandler = require("./MongoHandler.js");

const app = express();
app.use(express.json());

app.use(cors({
    origin: [process.env.frontEndHost + ':' + process.env.frontEndPort, process.env.frontEndHost + ':' + 5000, process.env.frontEndHost]
}));

app.get("/", async(req,res) => {
    console.log("Received");
    res.end();
});

app.get("/api/articles", async(req,res) => {
    const mongo = new MongoDbHandler.MongoDbHandler(process.env.host, process.env.port,process.env.database);
    const articles = await mongo.getAll("Articles");

    res.json(articles);
    res.end();
});

app.get("/api/getArticle/:path", async(req,res) => {
    const mongo = new MongoDbHandler.MongoDbHandler(process.env.host, process.env.port,process.env.database);
    const content = await mongo.singleFind("Articles",{path:"/" + req.params.path});
    
    res.json(content);

    res.end();
})

app.listen("5000", () => {
    console.log("API Started");
})