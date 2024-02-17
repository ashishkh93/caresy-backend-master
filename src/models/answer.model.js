const mongoose = require('mongoose');



const answerSchema = mongoose.Schema(
    {
      quesId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Question',
        required: true,
      },
      userId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
      answer: {
        type: String,
        required : true,
      },
    },
    {
      timestamps: true,
    }
  );

// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);


const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;