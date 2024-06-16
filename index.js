const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());

app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/timetrack");
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established");
});

app.use("/api/user", require("./api/user"));
app.use("/api/timetable", require("./api/timetable"));
app.use("/api/classObject", require("./api/classObject"));
app.use("/auth", require("./api/auth"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
