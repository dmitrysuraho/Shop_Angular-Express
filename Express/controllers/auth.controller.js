const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');
const Users = require('../models/users.model');
const Addresses = require('../models/addresses.model');
const Cards = require('../models/cards.model');
const keys  = require('../config/keys');

module.exports.login = async (req, res) => {
    try {
        const candidate = await Users.findOne({
            raw: true,
            where: {
                email: req.body.email
            }
        });
        if (candidate) {
            if (bcrypt.compareSync(req.body.password, candidate.password)) {
                const token = jwt.sign({
                    id: candidate.id,
                    email: candidate.email
                }, keys.jwt, {expiresIn: 300000 * 60});
                res.status(200).json({token: `Bearer ${token}`});
            } else {
                res.status(401).json({message: 'Invalid password'});
            }
        } else {
            res.status(404).json({message: 'User with this e-mail is not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.register = async (req, res) => {
    try {
        const candidate = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if (candidate) {
            res.status(409).json({message: 'User with this e-mail is already exists'});
        } else {
            sequelize.transaction({
                isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED})
                .then(async t => {
                    const user = await Users.create({
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        phone: req.body.phone
                    });
                    await Addresses.create({
                        userId: user.id
                    });
                    await Cards.create({
                        userId: user.id
                    });
                    res.status(201).json(user);
                })
                .catch(error => {
                    res.status(500).json({message: error.message});
                });
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}