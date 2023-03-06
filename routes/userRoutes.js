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

router.post('/createuser',setAccessControl('1'), userController.createUser);// Admin creates a new user and mail is sent to the user's mail address, then user has to enter the details in mail to firstTimeLogin api
router.put('/update_profile', userController.updateProfile);
router.delete('/delete_profile/:target_id', setAccessControl('1'), userController.deleteProfile);
// router.post("/upload_image", uploadImage.single("file"), uploadImageController.uploadFiles);
//Create api to reset password after login of users
router.post('/forgot-password', userController.forgotPasswordController);//For any users who can't login 
router.post('/reset_forgetted_password', userController.resetForgettedPassword);//After sending mail through forgot-password
router.post('/reset-password', userController.resetPasswordController);//For logged in users for just only to change the password

router.get('/fetch_all_profiles', userController.fetchAllProfiles );//Fetch all profiles (incomplete)
router.get('/fetch_single_profile', userController.fetchSingleProfile);//Fetch profile of a single user, usually used after login
router.get('/departments', setAccessControl('1'), userController.fetchAllDepartments);
router.get('/sections', setAccessControl('1'), userController.fetchAllSections);
router.get('/branches', setAccessControl('1'), userController.fetchAllBranches);
router.get('/fetch_all_roles', setAccessControl('1'), userController.fetchAllRoles);



module.exports = router;

