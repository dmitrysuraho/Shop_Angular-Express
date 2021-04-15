const Categories = require('../models/categories.model');

module.exports.getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        if (categories.length) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({message: 'No categories'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getCategoriesByType = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            where: req.params
        });
        if (categories.length) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({message: 'No categories'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}