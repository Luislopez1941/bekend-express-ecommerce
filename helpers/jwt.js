let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'Luis'

exports.createToken = function(user) {
    let payload = {
        sub: user._id,
        names: user.names,
        surnames: user.surnames,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    }

    return jwt.encode(payload, secret)
}

