const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const growthValidation = require('../../validations/growth.validation');
const growthController = require('../../controllers/growth.controller');

const router = express.Router();

router
    .route('/:babyId')
    .post(auth('manageUsers'),validate(growthValidation.createGrowth),growthController.createGrowth);
    
router
    .route('/:babyId/growth')
    .patch(auth('manageUsers'),validate(growthValidation.createGrowth),growthController.createGrowth);

router
    .route('/:babyId/growth/:growthId')
    .get(auth('getUsers'),validate(growthValidation.getGrowth),growthController.getGrowth)
    .patch(auth('getUsers'),validate(growthValidation.updateGrowth),growthController.updateGrowth)
    .delete(auth('getUsers'),validate(growthValidation.deleteGrowth),growthController.deleteGrowth)
    
router
    .route('/:babyId/growths')
    .get(auth('getUsers'),validate(growthValidation.getGrowths),growthController.getGrowths)


module.exports = router