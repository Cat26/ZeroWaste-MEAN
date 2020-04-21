const mongoose = require('mongoose');
const UserSchema = mongoose.model('User').schema;
const AddressSchema = require('../models/address').AddressSchema;

const ShopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3
    },
    shopAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 12
    },
    rating: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    idUser: UserSchema,
    enabled: {
        type: Boolean,
        required: true
    }
    //TODO: Add shop logo
});

const Shop = module.exports = mongoose.model('Shop', ShopSchema);

module.exports.addShop = function (newShop, callback) {
    newShop.save(callback);
};

module.exports.udateShopInfo = function (idShop, updateShopInfo, callback) {
    Shop.findByIdAndUpdate(idShop, updateShopInfo, callback);
}

module.exports.deleteShop = function (idShop, callback) {
    Shop.findByIdAndDelete(idShop, callback)
}