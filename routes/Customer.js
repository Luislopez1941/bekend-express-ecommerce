'use strict';

let express = require('express');
let CustomerController = require('../controllers/ControllersCustomer');

let api = express.Router();
let auth =  require('../middlewares/authenticate')

api.post('/customer_registration', CustomerController.customer_registration);
api.post('/customer_login', CustomerController.customer_login);
api.get('/list_customers/:section/:type/:filter?', auth.auth, CustomerController.list_customers);
api.post('/administrator_customer_registration', auth.auth, CustomerController.administrator_customer_registration)

module.exports = api;
