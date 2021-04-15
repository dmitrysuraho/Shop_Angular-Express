const express = require('express');
const brandsController = require('../controllers/brands.controller');
const router = express.Router();

router.get('/', brandsController.getBrands);

module.exports = router;
