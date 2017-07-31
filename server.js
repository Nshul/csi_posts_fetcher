/**
 * Created by anshulmittal on 24/7/17.
 */
const express = require('express');
const app = express();
const passport = require('./config/passport');
const bp = require('body-parser');
const session = require('express-session');
const path = require('path');
const db = require('./config/db');

//To create an express session

app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true
}));

//To parse the passed data

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

//This initialises Passport js

app.use(passport.passport.initialize());
app.use(passport.passport.session());

//This is used to set engine to process and render the .ejs files

app.set('view engine','ejs');

//Accessing the main/root of the website

app.get('/',(req,res)=>{
    let userb=req.user;

    // console.log("Data at /:");console.log(userb);

    res.render('index',{user:req.user});
});

//Accessing Login Page

app.get('/login',(req,res)=>{
    res.render('login');
});

//To access profile

app.get('/profile',(req,res)=>{
    let userb=req.user;

    // console.log("Data at /profile:");console.log(userb);

    res.render('profile',{//appid:process.env.CLIENT_ID,
        user:userb,postsdata: 'NULL'});
});

//To logout

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

//Array created to store all the promises of the posts

var promises=[];

//Here req is sent from the Profile.ejs to fetch all the posts

app.get('/getpostfrompage',(req,res,next)=>{
    passport.FB.api("/126976547314225/posts?fields=shares,likes,message,full_picture,created_time",function (response) {

        //console.log("entered getpostsfrompage");

            if (response && !response.error) {

                // console.log("response exists");
                // console.log(response);

                for(let i in response.data){

                    // console.log("logging response.data for :"+i);

                    promises.push(db.insertpost(response.data[i]));
                }

                //This runs after all the posts have been stored,Thus there is no loss of data

                Promise.all(promises).then(()=>{

                    // console.log("Now calling and dsiplaing from db");

                    db.displaypost().then((data)=>{
                        x=data;

                        // console.log("Entered displaypost");
                        // console.log(x);

                        res.render('profile', {user: req.user, postsdata: x});
                    }).catch((err)=>{
                        console.log("Error");
                        console.log(err);
                    });
                }).catch((err)=>{
                    console.log("Error in promises");
                    console.log(err);
                })
            }
        }
    );
});

app.use((req,res,next)=>{
   res.send("Error : 404 Page Requested Not Found")
});

app.listen(5400, function () {
    console.log("Server started on http://localhost:5400");
});