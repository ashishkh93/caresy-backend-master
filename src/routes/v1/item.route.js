const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {itemController, recommendationController, upvoteController } = require('../../controllers');
const {recommendationValidation, itemValidation, upvoteValidation } = require('../../validations');

const router = express.Router();


router
    .route('/:itemId/addRecommendation')
    .post(auth('getUsers'), validate(recommendationValidation.createRecommendation), recommendationController.createRecommendation)

router
    .route('/:itemId/recommendations')
    .get(auth('getUsers'), validate(recommendationValidation.getRecommendations) ,recommendationController.getRecommendations)
    
router
    .route('/:itemId/:recommendationId/editRecommendation')
    .patch(auth('getUsers'), validate(recommendationValidation.updateRecommendation), recommendationController.updateRecommendation)

router
    .route('/:itemId/:recommendationId/deleteRecommendation')
    .delete(auth('getUsers'), validate(recommendationValidation.deleteRecommendation), recommendationController.deleteRecommendation)
    




router
    .route('/:itemId/:siteId/update-purchase-url')
    .patch(auth('getUsers'), validate(itemValidation.updateURL), itemController.updateURL)

router
    .route('/:itemId/:siteId/delete-purchase-url')
    .delete(auth('getUsers'), validate(itemValidation.deleteURL), itemController.deleteURL)

router
    .route('/:itemId/add-purchase-url')
    .post(auth('getUsers'), validate(itemValidation.createURL), itemController.createURL)

router
    .route('/:itemId/get-all-urls')
    .get(auth('getUsers'), validate(itemValidation.getURLS), itemController.getURLS)


router
    .route('/:itemId/updateItem')
    .patch(auth('getUsers'),validate(itemValidation.updateItem),itemController.updateItem)

router
    .route('/:itemId/deleteItem')
    .delete(auth('getUsers'),validate(itemValidation.deleteItem),itemController.deleteItem)

router
    .route('/:itemId/upvote')
    .post(auth('getUsers'), validate(upvoteValidation.upvote),  upvoteController.upvote)

router
    .route('/:itemId/downvote')
    .post(auth('getUsers'), validate(upvoteValidation.downvote),  upvoteController.downvote)
    
router
    .route('/list')
    .get(auth('getUsers'),validate(itemValidation.getItems),itemController.listItems)

router
    .route('/topitems')
    .get(auth('getUsers'), validate(itemValidation.getItems), itemController.topItems)

router
    .route('/recommended-items')
    .get(auth('getUsers'), validate(itemValidation.getItems), itemController.recommendedItems)

router
    .route('/addItem')
    .post(auth('getUsers'),validate(itemValidation.createItem),itemController.createItem)

router
    .route('/:itemId')
    .get(auth('getUsers'),validate(itemValidation.getItem), itemController.getItem)

module.exports = router 