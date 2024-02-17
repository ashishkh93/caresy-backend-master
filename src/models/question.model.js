const mongoose = require('mongoose');


const questionSchema = mongoose.Schema(
    {
      userId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      questionId : {
        type : String,
      },
      answers : [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Answer',
        }],
    },
    {
      timestamps: true,
    }
  );

// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);


const Question = mongoose.model('Question', questionSchema);

module.exports = Question;