const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const { formTypes } = require('../config/formtypes');

const formSchema = mongoose.Schema(
  {
    message: {
      type: String,
      index: true,
    },
    type: {
      type: String,
      enum: [formTypes.MESSAGE, formTypes.SIGNUP],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
formSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Form = mongoose.model('Form', formSchema);

module.exports = Form;
