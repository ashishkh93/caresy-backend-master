const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const formValidation = require('../../validations/form.validation');
const formController = require('../../controllers/form.controller');
const Form = require('../../models/form.model');

const router = express.Router();

router
  .route('/fillform')
  .post(
    (req, res, next) => {
      console.log('Working File');
      next();
    },
    validate(formValidation.fillForm),
    formController.fillForm
  )
  .get(
    formController.displayDetails
  );

// const Free = () =>{
//   formModel.mapReduce() = ((schemas) =>{
//     console.log(schemas);
//   } , {})
// }

// Free();

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Forms
 *   description: Form management
 */

/**
 * @swagger
 * path:
 *  /forms/fillform:
 *    post:
 *      summary: Fill a Form
 *      description: Api for Submitting form on caresy.in.
 *      tags: [Forms]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - message
 *                - type
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                  format: email
 *                message:
 *                  type: string
 *                type:
 *                   type: string
 *                   enum: [signup, message]
 *              example:
 *                name: team caresy
 *                email: hello@caresy.in
 *                message: Test Message
 *                type: message
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Form'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all users
 *      description: Only admins can retrieve all users.
 *      tags: [Forms]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: User name
 *        - in: query
 *          name: role
 *          schema:
 *            type: string
 *          description: User role
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of users
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/User'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */
