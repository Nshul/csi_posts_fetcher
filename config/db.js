/**
 * Created by anshulmittal on 24/7/17.
 */
const Sequelize = require('sequelize');
const db = new Sequelize({
    host: 'localhost',
    username: 'testuser',
    password: 'password',
    database: 'csitask1',
    dialect: 'mysql',
});

const Posts = db.define('posts',{
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postid: Sequelize.DataTypes.STRING,
    message: Sequelize.DataTypes.TEXT,
    likes: Sequelize.DataTypes.INTEGER,
    shares: Sequelize.DataTypes.INTEGER,
    picture: Sequelize.DataTypes.STRING,
    created_time: Sequelize.DataTypes.DATE
},{charset: 'utf8',collate: 'utf8_unicode_ci'});

function insertposts(arr){
    console.log("inserting post");
    let i=0;
    return new Promise((resolve,reject)=>{
    while(i<arr.length){
        console.log("inserting "+i);
        insertpost(arr[i]).then(i++);
    }
    if(i==arr.length)
        resolve({success:true});
    })
}

function displaypost(){
    console.log("DB function displayposts");
    return Posts.findAll({
        order:[['likes','DESC'],['shares','DESC']]
    })
}

function insertpost(postsdata) {
    let likes=0,shares=0,picture=null;
    if(postsdata.likes)
        likes = postsdata.likes.data.length;
    if(postsdata.shares)
        shares=postsdata.shares.count;
    if(postsdata.full_picture) {
        console.log("picture present:");
        console.log(postsdata.full_picture);
        picture = postsdata.full_picture;
        console.log("displaying picture variable:");
        console.log(picture);
    }
    console.log("Time:");
    console.log(postsdata.created_time);
    let Time = new Date(postsdata.created_time);
    console.log(Time.getDate()+'/'+(Time.getMonth()+1)+'/'+Time.getFullYear()+" "+Time.getHours()+':'+Time.getMinutes()+':'+Time.getSeconds());
    console.log("this is layman time");
    return Posts.findOrCreate({where: {postid: postsdata.id},defaults: {
        postid: postsdata.id,
        message: postsdata.message,
        likes: likes,
        shares: shares,
        picture: picture,
        created_time: Time
    }}).spread((user,created)=>{
        if(created) {
            console.log("Created");
        }
        else{
            console.log("Present");
        }
    })
}

db.sync().then(function () {
    console.log("database ready");
});

module.exports = {insertpost,displaypost};