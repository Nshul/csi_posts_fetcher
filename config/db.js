/**
 * Created by anshulmittal on 24/7/17.
 */
const Sequelize = require('sequelize');
const db = new Sequelize({
    host: 'localhost',
    user: 'testuser',
    password: 'password',
    database: 'csitask1',
    dialect: 'mysql'
});

const Users = db.define('user',{

})

const Posts = db.define('posts',{

})