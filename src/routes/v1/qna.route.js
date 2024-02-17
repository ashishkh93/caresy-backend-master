const {  qnaController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const { questionValidation } = require('../../validations');
const express = require('express');
const validate = require('../../middlewares/validate');


const router = express.Router();

// router.post('/:userId/register-baby' , validate(babyValidation.registerBaby) , babyController.registerBaby);


router
  .route('/:userId')
  .get( validate(questionValidation.getAllQuestion), qnaController.getAllQuestions)
  .post( validate(questionValidation.postQuestion) , qnaController.postQuestion )
  .delete(validate(questionValidation.deleteQuestion), qnaController.deleteQuestion);


router
    .route('/:userId/:quesId')
    .get( validate(questionValidation.getQuestion), qnaController.getQuestionWithAllAnswers)
    .post( validate(questionValidation.postAnswer) , qnaController.postAnswer )
    .delete(validate(questionValidation.deleteAnswer), qnaController.deleteAnswer);

module.exports = router;