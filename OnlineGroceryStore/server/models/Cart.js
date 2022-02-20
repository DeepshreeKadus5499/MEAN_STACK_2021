const MONGOOSE = require('mongoose');

const NUMBER = MONGOOSE.Schema.Types.Number;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const CART_SCHEMA = MONGOOSE.Schema({
    user: { type: OBJECT_ID, ref: 'User' },
    groceries: [{ type: OBJECT_ID, ref: 'Grocery' }],
    totalPrice: { type: NUMBER, default: 0 }
});

const CART = MONGOOSE.model('Cart', CART_SCHEMA);

module.exports = CART;