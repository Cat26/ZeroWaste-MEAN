const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const config = require('../config/database');


// events

router.get('/events', (req, res, next) => {
    Event.getAllEvents()
});