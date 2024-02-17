const express = require('express');
const validate = require('../../middlewares/validate');
const refferalValidation = require('../../validations/referral.validation');
const authController = require('../../controllers/auth.controller');
const referralController = require('../../controllers/referral.controller')

const router = express.Router();

router.get('/refer' , (req,res) =>{
    res.send('Referal Routes');
})

router.post('/referred/:userId' , validate(refferalValidation.referral), referralController.getUser);

module.exports = router;