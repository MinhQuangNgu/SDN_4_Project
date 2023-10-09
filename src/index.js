import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from "./routes/index.js";
import bodyParser from 'body-parser';
import { connect } from "mongoose";
import { authenticateToken, facebookAuthen, googleAuthen } from './authen.js'
import passport from 'passport'
import cookieParser from 'cookie-parser';
import session from 'express-session'

const { KEY_SESSION } = process.env;
const app = express();


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

app.use(session({
  secret: KEY_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 1000 // 10s
  },
}))
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

passport.use(googleAuthen);
passport.use(facebookAuthen)
passport.serializeUser((user, done) => {
  // console.log('serial', user);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // console.log('deserial');
  done(null, obj);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/user/register/google',
  passport.authenticate('google', {
    failureRedirect: (req, res, next) => {
      return res.status(200).json({
        success: false,
        statusCode: 400,
        data: "error",
      })
    }
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log("req =================================================");
    console.log(req.user);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: req.user
    })
  }
);


app.get('/login/facebook', (req, res, next) => { console.log(0); next() }, passport.authenticate('facebook'));


app.get('/auth/facebook/callback', (req, res, next) => { console.log("callback"); next() },
  // chỗ này thực hiện ở phần authen
  passport.authenticate('facebook', {
    failureRedirect: (req, res, next) => {
      return res.status(200).json({
        success: false,
        statusCode: 400,
        data: "error",
      })
    }
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("req =================================================");
    console.log(req.user);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: req.user
    })
  });

//==========


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

app.use(authenticateToken);
router(app);
app.listen(PORT, () => {
  console.log("Connected to post 5000");
})
