require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts')
const connectdb=require('./server/config/db')
const app = express();
const PORT = 3000 || process.env.PORT;

//connect to db
connectdb()
app.use(express.static('public'));
// templeting engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');



app.use('/',require('./server/routes/main'))
app.listen(PORT,()=>{
    console.log(`app listeing on the port ${PORT} `)
})