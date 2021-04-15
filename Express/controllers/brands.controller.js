const Brands = require('../models/brands.model');

module.exports.getBrands = async (req, res) => {
    try {
        const brands = await Brands.findAll();
        if (brands.length) {
            res.status(200).json(brands);
        } else {
            res.status(404).json({message: 'No brands'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}