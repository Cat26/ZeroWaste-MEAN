const mongoose = require('mongoose');
// const config = require('../config/database')

const AddressSchema = mongoose.Schema({
    street: {
        type: String,
        required: true,
        maxlength: 85,
        minlength: 3
    },
    buildingNumber: {
        type: Number,
        required: true
    },
    apartmentNumber: {
        type: Number,
        required: false
    },
    postCode: {
        type: String,
        required: true,
        maxlength: 6
    },
    cityName:   {
        type: String,
        required: true,
        maxlength: 35,
        minlength: 3
    }

    //TODO: Add GpsLocation in future. Map type will be the best option i think.

});

const Address = module.exports = mongoose.model('Address', AddressSchema);

module.exports.getAddressById = function (idAddress, callback) {
    Address.findById(idAddress, callback);
};

module.exports.addAddress = function (newAddress, callback) {
    newAddress.save(callback);
};

module.exports.deleteAddress = function (idAddress, callback) {
    Address.findByIdAndDelete(idAddress, callback);
};

module.exports.updateAddress = function (idAddress, updateAdress, callback) {
    Address.findByIdAndUpdate(idAddress, updateAdress, callback);
};