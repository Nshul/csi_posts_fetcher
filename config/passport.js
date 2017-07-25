/**
 * Created by anshulmittal on 24/7/17.
 */
const passport = require ('passport')
    ,FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:5400/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

module.exports = passport;