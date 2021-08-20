//importing modules
require('dotenv').config()
const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
//middleware
const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')

const session = require("express-session");
const passport = require('passport');
const User = require("./models/userSchema") 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({
   secret:process.env.SECRET,
   resave:true,
    saveUninitialized:true
}));

require('./config/passport')(passport);


//db config
const DB_PASSWORD = process.env.DB_PASSWORD
const db =  `mongodb+srv://encryptid-dev:${DB_PASSWORD}@cluster0.510gr.mongodb.net/core-finals`
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to Mongo DB"))

//passport
app.use(passport.initialize());
app.use(passport.session());


// const homeRoute = require("./routes/homeRoute")
const registerRoute = require("./routes/authRoute")
const dashboardRoute = require("./routes/dashboardRoute")
const classRoute = require('./routes/classRoute')
const quizRoute = require("./routes/quizRoute")
const meetingRoute = require("./routes/meetingRoute")
const homeRoute = require("./routes/homeRoute")
const forumRoute = require("./routes/forumRoute")
const doubtRoute = require('./routes/doubtRoute')
//routes
app.use("/", registerRoute)
app.use("/dashboard", dashboardRoute)
app.use('/class', classRoute)
app.use('/quiz', quizRoute)
app.use("/meet", meetingRoute)
app.use("/", homeRoute)
app.use("/", forumRoute)
app.use("/doubt", doubtRoute)
app.use("/forums", forumRoute)

//listening
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`App Listening on port ${PORT}`);
})