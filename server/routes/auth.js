
const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));

// Google login route //
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));


// retrieve user data //
router.get('/google/callback', passport.authenticate('google',
    {
        failureRedirect: '/login-failure',
        successRedirect: '/dashboard'
    }),
    // function (req, res) {
    //     // Successful authentication, redirect home.
    //     res.redirect('/');
    // }
);
router.get('/login-failure', (req, res) => {
    res.send('something went wrong.')
})

// Presist user data after successful authentication
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// Retrieve user data from session.
// Original Code
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
module.exports = router;