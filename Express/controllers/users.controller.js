const Users = require('../models/users.model');
const Addresses = require('../models/addresses.model');
const Cards = require('../models/cards.model');

module.exports.getPersonalData = async (req, res) => {
    try {
        const user = await Users.findByPk(
            req.userId,
            {
                attributes: ['firstName', 'lastName', 'phone']
            });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getAddress = async (req, res) => {
    try {
        const address = await Addresses.findOne(
            {
                where: {
                    userId: req.userId
                },
                attributes: ['country', 'city', 'zip', 'address']
            });
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getCard = async (req, res) => {
    try {
        const card = await Cards.findOne(
            {
                where: {
                    userId: req.userId
                },
                attributes: ['cardNumber', 'cardMonth', 'cardYear', 'cardCCV', 'cardName']
            });
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.putPersonalData = async (req, res) => {
    try {
        const result = await Users.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone
        },
            {
                where: {
                    id: req.userId
                }});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.putAddress = async (req, res) => {
    try {
        const result = await Addresses.update({
                country: req.body.country,
                city: req.body.city,
                zip: req.body.zip,
                address: req.body.address
            },
            {
                where: {
                    id: req.userId
                }});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.putCard = async (req, res) => {
    try {
        const result = await Cards.update({
                cardNumber: req.body.cardNumber,
                cardMonth: req.body.cardMonth,
                cardYear: req.body.cardYear,
                cardCCV: req.body.cardCCV,
                cardName: req.body.cardName
            },
            {
                where: {
                    id: req.userId
                }});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}