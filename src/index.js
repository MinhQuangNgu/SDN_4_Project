import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from "./routes/index.js";
import bodyParser from 'body-parser';
const app = express();
import { connect } from "mongoose";
import { authenticateToken } from './authen.js'
config();
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000"
    })
);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//  app.use('/api/v1', router);

connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})
    .then((res) => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(`your error :${err}`);
    });
const PORT = process.env.PORT || 5000;

//app.use(authenticateToken);
router(app);
app.listen(PORT, () => {
    console.log("Connected to post 5000");
})