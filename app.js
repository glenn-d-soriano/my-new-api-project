require('dotenv').config();
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
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
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