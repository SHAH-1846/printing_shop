const { response } = require('express');
const userManager = require('../managers/userManager');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const validateCreateUser = require('../validation/create_user');
const validateForgotPassword = require('../validation/forgot_password');
const validateResetForgottedPassword = require('../validation/reset_forgetted_password');
const validateResetPassword = require('../validation/reset_password');
const validateUpdateProfile = require('../validation/updateProfile');


exports.createUser = function(req, res)
{

  const {errors, isValid}=  validateCreateUser(req.body);
  console.log("Errors from controller : ", errors);
  console.log("isValid from controller : ", isValid);


  // if(!isValid){
  //   return res.status(400).json(errors);
  // }

  if(isValid){


    
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let image = req.body.image;
        let phone = req.body.phone;
        let role = req.body.role;
        let department = req.body.department;
        let section = req.body.section;
        let branch = req.body.branch;
        let new_user = req.body.new_user;
        
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
    
    
    
        userManager.createUser(first_name, last_name, email, image, phone, role,department, section, branch)
        .then((result)=>{
            let response = success_function(result);
            res.status(result.status).send(response);
        }).catch((error)=>{
            let response = error_function(error);
            res.status(error.status).send(response);
        });
  }
  else{
    res.status(400).send({"status" : 400,"errors" : errors, "message" : "Validation failed"});
  }
}


exports.updateProfile = function (req,res) {
  
  const {errors, isValid} = validateUpdateProfile(req.body);

  if(isValid){
    console.log("Valid information");
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let image = req.body.image;
    let phone = req.body.phone;

    let authHeader = req.headers['authorization'];
  let token = authHeader.split(' ')[1];

    userManager
      .updateProfile(first_name, last_name, image, phone, token)
      .then((result) => {
        let response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        let response = error_function(error);
        res.status(error.status).send(response);
      });


  }else {
    res.status(400).send({"status" : 400, "errors" : errors, "message" : "Validation Failed"});
  }
}


exports.deleteProfile = function (req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  let targetId = req.params.target_id;

  userManager.deleteProfile(token, targetId)
    .then((result)=> {
        const response = success_function(result);
        res.status(result.status).send(response);
    })
    .catch((error)=> {
      const response = error_function(error);
      res.status(error.status).send(response);
    })
}

exports.forgotPasswordController = function(req, res)
    {
      
      //Enter email and user recieves en email with a link to reset the forgotted password, the link also contains a jwt token which also must be passed to the backend through reset_forgotted_password controller

      let {errors, isValid} = validateForgotPassword(req.body);
        let email = req.body.email;
    
        if(isValid){

          userManager.forgotPassword(email)
          .then((result)=>{
              let response = success_function(result)
              res.status(result.status).send(response);
          }).catch((error)=>{
              let response = error_function(error)
              res.status(error.status).send(response);
          });

        }else{
          res.status(200).send({"status" : 200, "errors" : errors, "message" : "Validation failed"});
        }
    }


    exports.resetPasswordController = function(req, res)
{
  //For login users just to reset the password

  const {errors, isValid} = validateResetPassword(req.body);

  if(isValid){

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
  
    let old_password = req.body.old_password; //Random password or otp send through email if first user
    let new_password = req.body.new_password
  
    userManager.passwordReset(token, old_password, new_password)
    .then((result)=>{
        let response = success_function(result);
        res.status(result.status).send(response);
    }).catch((error)=>{
        let response = error_function(error);
        res.status(error.status).send(response);
    });

  }else{

    res.status(400).send({"status" : 400, "errors" : errors, "message" : "Validation Failed"});
  }

}


exports.resetForgettedPassword = function(req, res)
{

  //Works after forgot_password controller, requires token and new password through the link send through email to the user

  const {errors, isValid} = validateResetForgottedPassword(req.body);

  if(isValid){

    let token = req.body.token;
    let new_password = req.body.new_password;

    userManager.resetForgettedPassword(token, new_password)
    .then((result)=>{
        let response = success_function(result);
        res.status(result.status).send(response);
    }).catch((error)=>{
        let response = error_function(error);
        res.status(error.status).send(response);
    });

  }else {
    res.status(400).send({"status" : 400, "errors" : errors, "message" : "Validation failed"});
  }
}


exports.fetchAllProfiles = function (req,res){

  console.log("Fetch all controller reached..");

    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    let page = req.query.page;

    let limit = req.query.limit;

    userManager
      .fetchAllProfiles(token)
      .then((result) => {
        let response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        let response = error_function(error);
        res.status(error.status).send(response);
      });


}


exports.fetchSingleProfile = function (req,res){

    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    userManager
      .fetchSingleProfile(token)
      .then((result) => {
        let response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        let response = error_function(error);
        res.status(error.status).send(response);
      });


}

exports.fetchAllDepartments = function (req,res){

    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    userManager
      .fetchAllDepartments(token)
      .then((result) => {
        let response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        let response = error_function(error);
        res.status(error.status).send(response);
      });


}


exports.fetchAllSections = function (req,res){

    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    userManager
      .fetchAllSections(token)
      .then((result) => {
        let response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        let response = error_function(error);
        res.status(error.status).send(response);
      });


}


exports.fetchAllBranches = function (req,res){

    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    userManager
      .fetchAllBranches(token)
      .then((result) => {
        let response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        let response = error_function(error);
        res.status(error.status).send(response);
      });


}


exports.fetchAllRoles = function (req, res) {

  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  userManager.fetchAllRoles(token)
    .then((result)=> {
      const response = success_function(result);
      res.status(result.status).send(response);
    })
    .catch((error) =>{
      const response = error_function(error);
      res.status(error.status).send(response);
    })

}
