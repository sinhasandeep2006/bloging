const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const adminLayout='../views/layouts/admin'
router.get('/admin',async(req,res)=>{
    try {
        const local={
            title: "Admin",
            description:"this is just a description"
        }
        // const data= await Post.find()
        res.render('admin/index',{local,layout:adminLayout})
    } catch (error) {
        console.log(error)
    }
})


module.exports = router