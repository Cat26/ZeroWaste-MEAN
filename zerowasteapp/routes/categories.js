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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        callback(null, true);
    } else {
        callback(new Error('wrong file format'), false);
    }
};

const upload = multer({storage: storage, fileFilter: fileFilter});


// Events
router.post('/events', upload.single('eventImage'), passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log(req)
    let newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        eventDate: req.body.eventDate,
        owner: req.user,
        eventLocation: req.body.eventLocation,
        eventImage: req.file.path
    });

    Event.addEvent(newEvent, (err, event) => {
        if (err) {
            res.json({success: false, msg: 'Failed to add event', error: err})
        } else {
            res.json({
                success: true,
                msg: 'Event created'
            })
        }
    })
});

router.put('/events/:_id/update', upload.single('eventImage'), passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let updateEvent = req.body;
    let img_path = '';
    if (req.file) {
        updateEvent.eventImage = req.file.path;
        Event.getEventFilePathByEventId(req.params._id, (err, path) => {
            if (err) {
                res.json({success: false, msg: 'Failed to get image path', error: err})
            } else {
                img_path = path.eventImage;
            }
        })
    }
    Event.updateEvent(req.params._id, {$set: updateEvent}, (err, event) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update event', error: err})
        } else {
            res.json({
                success: true,
                msg: 'Event updated',
            });
            if (img_path) {
                fs.unlink(img_path, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
    })
});

router.delete('/events/:_id/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Event.deleteEvent(req.params._id, (err, event) => {
        if (err) {
            res.json({success: false, msg: 'Failed to delete events', error: err})
        } else if (!event) {
            res.status(400).send('Event not found')
        } else {
            fs.unlink(event.eventImage, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            res.json({success: true, msg: 'Event deleted'})
        }
    })
});

router.get('/events/:_id/details', (req, res, next) => {
    Event.getEventById(req.params._id, (err, event) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get event details', error: err})
        } else {
            res.json({event: event})
        }
    })
});

router.get('/events', (req, res, next) => {
    Event.getAllEvents((err, events) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get events', error: err})
        } else {

            res.json({
                events: events
            })
        }
    });
});

router.get('/newest', (req, res, next) => {
    Event.getThreeNewestEvent((err, events) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get three newest events', error: err})
        } else {
            res.json({
                events: events
            })
        }
    })
});

router.get('/events/sort-asc', (req, res, next) => {
    Event.sortEventsAscending((err, events) => {
        if (err) {
            res.json({success: false, msg: 'Failed to sort ascending', error: err})
        } else {
            res.json({
                events: events
            })
        }
    })
});

router.get('/events/sort-desc', (req, res, next) => {
    Event.sortEventsDescending((err, events) => {
        if (err) {
            res.json({success: false, msg: 'Failed to sort descending', error: err})
        } else {
            res.json({
                events: events
            })
        }
    })
});

router.get('/events/filter/owner/:filter', (req, res, next) => {
    Event.filterByOwnerUsername(req.params.filter, (err, events) => {
        if (err) {
            res.json({success: false, msg: 'Failed to filter by owner username', error: err})
        } else {
            res.json({
                events: events
            })
        }
    })
});

router.get('/events/filter/eventName/:filter', (req, res, next) => {
    Event.filterByEventName(req.params.filter, (err, events) => {
        if (err) {
            res.json({success: false, msg: 'Failed to filter by owner event name', error: err})
        } else {
            res.json({
                events: events
            })
        }
    })
});

router.get('/events/filter/eventDescription/:filter', (req, res, next) => {
    Event.filterByEventDescription(req.params.filter, (err, events) => {
        if (err) {
            res.json({success: false, msg: 'Failed to filter by owner event description', error: err})
        } else {
            res.json({
                events: events
            })
        }
    })
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
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to add new address.'
            })
        } else {
            res.json({
                success: true,
                msg: 'New address added.',
                addressId: address._id
            })
        }
    });
});

router.get('/address/:_id/info', (req, res) => {
    Address.getAddressById(req.params._id, (err, address) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to get this address',
                error: err
            })
        } else if (!address) {
            res.status(400).send('Address not found')
        } else {
            res.json({
                success: true,
                address: address
            })
        }
    })
});

router.put('/address/:_id/update', (req, res, next) => {
    Address.updateAddress(req.params._id, req.body, (err, event) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update address', error: err})
        } else {
            res.json({
                success: true,
                msg: 'Address updated',
            });
        }
    })
});

// Shops
router.post('/newShop', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newShop = new Shop({
        name: req.body.name,
        shopAddress: req.body.shopAddress,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        rating: req.body.rating,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        description: req.body.description,
        owner: req.user,
        enabled: req.body.enabled
    });

    Shop.addShop(newShop, (err, shop) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to add new shop.'
            });
        } else {
            res.json({
                success: true,
                msg: 'Shop Added.'
            })
        }
    })
});

router.get('/shops', (req, res) => {
    Shop.getAllShops((err, shops) => {
        if (err) {
            res.json({
                success: false,
                msh: 'No shop to get',
                error: err
            })
        } else {
            res.json({
                success: true,
                shops: shops
            })
        }
    })
});

router.put('/shops/:_id/update', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    console.log(req.body)
    Shop.updateShopInfo(req.params._id, req.body, (err, event) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update shop', error: err})
        } else {
            res.json({
                success: true,
                msg: 'Shop updated',
            });
        }
    })
});

router.delete('/shops/:_id/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Shop.deleteShop(req.params._id, (err, shop) => {
        if (err) {
            res.json({success: false, msg: 'Failed to delete shop', error: err})
        } else if (!shop) {
            res.status(400).send('Shop not found')
        }
        res.json({success: true, msg: 'Shop deleted'})
    });
});

module.exports = router;
