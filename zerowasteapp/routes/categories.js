const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const passport = require('passport');


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
            res.json({success: false, msg: 'Failed to add event', error: err})
        } else {
            res.json({
                success: true,
                msg: 'Event created'
            })
        }
    })
});

router.put('/events/:_id/update', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Event.updateEvent(req.params._id, {$set: req.body}, (err, event) => {
        if(err){
            res.json({success: false, msg: 'Failed to update event', error: err})
        } else {
            res.json({
                success: true,
                msg: 'Event updated',
            })
        }
    })
});

router.delete('/events/:_id/delete', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Event.deleteEvent(req.params._id, (err, event) => {
        if(err){
            res.json({success: false, msg: 'Failed to delete events', error: err})
        } else if(!event) {
            res.status(400).send('Event not found')
        } else {
            res.json({success: true, msg: 'Event deleted'})
        }
    })
});

router.get('/events', (req, res, next) => {
    Event.getAllEvents((err, events) => {
        if(err) {
            res.json({success: false, msg: 'Failed to get events', error: err})
        } else {
            res.json({
                events: events
            })
        }
    });
});

module.exports = router;
