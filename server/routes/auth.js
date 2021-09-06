const express = require('express');
const passport = require('passport');
// const User = require('../models/user');
const member = require('../models/member');

let router = express.Router();

router.post('/login',   
    passport.authenticate('local'),
    (req, res) => {
        res.json(req.user)
    }
);

router.get('/loggedInUser', (req, res) => {
    res.json(req.user)
})

router.get('/logout', function(req, res){
    req.logout();
    res.sendStatus(200);
});

router.get('/member/:id', async function(req, res) {
    try {
      let data = await member.findOne({username: req.params.id}).populate("communityDetail.community", {name:1, membershipStartPeriod:1, membershipFee:1, GST:1, PST:1, HST:1, active:1}).populate("communityDetail.userLevel", {name:1, level:1}).populate("username", {username:1});
        
      if (data) {
        res.send(data);
      }
      else {
        res.send({})
      }
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  });
  
  
module.exports = router;
