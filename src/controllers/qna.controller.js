const httpStatus = require('http-status');
const Activity = require('../models/activity.model');
const catchAsync = require('../utils/catchAsync');
const { qnaServices } = require('../services');


const postQuestion = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const { questionAsked , ...otherParams } =  req.body;
    const questionBody = {
        userId,
        questionAsked,
        ...otherParams,
    }
    const question = await qnaServices.postQuestion( questionBody ) ;
    res.status(httpStatus.CREATED).send({ question });
});

const postAnswer = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const quesId = req.params.quesId;
    const { actualAnswer , ...otherParams } =  req.body;
    const answerBody = {
        userId,
        quesId,
        actualAnswer,
        ...otherParams,
    }
    const answer = await qnaServices.postAnswer( answerBody ) ;
    res.status(httpStatus.CREATED).send({ answer });
});

const getAllQuestions = catchAsync(async (req, res) => {
    const userId = req.params.userId;

    const questions = await qnaServices.getAllQuestions(userId);
    res.status(httpStatus.CREATED).send({ questions });
});

const deleteQuestion = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const { quesId } = req.body ;
    const questions = await qnaServices.deleteQuestionByQuesId( userId , quesId);
    res.status(httpStatus.CREATED).send({ questions });
});

const deleteAnswer = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    const {answerId} = req.body ;
    const answer = await qnaServices.deleteAnswerByAnsId( userId , answerId);
    res.status(httpStatus.CREATED).send({ answer });
});

const getQuestionWithAllAnswers = catchAsync(async (req, res) => {
    const quesId = req.params.quesId;

    const question = await qnaServices.getQuestionWithAllAnswers(quesId);
    const answers = question.answers ;
    res.status(httpStatus.CREATED).send( {question  , answers} );
});

module.exports = {
    postQuestion,
    getAllQuestions,
    getQuestionWithAllAnswers,
    deleteQuestion,
    postAnswer,
    deleteAnswer,
}