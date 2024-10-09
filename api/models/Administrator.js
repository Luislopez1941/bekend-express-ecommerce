'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const SchemaAdministrator = Schema({
    names: { type: String, required: true },
    surnames: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, default: 'profil.png', required: false },
    phone: { type: String, required: false },
    rol: { type: String, default: 'administrator', required: false },
    dni: { type: String, required: false },
});

module.exports = mongoose.model('Administrator ', SchemaAdministrator);