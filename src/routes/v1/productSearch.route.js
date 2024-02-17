
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const searchValidation = require('../../validations');
const productSearchController = require('../../controllers/productSearch.controller')


const router = express.Router();

router
    .route('')
    .post(auth('getUsers'), validate(searchValidation.searchProduct), productSearchController.searchProduct)

module.exports = router