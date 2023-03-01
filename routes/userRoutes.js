const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const department = require('../db/models/department');
const section = require('../db/models/sections');
const accessControl = require('../utils/access-control').accessControl;

//only admin can
//create user
//delete user
//update user

const setAccessControl = (access_type) => {
    return (req, res, next) => {
        accessControl(access_type, req, res, next);
    }
};

router.post('/createuser',setAccessControl('1'), userController.createUser);
//Create api to reset password after login of users
router.post('/forgot-password', userController.forgotPasswordController);
router.post('/reset_forgetted_password', userController.resetForgettedPassword);//for any users who can't login
router.post('/reset-password', userController.resetPasswordController);//for logged in users for just only change the password



module.exports = router;

