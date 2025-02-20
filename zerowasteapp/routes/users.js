const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');
const Shop = require('../models/shops');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register user'})
        } else {
            res.json({success: true, msg: 'User registered'})
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    msg: 'Login successful',
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Event.getUserEvents(req.user._id, (err, userEvents) => {
        if(err) {
            res.status(400).send('Could not get profile')
        } else {
            let user = req.user;
            let events = userEvents;
            Shop.getUserShops(user._id, (err, userShops) => {
                if(err) {
                    res.status(400).send('Could not get shops')
                } else {
                    res.json({
                        user: user,
                        shops: userShops,
                        events: events
                    });
                }
            });
        }
    });
});

// User Calendar
router.get('/calendar', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Event.getEventsToUserCalendar(req.user._id, (err, calendarEvents) => {
        if(err) {
            console.log('error')
        } else {
            res.json({
                eventsCalendar: calendarEvents
            });
        }
    });
});


module.exports = router;