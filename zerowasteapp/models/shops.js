const mongoose = require('mongoose');
const UserSchema = mongoose.model('User').schema;

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
        required: false
    },
    phoneNumber: {
        type: String,
        required: false,
        minlength: 7,
        maxlength: 12
    },
    rating: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    owner: UserSchema,
    description: {
        type: String,
        required: false,
        maxlength: 500
    },
    enabled: {
        type: Boolean,
        required: false
    }
    //TODO: Add shop logo
});

const Shop = module.exports = mongoose.model('Shop', ShopSchema);

module.exports.getAllShops = function (callback) {
    Shop.find(callback).select('-owner.password').sort('desc')
};

module.exports.getUserShops = function (userId, callback) {
    Shop.find({ 'owner._id': userId }, callback).select('-owner.password');
};

module.exports.addShop = function (newShop, callback) {
    newShop.save(callback);
};

module.exports.updateShopInfo = function (idShop, updateShopInfo, callback) {
    Shop.findByIdAndUpdate(idShop, updateShopInfo, callback);
};

module.exports.deleteShop = function (idShop, callback) {
    Shop.findByIdAndDelete(idShop, callback)
};