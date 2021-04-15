const express = require('express');
const passport = require('passport');
const usersController = require('../controllers/users.controller');
const router = express.Router();

router.get('/personal', passport.authenticate('jwt', {session: false}), usersController.getPersonalData);
router.get('/address', passport.authenticate('jwt', {session: false}), usersController.getAddress);
router.get('/card', passport.authenticate('jwt', {session: false}), usersController.getCard);
router.put('/personal', passport.authenticate('jwt', {session: false}), usersController.putPersonalData);
router.put('/address', passport.authenticate('jwt', {session: false}), usersController.putAddress);
router.put('/card', passport.authenticate('jwt', {session: false}), usersController.putCard);

module.exports = router;