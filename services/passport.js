const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// noinspection JSUnresolvedFunction
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // If user exists, just return them.
        return done(null, existingUser);
      }

      // If they don't already exist, create a new User and return it.
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
