const VALIDATOR = require('validator');
const GROCERY = require('mongoose').model('Grocery');
const USER = require('mongoose').model('User');

const PAGE_LIMIT = 15;

function validateGroceryForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide name.';
    }

    if (!payload || typeof payload.brand !== 'string' || payload.brand.trim().length === 0) {
        isFormValid = false;
        errors.brand = 'Please provide brand.';
    }

    if (!payload || typeof payload.category !== 'string' || payload.category.trim().length === 0) {
        isFormValid = false;
        errors.category = 'Please provide category.';
    }

    if (!payload || isNaN(Number(payload.mfgyear))) {
        isFormValid = false;
        errors.year = 'Please provide grocery mfg year.';
    }

    if (!payload || typeof payload.description !== 'string' || payload.description.trim().length < 10) {
        isFormValid = false;
        errors.description = 'Description must be at least 10 symbols long.';
    }

    if (!payload || !payload.cover || !VALIDATOR.isURL(payload.cover)) {
        isFormValid = false;
        errors.cover = 'Please provide proper url for the grocery\'s cover';
    }

    if (!payload || !payload.productid || !VALIDATOR.isISBN(payload.productid)) {
        isFormValid = false;
        errors.productid = 'Please provide a valid productid.';
    }

    if (!payload || isNaN(Number(payload.quantity)) || payload.quantity === '') {
        isFormValid = false;
        errors.quantity = 'Please provide number of pages.';
    }

    if (!payload || isNaN(Number(payload.price)) || Number(payload.price) < 0 || payload.pagesCount === '') {
        isFormValid = false;
        errors.price = 'Please provide grocery price.';
    }

    return {
        success: isFormValid,
        errors
    };
}

function validateRatingForm(payload) {
    let errors = {};
    let isFormValid = true;

    if (
        !payload
        || isNaN(Number(payload.rating))
        || !VALIDATOR.isInt(payload.rating.toString())
        || Number(payload.rating) < 1
        || Number(payload.rating) > 5
    ) {
        isFormValid = false;
        errors.price = 'Rating must be a integer number between 1 and 5.';
    }

    return {
        success: isFormValid,
        errors
    };
}

module.exports = {
    getSingle: (req, res) => {
        let groceryId = req.params.groceryId;

        GROCERY.findById(groceryId)
            .then((grocery) => {
                if (!grocery) {
                    return res.status(400).json({
                        message: 'There is no grocery with the given id in our database.'
                    });
                }

                return res.status(200).json({
                    message: '',
                    data: grocery
                });
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({
                    message: 'Something went wrong, please try again.'
                });
            });
    },

    add: (req, res) => {
        let grocery = req.body;

        let validationResult = validateGroceryForm(grocery);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Grocery form validation failed!',
                errors: validationResult.errors
            });
        }

        GROCERY.create(grocery).then((newGrocery) => {
            return res.status(200).json({
                message: 'Grocery created successfully!',
                data: newGrocery
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    edit: (req, res) => {
        let groceryId = req.params.groceryId;
        let editedGrocery = req.body;

        let validationResult = validateGroceryForm(editedGrocery);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Grocery form validation failed!',
                errors: validationResult.errors
            });
        }

        GROCERY.findById(groceryId).then((grocery) => {
            if (!grocery) {
                return res.status(400).json({
                    message: 'There is no grocery with the given id in our database.'
                });
            }

            grocery.name = editedGrocery.name;
            grocery.brand = editedGrocery.brand;
            grocery.category = editedGrocery.category;
            grocery.mfgyear = editedGrocery.mfgyear;
            grocery.description = editedGrocery.description;
            grocery.cover = editedGrocery.cover;
            grocery.productid = editedGrocery.productid;
            grocery.quantity = editedGrocery.quantity;
            grocery.price = editedGrocery.price;
            grocery.save();

            return res.status(200).json({
                message: 'Grocery edited successfully!',
                data: grocery
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    delete: (req, res) => {
        let groceryId = req.params.groceryId;

        GROCERY.findByIdAndRemove(groceryId).then((deletedGrocery) => {
            if (!deletedGrocery) {
                return res.status(400).json({
                    message: 'There is no grocery with the given id in our database.'
                });
            }

            return res.status(200).json({
                message: 'Grocery deleted successfully.',
                data: deletedGrocery
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    rate: (req, res) => {
        let groceryId = req.params.groceryId;
        let rating = req.body.rating;
        let userId = req.user.id;

        let validationResult = validateRatingForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: 'Rating form validation failed!',
                errors: validationResult.errors
            });
        }

        GROCERY.findById(groceryId).then((grocery) => {
            if (!grocery) {
                return res.status(400).json({
                    message: 'There is no grocery with the given id in our database.'
                });
            }

            let ratedByIds = grocery.ratedBy.map((id) => id.toString());
            if (ratedByIds.indexOf(userId) !== -1) {
                return res.status(400).json({
                    message: 'You already rated this grocery'
                });
            }

            grocery.ratedBy.push(userId);
            grocery.ratingPoints += rating;
            grocery.currentRating = grocery.ratingPoints / grocery.ratedCount;
            grocery.save();

            return res.status(200).json({
                message: 'You rated the grocery successfully.',
                data: grocery
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    addToFavorites: (req, res) => {
        let groceryId = req.params.groceryId;

        GROCERY.findById(groceryId).then((grocery) => {
            if (!grocery) {
                return res.status(400).json({
                    message: 'There is no grocery with the given id in our database.'
                });
            }

            USER.findById(req.user.id).then((user) => {

                let groceriesIds = user.favoriteGroceries.map((b) => b.toString());
                if (groceriesIds.indexOf(groceryId) !== -1) {
                    return res.status(400).json({
                        message: 'You already have this grocery in your favorites list'
                    });
                }

                user.favoriteGroceries.push(grocery._id);
                user.save();

                return res.status(200).json({
                    message: 'Successfully added the grocery to your favorites list.'
                });
            });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: 'Something went wrong, please try again.'
            });
        });
    },

    search: (req, res) => {
        let params = req.query;
        let searchParams = {
            query: {},
            sort: { creationDate: -1 },
            skip: null,
            limit: PAGE_LIMIT,
        };

        if (params.query || typeof params.query === 'string') {
            let query = JSON.parse(params.query);
            searchParams.query = { $text: { $search: query['searchTerm'], $language: 'en' } };
        }

        if (params.sort) {
            searchParams.sort = JSON.parse(params.sort);
        }

        if (params.skip) {
            searchParams.skip = JSON.parse(params.skip);
        }

        if (params.limit) {
            searchParams.limit = JSON.parse(params.limit);
        }

        GROCERY
            .find(searchParams.query)
            .count()
            .then((count) => {
                GROCERY
                    .find(searchParams.query)
                    .sort(searchParams.sort)
                    .skip(searchParams.skip)
                    .limit(searchParams.limit)
                    .then((result) => {
                        return res.status(200).json({
                            message: '',
                            data: result,
                            query: searchParams,
                            itemsCount: count
                        });
                    })
                    .catch(() => {
                        return res.status(400).json({
                            message: 'Bad Request!'
                        });
                    });
            });
    }
};