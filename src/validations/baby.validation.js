const Joi = require('joi');

const registerBaby = {
  params : Joi.object().keys({
    userId : Joi.string(),
  }),
    body: Joi.object().keys({
      name: Joi.string().required(),
      gender: Joi.string().required(),
      dob: Joi.date().required(),
      dueDate: Joi.date().required(),
    }),
};

// const registerBaby = {
//   body: Joi.object().keys({
//     name: Joi.string().required(),
//     gender: Joi.string().required(),
//     dob:Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']).required(),
//     dueDate: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']).required(),
//   }),
// };


const getBaby = {
  query: Joi.object().keys({
    babyId : Joi.string(),
  }),
};

const deleteBaby = {
  params: Joi.object().keys({
    babyId: Joi.string(),
  }),
};


const updateBaby = {
  params: Joi.object().keys({
    babyId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      gender: Joi.string(),
      name: Joi.string(),
      dob : Joi.date(),
      dueDate : Joi.date(),
    })
    .min(1),
};

module.exports = {
    registerBaby,
    getBaby,
    deleteBaby,
    updateBaby,
}