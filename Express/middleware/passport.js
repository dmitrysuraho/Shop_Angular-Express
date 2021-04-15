const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const Users = require('../models/users.model');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = (req, res, passport) => {
    passport.use(new JwtStrategy(options, async (payload, done) => {
        try {
            const user = await Users.findByPk(payload.id, {
                raw: true,
                attributes: ['id', 'email']
            });
            if (user) {
                req.userId = payload.id;
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            console.log(error);
        }
    }));
}