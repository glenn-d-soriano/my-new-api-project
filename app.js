require('dotenv').config();
console.log("CLIENT_ID:", process.env.GITHUB_CLIENT_ID);
console.log("CALLBACK_URL:", process.env.CALLBACK_URL);
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// 1. Middleware Setup
app
  .use(bodyParser.json())
  .use(session({
    secret: "secret", 
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
  .use(cors({ origin: '*' }));

// 2. CONFIGURE THE GITHUB STRATEGY (Must be BEFORE routes)
passport.use('github', new GitHubStrategy({
    clientID: "Ov23lisqqwVqjpoJ9l3N", // Use the ID from your screenshot
    clientSecret: "a78ffcfc67f7fffdd829d2dd99aa120af8b84465", // Use the Secret from your screenshot
    callbackURL: "https://my-new-api-project-206i.onrender.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

// 3. TELL PASSPORT HOW TO SERIALIZE
passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

// 4. LOAD ROUTES LAST
app.use('/', require('./routes'));

// 5. DATABASE CONNECTION
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});