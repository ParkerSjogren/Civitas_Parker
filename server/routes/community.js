var express = require('express');
const community = require('../models/community');
var router = express.Router();

/* List all communities */
router.get('/', async (req, res) => {
  let data = await community.find({});
  console.info(`records retrieved from mongoose:`, data?.length)
  console.log('data returned=',data)
  res.send(data);
});

/* List one community by ID. */
router.get('/:id', async function(req, res) {  
  try {
    const data = await community.findOne({_id: req.params.id});
    console.info(`Found Community:`, data)
    res.send(data);
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
});

/* Create a community */
router.post('/', async (req, res) => {
  let communityCreate = req.body

  try {
    let newCommunity = new community(communityCreate)
    await newCommunity.save()
    console.log("Created Community", newCommunity)
    res.send(newCommunity)  
  }
  catch (error) {
    console.log(error)
    if (error.code === 11000) {
      res.status(409).send('Community ' + communityCreate.name + ' already exists');      
    }
    else {
      res.sendStatus(500)
    }
  }
})

/* Update a community by ID. */
  router.put('/:id', async function(req, res) {  
  let communityToUpdate = req.body
  try {

    console.log("communityToUpdate = ", communityToUpdate);
    let data = await community.findByIdAndUpdate(req.params.id, communityToUpdate);
    console.log("Updated Community", data)
    res.send(data);
  }
  catch(error) {
    console.log(error)
    res.sendStatus(500)
  }
})

/* Delete a community by ID. */
router.delete("/:id", async (req, res) => {
  try {
    const data = await community.findByIdAndDelete(req.params.id);

    if (!data) {
      res.sendStatus(404);
    } else {
      console.log("Deleted Community", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)  }
});

module.exports = router;