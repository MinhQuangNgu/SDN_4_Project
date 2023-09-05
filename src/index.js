const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require("./routes/index");
const app = express();
const mongoose = require("mongoose");
dotenv.config();
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000/"
    })
);

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
    })
    .then((res) => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(`your error :${err}`);
    });

const PORT = process.env.PORT || 5000;
router(app);
app.listen(PORT,() => {
    console.log("Connected to post 5000");
})