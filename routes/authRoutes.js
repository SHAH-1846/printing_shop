const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');




router.post('/login', authController.login); //Returns access token
router.post('/logout', authController.logout);

module.exports = router;
