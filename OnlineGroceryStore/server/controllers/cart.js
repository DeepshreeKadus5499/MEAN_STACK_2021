const CART = require('mongoose').model('Cart');
const GROCERY = require('mongoose').model('Grocery');
const RECEIPT = require('mongoose').model('Receipt');
const USER = require('mongoose').model('User');

module.exports = {
    getCartSize: (req, res) => {
        let userId = req.user.id;
        CART.findOne({ user: userId }).then((cart) => {
            res.status(200).json({
                message: '',
                data: cart.groceries.length
            });
        });
    },

    getCart: (req, res) => {
        let userId = req.user.id;

        CART.findOne({ user: userId })
            .populate('groceries')
            .then((cart) => {
                res.status(200).json({
                    message: '',
                    data: cart
                });
            });
    },

    addToCart: (req, res) => {
        let userId = req.user.id;
        let groceryId = req.params.groceryId;

        GROCERY.findById(groceryId).then((grocery) => {
            if (!grocery) {
                return res.status(400).json({
                    message: 'There is no grocery with the given id in our database.'
                });
            }

            CART.findOne({ user: userId }).then((cart) => {
                let groceryIds = [];

                for (let b of cart.groceries) {
                    groceryIds.push(b.toString());
                }

                if (groceryIds.indexOf(groceryId) !== -1) {
                    return res.status(400).json({
                        message: 'Grocery is already in your cart'
                    });
                }

                cart.groceries.push(groceryId);
                cart.totalPrice += grocery.price;
                cart.save();

                res.status(200).json({
                    message: 'Grocery added to cart!',
                    data: cart
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    removeFromCart: (req, res) => {
        let userId = req.user.id;
        let groceryId = req.params.groceryId;

        GROCERY.findById(groceryId).then((grocery) => {
            if (!grocery) {
                return res.status(400).json({
                    message: 'There is no grocery with the given id in our database.'
                });
            }

            CART.findOne({ user: userId }).then((cart) => {
                cart.groceries = cart.groceries
                    .map(b => b.toString())
                    .filter(b => b !== groceryId);
                cart.totalPrice -= grocery.price;
                cart.save();

                res.status(200).json({
                    message: 'Grocery removed from cart!',
                    data: cart
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    checkout: (req, res) => {
        let userId = req.user.id;
        let totalPrice = 0;
        let products = [];

        CART
            .findOne({ user: userId })
            .populate('groceries')
            .then((cart) => {
                for (let grocery of cart.groceries) {
                    totalPrice += grocery.price * req.body[grocery._id.toString()];
                    products.push({
                        id: grocery._id,
                        name: grocery.name,
                        brand: grocery.brand,
                        cover: grocery.cover,
                        price: grocery.price,
                        qty: req.body[grocery._id.toString()]
                    });
                }

                RECEIPT.create({
                    user: userId,
                    productsInfo: products,
                    totalPrice: totalPrice
                }).then((receipt) => {
                    USER.update({ _id: userId }, { $push: { receipts: receipt._id } }).then(() => {
                        cart.groceries = [];
                        cart.totalPrice = 0;
                        cart.save();
                        return res.status(200).json({
                            message: 'Thank you for your order! Groceries will be sent to you as soon as possible!',
                            data: receipt
                        });
                    });
                }).catch((err) => {
                    console.log(err);
                    return res.status(400).json({
                        message: 'Something went wrong, please try again.'
                    });
                });
            });
    }
};