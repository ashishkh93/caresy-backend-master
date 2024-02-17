const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const transactionController = require('../../controllers/transaction.controller');
const transactionValidation = require('../../validations/transaction.validation');


const router = express.Router();

router
    .route('/deposit')
    .post(auth('getUsers'),validate(transactionValidation.createTransaction),transactionController.deposit);

router
    .route('/withdraw')
    .post(auth('getUsers'),validate(transactionValidation.createTransaction),transactionController.withdraw);
    
// router
    // .route('/transactions')

// router.post('/transactions', auth('user'), transactionController.getTransactions);

module.exports = router;