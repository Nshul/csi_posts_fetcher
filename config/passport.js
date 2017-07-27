/**
 * Created by anshulmittal on 24/7/17.
 */
const passport = require ('passport')
    ,FacebookStrategy = require('passport-facebook').Strategy;
const FB = require('fb');
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
    FB.setAccessToken(accessToken);
    // console.log("in passport");
    // console.log(profile);
    // console.log("exit passport");
        done(null, profile);
    }
));


module.exports = {passport,FB};