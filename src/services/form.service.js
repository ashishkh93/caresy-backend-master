const httpStatus = require('http-status');
const { Form } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a form data
 * @param {Object} formBody
 * @returns {Promise<Form>}
 */
const fillForm = async (formBody) => {
  const form = await Form.create(formBody);
  return form;
};

const displayDetails = async () => {
  const details = await Form.find({});
  return details;
}

module.exports = {
  fillForm,
  displayDetails,
};
