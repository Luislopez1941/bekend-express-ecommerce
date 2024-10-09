'use strict';

let Customer = require('../models/Customer');
let bcrypt = require('bcrypt')
let jwt = require('../helpers/jwt')

const customer_login = async function(req, res) {
    let data = req.body
    let customer_arr = []

    customer_arr =  await Customer.find({email: data.email})
    console.log('customer_arr', customer_arr)

    if(customer_arr.length >= 1) {
        let user = customer_arr[0]
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

const customer_registration = async function(req, res) {
    let data = req.body
    let customer_arr = []

    customer_arr = await Customer.find({email: data.email});

    if(customer_arr.length >= 1) {
        res.status(200).send({status: 'warning', message: 'El correo ya se encuantra registrado', data: undefined})
    } else {
        if(data.password) {
            let hash = await bcrypt.hash(data.password, 10);
            if(hash) {
                data.password = hash;
                let reg = await Customer.create(data);
                return res.status(200).send({status: 'success', message: 'creado exitosamente', data: reg});
            };
            
        } else {
            return res.status(200).send({status: 'warning', message: 'No hay una contraseña registrada'});
        }
    }
}

const list_customers = async function(req, res) {
    if(req.user) {
        if(req.user.rol == 'administrator') {
            let data = req.params
            if(data.type ==  null || data.type == 'null') {
                const section = data.section; // Página actual, por defecto es 1
                const limit = parseInt(req.query.limit) || 5;
            
                const startIndex = (section - 1) * limit; // Índice de inicio
                const total = await Customer.countDocuments();
        
                const customers = await Customer.find()
                .skip(startIndex)
                .limit(limit);
                res.status(200).send({data: customers,totalCustomers: total, currentPagination: section, totalSections: Math.ceil(total / limit)});
            } else {
                if(data.type == 'names') {
                    let reg = await Customer.find({names: new RegExp(data.filter, 'i')});
                    return res.status(200).send({data: reg})
                    
                } else if(data.type == 'email') {
                    let reg = await Customer.find({email: new RegExp(data.filter, 'i')});
                    return res.status(200).send({data: reg})
                }
            
            }   
        } else {
            console.log('Issues with the role')
            return res.status(500).send({message: 'NoAccess'})
        }
    } else {
        return res.status(500).send({message: 'NoAccess'})
    }
}

const administrator_customer_registration = async (req, res) => {
    if(req.user) {
        if(req.user.rol == 'administrator') {
            let data = req.body;
            let reg = await Customer.create(data);
            res.status(200).send({ status: 'success', message: 'Usuario creado exitosamente', data: reg });
        }
    }
}

module.exports = {
    customer_login,
    customer_registration,
    list_customers,
    administrator_customer_registration
};
