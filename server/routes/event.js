var express = require('express');
const event = require('../models/event');
var router = express.Router();

/* List all events */
router.get('/', async (req, res) => {
  let data = await event.find({}).populate("community", {name:1});
  console.info(`records retrieved from mongoose:`, data?.length)
  console.log('data returned=',data)
  res.send(data);
});

/* List one event by ID. */
router.get('/:id', async function(req, res) {
  
  try {
    const data = await event.findOne({_id: req.params.id});
    console.info(`Found event:`, data)
    res.send(data);
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
});

router.get('/community/:id', async function(req, res) {
  
  try {
    let data = await event.find({community: req.params.id}).populate("community", {name:1});
    
    console.info(`Found community and corresponding event record:`, data)

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


/* Create a event */
router.post('/', async (req, res) => {

  let eventCreate = req.body

  try {
    let newEvent = new event(eventCreate)
    await newEvent.save()
    console.log("Created event", newEvent)
    res.send(newEvent)  
  }
  catch (error) {
    console.log(error)
    if (error.code === 11000) {
      res.status(409).send('event ' + eventCreate.name + ' already exists');      
    }
    else {
      res.sendStatus(500)
    }
  }
})

/* Update a event by ID. */
  router.put('/:id', async function(req, res) {  

    let eventToUpdate = req.body
    try {
        console.log("eventToUpdate = ", eventToUpdate);
        let data = await event.findByIdAndUpdate(req.params.id, eventToUpdate);
        console.log("Updated event", data)
        res.send(data);
    }
    catch(error) {
        console.log(error)
        res.sendStatus(500)
    }
})

/* Delete a event by ID. */
router.delete("/:id", async (req, res) => {
  try {
    const data = await event.findByIdAndDelete(req.params.id);

    if (!data) {
      res.sendStatus(404);
    } else {
      console.log("Deleted Event", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)  }
});

module.exports = router;
