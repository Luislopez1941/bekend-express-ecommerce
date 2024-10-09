'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const SchemaCustomer = Schema({
    names: { type: String, required: true },
    surnames: { type: String, required: true },
    country: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, default: 'profil.png', required: false },
    phone: { type: String, required: false },
    gender: { type: String, required: false },
    birthdate: { type: String, required: false },
    dni: { type: String, required: false },
});

module.exports = mongoose.model('Customer', SchemaCustomer);