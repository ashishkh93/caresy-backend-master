const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const babyValidation = require('../../validations/baby.validation');
const babyController = require('../../controllers/baby.controller');

const router = express.Router();

router.post('/:userId/register-baby', validate(babyValidation.registerBaby), babyController.registerBaby);

router
  .route('/:userId/:babyId')
  .get(auth('getUsers'), validate(babyValidation.getBaby), babyController.getBaby)
  .patch(auth('getUsers'), validate(babyValidation.updateBaby), babyController.updateBaby)
  .delete(auth('getUsers'), validate(babyValidation.deleteBaby), babyController.deleteBaby);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Baby-details
 *   description: Register Baby
 */

/**
 * @swagger
 * path:
 *  /baby/register-baby:
 *    post:
 *      summary: Register a baby
 *      tags: [Baby]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - password
 *              properties:
 *                name:
 *                  type: string
 *                gender:
 *                  type: string
 *                dob:
 *                  type: date
 *                dueDate:
 *                  type: date
 *              example:
 *                name: fake name
 *                gender: Boy
 *                dob: 10-18-2001
 *                dueDate: 10-18-2001
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 */
