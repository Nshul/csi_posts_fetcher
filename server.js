/**
 * Created by anshulmittal on 24/7/17.
 */
const express = require('express');
const app = express();
const passport = require('./config/passport');
const bp = require('body-parser');
const session = require('express-session');
const path = require('path');
app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true
}));

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine','ejs');

app.get('/',(req,res)=>{
    let userb=req.user;
    console.log("Data at /:");console.log(userb);
   res.render('index',{user:req.user});
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/profile',(req,res)=>{
    let userb=req.user;
    console.log("Data at /profile:");console.log(userb);
    res.render('profile',{user:userb});
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use('/public',express.static(path.join(__dirname,'public')));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/login' }));


app.listen(5400, function () {
    console.log("Server started on http://localhost:5400");
});