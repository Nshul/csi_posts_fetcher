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

app.use(passport.passport.initialize());
app.use(passport.passport.session());


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
    res.render('profile',{appid:process.env.CLIENT_ID,user:userb,postsdata: 'NULL'});
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use('/public',express.static(path.join(__dirname,'public')));

app.get('/auth/facebook', passport.passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/login' }));

let x;

app.get('/getpostfrompage',(req,res,next)=>{
    passport.FB.api("/126976547314225/feed?fields=shares,likes,message",async function (response) {
            console.log("entered getpostsfrompage");
            if (response && !response.error) {
                console.log("response exists");
                console.log(response.data);
                x=response.data;
            }
            res.render('profile', {user: req.user, postsdata: x});
        }
    );
});


app.listen(5400, function () {
    console.log("Server started on http://localhost:5400");
});