const { date, string } = require('joi');
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { genderTypes } = require('../config/authtypes');


const babySchema = mongoose.Schema(
    {
      parentId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
      },
      gender: {
        type: String,
        enum: genderTypes,
      },
      dueDate:{
        type: Date,
      },
      dob: {
        type: Date,
      },
      avatar:{
          type: String,
      }
    },
    {
      timestamps: true,
    }
  );

// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);


const Baby = mongoose.model('Baby', babySchema);

module.exports = Baby;