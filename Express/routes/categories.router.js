const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const router = express.Router();

router.get('/', categoriesController.getCategories);
router.get('/:type', categoriesController.getCategoriesByType);

module.exports = router;