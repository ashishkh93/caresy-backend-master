const express = require('express');
const validate = require('../../middlewares/validate');
const { activityValidation } = require('../../validations');
const { activityController } = require('../../controllers');
const auth = require('../../middlewares/auth');


const router = express.Router();

// router.post('/:userId/register-baby' , validate(babyValidation.registerBaby) , babyController.registerBaby);


router
  .route('/:babyId')
  .post( validate(activityValidation.registerActivity) , activityController.registerActivity )
  .get( validate(activityValidation.getActivity), activityController.getActivity)
  .patch(auth('getUsers') , validate(activityValidation.updateActivity), activityController.updateActivity)
  .delete(auth('getUsers') , validate(activityValidation.deleteActivity), activityController.deleteActivity);


module.exports = router;