'use strict';

let express = require('express');
let Administrator = require('../controllers/ControllerAdministrator');

let api = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Administrator:
 *      type: object
 *      required: 
 *        - names
 *        - surnames
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated ID of the Administrator
 *        names: 
 *          type: string
 *          description: The names of the Administrator
 *        surnames: 
 *          type: string
 *          description: The surnames of the Administrator
 *        email: 
 *          type: string
 *          description: The email of the Administrator
 *        password:
 *          type: string
 *          description: The password of the Administrator
 *        profile:
 *          type: string
 *          description: The profile picture of the Administrator
 *        phone:
 *          type: string
 *          description: The phone number of the Administrator
 *        rol:
 *          type: string
 *          description: The role of the Administrator
 *        dni:
 *          type: string
 *          description: The ID number of the Administrator
 *      example:
 *        id: 1
 *        names: John
 *        surnames: Doe
 *        email: john.doe@example.com
 *        password: your_password
 */

/**
 * @swagger
 * tags: 
 *   - name: Administrators
 *     description: The Administrators managing API
 */

/**
 * @swagger
 * /api/routes/administrator_registration:
 *  post:
 *    summary: Register a new administrator
 *    tags: [Administrators]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Administrator'
 *    responses:
 *      200:
 *        description: Administrator registered successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *                data:
 *                  $ref: '#/components/schemas/Administrator'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Email already registered
 */

/**
 * @swagger
 * /api/administrator_login:
 *  post:
 *    summary: Login an administrator
 *    tags: [Administrators]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: Login successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *                data:
 *                  $ref: '#/components/schemas/Administrator'
 *                token:
 *                  type: string
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Email not registered
 */

// Rutas para administrar Administrators
api.post('/administrator_registration', Administrator.administrator_registration);
api.post('/administrator_login', Administrator.administrator_login);

module.exports = api;
