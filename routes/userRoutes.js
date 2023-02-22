const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
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
router.post('/logout', userController.forgotPasswordController);



module.exports = router;

