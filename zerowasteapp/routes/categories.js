const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Address = require('../models/address');
const Shop = require('../models/shops');
const passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        callback(null, true);
    } else {
        callback(new Error('wrong file format'), false);
    }
};

const upload = multer({storage: storage, fileFilter: fileFilter});


// Events
router.post('/events', upload.single('eventImage'), passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        eventDate: req.body.eventDate,
        owner: req.user,
        eventLocation: req.body.eventLocation,
        eventImage: req.file.path
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
    });
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
            fs.unlink(event.eventImage, (err) => {
                if(err) {
                    console.log(err);
                }
            });
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

// Address
router.post('/newAddress', (req, res, next) => {
    let newAddress = new Address({
        street: req.body.street,
        buildingNumber: req.body.buildingNumber,
        apartmentNumber: req.body.apartmentNumber,
        postCode: req.body.postCode,
        cityName: req.body.cityName
    });

    Address.addAddress(newAddress, (err, address) => {
        if(err){
            res.json({success: false, msg: 'Failed to add new address.'})
        }else {
            res.json({success: true, msg: 'New address added.'})
        }
    });
});

// Shops
router.post('/newShop', (req, res) => {
    let newShop = new Shop({
        name: req.body.name,
        shopAddress: req.body.shopAddress,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        rating: req.body.rating,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        idUser: req.user,
        enabled: req.body.enabled
    });

    Shop.addShop(newShop, (err, shop) =>{
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to add new shop.'
            })
        } else {
            res.json({
                success: true,
                msg: 'Shop Added.'
            })
        }
    })
});

module.exports = router;
