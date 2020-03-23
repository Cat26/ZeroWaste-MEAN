const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const config = require('../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken');


// Events
router.post('/events', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        eventDate: req.body.eventDate,
        owner: req.user,
        eventLocation: req.body.eventLocation
    });

    Event.addEvent(newEvent, (err, event) => {
        if(err){
            res.json({success: false, msg: 'Failed to add events', error: err})
        } else {
            res.json({success: true, msg: 'Event created'})
        }
    })
});

router.delete('/events/:_id/delete', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Event.deleteEvent(req.params._id, (err) => {
        if(err){
            res.json({success: false, msg: 'Failed to delete events', error: err})
        } else {
            res.json({success: true, msg: 'Event deleted'})
        }
    })
});

// router.get('/events', (req, res, next) => {
//     Event.getAllEvents();
// });

module.exports = router;

// events

router.get('/events', (req, res, next) => {
    Event.getAllEvents()
});
