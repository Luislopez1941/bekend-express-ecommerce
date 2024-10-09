'use strict';

let Administrator = require('../models/Administrator');
let bcrypt = require('bcrypt')
let jwt = require('../helpers/jwt')


const administrator_login = async function(req, res) {
    let data = req.body
    let administrator_arr = []

    administrator_arr =  await Administrator.find({email: data.email})

    if(administrator_arr.length >= 1) {
        let user = administrator_arr[0]
        const match = await bcrypt.compare(data.password, user.password);
        if (match) {
            // Contraseña correcta
            return res.status(200).send({ status: 'success', message: 'Inicio de sesión exitoso', data: user, token: jwt.createToken(user)});
        } else {
            // Contraseña incorrecta
            return res.status(200).send({ status: 'warning', message: 'La contraseña no coincide' });
        }
    } else {
        res.status(200).send({status: 'warning', message: 'El correo no esta registrado'})
    }
}

async function administrator_registration(req, res) {
    let data = req.body
    let administrator_arr = []

    administrator_arr = await Administrator.find({email: data.email});

    if(administrator_arr.length >= 1) {
        res.status(200).send({status: 'warning', message: 'El correo ya se encuantra registrado', data: undefined})
    } else {
        if(data.password) {
            let hash = await bcrypt.hash(data.password, 10);
            if(hash) {
                data.password = hash;
                let reg = await Administrator.create(data);
                res.status(200).send({status: 'success', message: 'creado exitosamente', data: reg});
            };
            
        } else {
            res.status(200).send({status: 'warning', message: 'No hay una contraseña registrada'});
        }
    }
}

module.exports = {
    administrator_registration,
    administrator_login
};
