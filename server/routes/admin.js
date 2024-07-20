const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const User = require('../model/userModel');
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
const adminLayout='../views/layouts/admin'
const jwtSecret=process.env.JWT_SECRET

const authMiddlWare=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).jsn({
            message:'Unauthorized'
        })
    }
    try {
        const deconded=jwt.verify(token,jwtSecret);
        req.userId=deconded.userId
        next()
    } catch (error) {
        res.status(401).jsn({
            message:'Unauthorized'
        })
    }
    
}


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


router.get('/admin',(req,res)=>{
    res.render('admin/index',{local,layout:adminLayout})
})


router.post('/admin',async(req,res)=>{
    try {
        const {username,password} =req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        const isPasswordValid =await bcrypt.compare(password,user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }
        const token =jwt.sign({userId:user._id},jwtSecret)
        res.cookie('token',token,{httpOnly:true});
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
    }
})
router.post('/register',async(req,res)=>{
    try {
        const {username,password} =req.body
       const hashedPassword =await bcrypt.hash(password,12);
       try {
        const user =await User.create({username,password:hashedPassword})
        res.status(201).json({
            alert:"user created"
            
        })
        
       } catch (error) {
        if (error.code===11000) {
            res.status(409).json({
                message:'User already in use',
            })
        }
        res.status(500).json({
            message:"internal server error"
        })
       }
    } catch (error) {
        console.log(error)
    }
})

router.get('/dashboard', authMiddlWare,async (req,res)=>{

    try {
        const data=await Post.find();
        res.render('admin/dashboard',{
            data,
            layout:adminLayout
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
    


})

router.get('/add-post', authMiddlWare ,async(req,res)=>{
    try {
       const data=await Post.find();
       res.render('admin/add-post',{
        data,
        layout:adminLayout
       }) 
    } catch (error) {
        console.log(error)
    }
})

router.post('/add-post', authMiddlWare ,async(req,res)=>{
        try {
            const newPost =new Post({
                title:req.body.title,
                body:req.body.body
            })
            await Post.create(newPost)
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
})
router.get('/edit-post/:id', authMiddlWare ,async(req,res)=>{
    try {
       const data=await Post.findOne({_id:req.params.id});
       res.render('admin/edit-post',{
        data,
        layout:adminLayout
       }) 
    } catch (error) {
        console.log(error)
    }
})


router.put('/edit-post/:id', authMiddlWare ,async(req,res)=>{
    try {
      await Post.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        body:req.body.body,
        updatedAt: Date.now()
      })
      res.redirect(`/dashboard`)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete-post/:id', authMiddlWare ,async(req,res)=>{
    try {
        await Post.deleteOne({_id:req.params.id})
      
      res.redirect(`/dashboard`)
    } catch (error) {
        console.log(error)
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.redirect('/')
})

module.exports = router