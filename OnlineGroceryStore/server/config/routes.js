const USER_CONTROLLER = require('../controllers/user');
const GROCERY_CONTROLLER = require('../controllers/grocery');
const COMMENT_CONTROLLER = require('../controllers/comment');
const CART_CONTROLLER = require('../controllers/cart');
const ERROR_CONTROLLER = require('../controllers/error');
const AUTH = require('./auth');

module.exports = (APP) => {
    APP.post('/user/register', USER_CONTROLLER.register);
    APP.post('/user/login', USER_CONTROLLER.login);
    APP.get('/user/profile/:username', AUTH.isAuth, USER_CONTROLLER.getProfile);
    APP.get('/user/purchaseHistory', AUTH.isAuth, USER_CONTROLLER.getPurchaseHistory);
    APP.post('/user/changeAvatar', AUTH.isAuth, USER_CONTROLLER.changeAvatar);
    APP.post('/user/blockComments/:userId', AUTH.isInRole('Admin'), USER_CONTROLLER.blockComments);
    APP.post('/user/unlockComments/:userId', AUTH.isInRole('Admin'), USER_CONTROLLER.unblockComments);

    APP.get('/cart/getSize', AUTH.isAuth, CART_CONTROLLER.getCartSize);
    APP.get('/user/cart', AUTH.isAuth, CART_CONTROLLER.getCart);
    APP.post('/user/cart/add/:groceryId', AUTH.isAuth, CART_CONTROLLER.addToCart);
    APP.delete('/user/cart/delete/:groceryId', AUTH.isAuth, CART_CONTROLLER.removeFromCart);
    APP.post('/user/cart/checkout', AUTH.isAuth, CART_CONTROLLER.checkout);

    APP.get('/grocery/search', GROCERY_CONTROLLER.search);
    APP.get('/grocery/details/:groceryId', GROCERY_CONTROLLER.getSingle);
    APP.post('/grocery/add', AUTH.isInRole('Admin'), GROCERY_CONTROLLER.add);
    APP.put('/grocery/edit/:groceryId', AUTH.isInRole('Admin'), GROCERY_CONTROLLER.edit);
    APP.delete('/grocery/delete/:groceryId', AUTH.isInRole('Admin'), GROCERY_CONTROLLER.delete);
    APP.post('/grocery/rate/:groceryId', AUTH.isAuth, GROCERY_CONTROLLER.rate);
    APP.post('/grocery/addToFavorites/:groceryId', AUTH.isAuth, GROCERY_CONTROLLER.addToFavorites);

    APP.get('/comment/getLatestFiveByUser/:userId', AUTH.isAuth, COMMENT_CONTROLLER.getLatestFiveByUser);
    APP.get('/comment/:groceryId/:skipCount', COMMENT_CONTROLLER.getComments);
    APP.post('/comment/add/:groceryId', AUTH.isAuth, COMMENT_CONTROLLER.add);
    APP.put('/comment/edit/:commentId', AUTH.isAuth, COMMENT_CONTROLLER.edit);
    APP.delete('/comment/delete/:commentId', AUTH.isAuth, COMMENT_CONTROLLER.delete);

    APP.all('*', ERROR_CONTROLLER.error);
};