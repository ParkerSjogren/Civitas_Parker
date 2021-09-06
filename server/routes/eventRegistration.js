var express = require('express');
const eventRegistration = require('../models/eventRegistration');
var router = express.Router();

/* List all Event Registration records */
router.get('/', async (req, res) => {
  let data = await eventRegistration.find({}).populate("username", {username:1}).populate("event",{name:1})
  console.info(`records retrieved from mongoose:`, data?.length)
  console.log('data returned=',data)
  res.send(data);
});

/* List one Event Registration record by ID. */
router.get('/:id', async function(req, res) {
  
  try {
    const data = await eventRegistration.findOne({_id: req.params.id});
    console.info(`Found eventRegistration:`, data)
    res.send(data);
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
});

router.get('/event/:id', async function(req, res) {
  
  try {
    let data = await eventRegistration.find({event: req.params.id}).populate("event", {name:1});
    
    console.info(`Found event and corresponding event registration records:`, data)

    if (data) {
      res.send(data);
    }
    else {
      res.send(data);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
});


/* Create a eventRegistration */
router.post('/', async (req, res) => {

  let eventRegistrationCreate = req.body

  try {
    let newEventRegistration = new eventRegistration(eventRegistrationCreate)
    await newEventRegistration.save()
    console.log("Created eventRegistration", newEventRegistration)
    res.send(newEventRegistration)  
  }
  catch (error) {
    console.log(error)
    if (error.code === 11000) {
      res.status(409).send('eventRegistration ' + eventRegistrationCreate.name + ' already exists');      
    }
    else {
      res.sendStatus(500)
    }
  }
})

/* Update a event registration record by ID. */
  router.put('/:id', async function(req, res) {  

    let eventRegistrationToUpdate = req.body
    try {
        console.log("eventRegistrationToUpdate = ", eventRegistrationToUpdate);
        let data = await eventRegistration.findByIdAndUpdate(req.params.id, eventRegistrationToUpdate);
        console.log("Updated eventRegistration", data)
        res.send(data);
    }
    catch(error) {
        console.log(error)
        res.sendStatus(500)
    }
})

/* Delete a event registration record by ID. */
router.delete("/:id", async (req, res) => {
  try {
    const data = await eventRegistration.findByIdAndDelete(req.params.id);

    if (!data) {
      res.sendStatus(404);
    } else {
      console.log("Deleted Event Registration record", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)  }
});

module.exports = router;
