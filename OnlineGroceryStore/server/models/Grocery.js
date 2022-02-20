const MONGOOSE = require('mongoose');

const STRING = MONGOOSE.Schema.Types.String;
const DATE = MONGOOSE.Schema.Types.Date;
const NUMBER = MONGOOSE.Schema.Types.Number;
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const GROCERY_SCHEMA = MONGOOSE.Schema({
    name : { type: STRING, required: true },
    brand : { type: STRING, required: true },
    category: { type: STRING, required: true },
    mfgyear: { type: NUMBER, required: true },
    description: { type: STRING, required: true },
    cover: { type: STRING, required: true },
    productid: { type: STRING, required: true },
    quantity : { type: NUMBER, required: true },
    price: { type: NUMBER, required: true },
    creationDate: { type: DATE, default: Date.now },
    currentRating: { type: NUMBER, default: 0 },
    ratingPoints: { type: NUMBER, default: 0 },
    ratedCount: { type: NUMBER, default: 0 },
    ratedBy: [{ type: OBJECT_ID, ref: 'User' }],
    purchasesCount: { type: NUMBER, default: 0 },
    comments: [{ type: OBJECT_ID, ref: 'Comment' }]
});

GROCERY_SCHEMA.index({
    name: 'text',
    brand: 'text',
    category: 'text',
    productid: 'text'
});

const GROCERY = MONGOOSE.model('Grocery', GROCERY_SCHEMA);

module.exports = GROCERY;