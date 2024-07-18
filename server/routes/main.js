const express = require('express');
const router = express.Router()
const Post =require('../model/post')

//Routes
router.get('',async (req,res)=>{
    const locals={
        title:"NodeJs Blog",
        description:"Simple Blog created with Nodejs, Express & MongoDB."
    }
    try {
        const data=await Post.find();
        res.render('index',{locals,data});
    } catch (error) {
        console.log(error)
    }
})

// function insertPost(){
// Post.insertMany([
//     {
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },{
//         title:"Building a blog",
//         body:"Thid is the body text"
//     },
// ])
// }
// insertPost();

router.get('/about', (req,res)=>{
    res.render('about');
})
module.exports=router