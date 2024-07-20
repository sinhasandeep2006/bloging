require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts')
const methodOverRide=require('method-override')
const connectdb=require('./server/config/db')
const cookieParser = require('cookie-parser');
const MongoStore =require('connect-mongo');
const session = require('express-session');
const isActiveRoute=require('./server/helpers/routeHelpers')
const app = express();
const PORT = 3000 || process.env.PORT;

//connect to db
connectdb()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
app.use(methodOverRide('_method'))
app.use(session({
    secret:'Keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URL
    })
}))
app.use(express.static('public'));
// templeting engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');
app.locals.isActiveRoute=isActiveRoute


app.use('/',require('./server/routes/main'))
app.use('/',require('./server/routes/admin'))
app.listen(PORT,()=>{
    console.log(`app listeing on the port ${PORT} `)
})