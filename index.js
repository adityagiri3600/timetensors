const fs = require("fs");
const path = require("path");
const express = require("express");
const https = require("https");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
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

const privateKey = fs.readFileSync("ssl/private.key.pem", "utf8");
const publicKey = fs.readFileSync("ssl/public.key.pem", "utf8");
const domainCert = fs.readFileSync("ssl/domain.cert.pem", "utf8");
const intermediateCert = fs.readFileSync("ssl/intermediate.cert.pem", "utf8");

const credentials = {
    key: privateKey,
    cert: domainCert,
    ca: intermediateCert
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });