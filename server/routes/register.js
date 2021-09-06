const { request } = require('express');
const express = require('express');
const router = express.Router();
const user = require('../models/user');

//Create a new user
router.post('/', async (req, res) =>{
    try{
        // req.body.userLevel= ["609b044c3fedfb45458a5f7b"]
        let newUser = new user(req.body);
        await newUser.save();
        console.log("Created a new user:", newUser);
        res.send(newUser);
    } catch(error){
        console.log(error);
        if(error.code === 11000){
            res.status(409).send(`User '${req.body.name}' already exists`);
        }else{
            res.sendStatus(500);
        }
    }
})

module.exports = router;
  
      












