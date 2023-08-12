const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "abc123",
    database : "feedback_10aug2023"
})

app.post("/save", (req, response) => {
    let data = [req.body.name, req.body.phone, req.body.email, req.body.feedback, req.body.rating];
    let sql = "insert into feedback (name, phone_num, email, feedback, rating) values(?,?,?,?,?)";
    con.query(sql, data, (error, result) => {
        if(error)   response.send(error);
        else        response.send(result);
    });
});

app.post("/login", (req,response) => {
    const {username, password} = req.body;

    const credentialCheck = "SELECT * FROM admin WHERE username = ? AND password = ?";
    con.query(credentialCheck, [username,password], (error, result) =>{
        if(error)   response.send(error);
        if(result.length === 0){
            return response.status(401).json({success:false, message:"Invalid Credentials"});
        }
        return response.json({success:true})
    });
});

app.get("/read", (req, response) => {
    let sql = "select * from feedback";
    con.query(sql, (error, result) =>{
        if(error)   response.send(error);
        else        response.send(result);
    });
});

app.delete("/delete", (req,response) => {
    let data = [req.body.id];
    let sql = "delete from feedback where id=?";
    con.query(sql, data, (error, result) => {
        if(error)   response.send(error);
        else        response.send(result);
    })
})

app.listen(9000, () => { console.log("Server ready @9000 !") });