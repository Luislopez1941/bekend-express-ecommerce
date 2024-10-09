'use strict';

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'Luis';

exports.auth = function(req, res, next) {
    if (!req.headers.authorization) {
        console.log('NoHeadersError: Authorization header is missing');
        return res.status(403).send({status: 'error', message: 'Falta el encabezado de autorización' });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');
    let segments = token.split('.');

    if (segments.length !== 3) {
        return res.status(403).send({ message: 'InvalidToken' });
    } else {
        try {
            let payload = jwt.decode(token, secret);
        
            if (payload.exp <= moment().unix()) {
                console.log('Token expirado');
                return res.status(403).send({ message: 'Token expirado' });
            }
    
            req.user = payload;
            next();  // Asigna el payload a req.user
        } catch (error) {
            console.log('InvalidToken - decode error:', error);
            return res.status(403).send({ message: 'InvalidToken' });
        }
    }

   // Pasa al siguiente middleware o controlador
};
