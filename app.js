const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport'); // Added Passport
const session = require('express-session'); // Added Session
const GitHubStrategy = require('passport-github2').Strategy; // Added Strategy
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret", // This can be any string, but it's required
    resave: false,
    saveUninitialized: true,
  }))
  // Initialize Passport and Session middleware
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
  .use(cors({ origin: '*' }))
  .use('/', require('./routes'));

// Configure the GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // Return for profile
    return done(null, profile);
  }
));

// Tell Passport how to "remember" the user
passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});