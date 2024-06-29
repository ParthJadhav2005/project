const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const sessionOptions = {secret: 'mysecret',
    resave:false,
    saveUninitialized:true
};

app.use(session(sessionOptions));
app.use(flash());



app.get("/register",(req,res)=>{
    let {name="annonymous"} = req.query;
    req.session.name = name;
    req.flash("success","user registered successfully!");
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name, msg: req.flash("success")});
});

app.get("/test",(req,res)=>{
    res.send("test successful");
});


app.listen(3000,()=>{
    console.log(`the server is listening to the port`);
});
