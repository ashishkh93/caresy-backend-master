const httpStatus = require('http-status');
const { Answer ,  Question  } = require('../models');
const ApiError = require('../utils/ApiError');

const postQuestion = async ( questionBody) =>{
    const question = await Question.create(questionBody);
    return question;
}

const postAnswer = async ( answerBody ) =>{
    quesId = answerBody.quesId ;
    const answer = await Answer.create(answerBody);
    await Question.findByIdAndUpdate(
        quesId , 
        {$push: { answers : answer._id }}
    );
    return answer;
}

const getAllQuestions = async ( userId ) =>{
    const questions = Question.find({});
    return questions;
}

const deleteQuestionByQuesId = async ( userId , quesId ) =>{
    let question = await Question.find({ _id : quesId });
    if(!question) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    const quesUserId = question[0].userId ;
    if( userId == quesUserId )
        {
            await Question.findByIdAndDelete(quesId); 
            await Answer.deleteMany({ quesId : quesId });
        }
    else
      throw new ApiError(httpStatus.NOT_FOUND, 'You are not allowed to delete this Partiular Question');
    
    return question;
}

const deleteAnswerByAnsId = async ( userId , answerId ) =>{
    let answer = await Answer.findById(answerId);
    if(!answer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
    }
    const ansUserId = answer.userId;
    if( userId == ansUserId )
        // await Answer.findByIdAndDelete(answerId); 
        {
            Question.findOneAndUpdate({answers :{ answerId}},
                {
                    $pull: {
                        answers: { answerId }
                    }
                }
               );
            await answer.remove();
        }
    else
      throw new ApiError(httpStatus.NOT_FOUND, 'You are not allowed to delete this Partiular Question');
    
    return answer;
}

const getQuestionWithAllAnswers = async ( quesId ) =>{
    const question = Question.find({ _id : quesId });
    if(!question){
      throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');     
    }
    return question;
}



module.exports = {
    postQuestion,
    getAllQuestions,
    deleteQuestionByQuesId,
    getQuestionWithAllAnswers,
    postAnswer,
    deleteAnswerByAnsId,
}
