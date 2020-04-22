const mongoose = require('mongoose');
const UserSchema = mongoose.model('User').schema;

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
        minlength: 10
    },
    eventImage: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },

    likesUserList: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
    dislikesUserList: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
    owner: UserSchema,
    participants: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
    eventLocation: {
        type: String,
        required: true,
    }

});

const Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.getAllEvents = function (callback) {
    Event.find(callback).select('-owner.password').sort({eventDate: 'desc'});
};

module.exports.addEvent = function (newEvent, callback) {
    newEvent.save(callback);
};

module.exports.updateEvent = function (idEvent, updatedEvent, callback) {
    Event.findByIdAndUpdate(idEvent, updatedEvent, callback);
};

module.exports.deleteEvent = function (idEvent, callback) {
    Event.findByIdAndRemove(idEvent, callback);
};

module.exports.getUserEvents = function (userId, callback) {
    Event.find({ 'owner._id': userId }, callback).select('-owner.password');
};

module.exports.getEventFilePathByEventId = function (idEvent, callback) {
    Event.findById(idEvent, 'eventImage', callback);
};

module.exports.getThreeNewestEvent = function (callback) {
    Event.find(callback).select('-owner.password').limit(3).sort({eventDate: 'desc'})
};

