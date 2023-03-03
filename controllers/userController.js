const userManager = require('../managers/userManager');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const validateCreateUser = require('../validation/create_user');


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


exports.forgotPasswordController = function(req, res)
    {
        let email = req.body.email;
    
        userManager.forgotPassword(email)
        .then((result)=>{
            let response = success_function(result)
            res.status(result.status).send(response);
        }).catch((error)=>{
            let response = error_function(error)
            res.status(error.status).send(response);
        });
    }


    exports.resetPasswordController = function(req, res)
{
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    let old_password = req.body.old_password; //Random password or otp send through email if first user
    let new_password = req.body.new_password

    userManager.passwordReset(token, old_password, new_password)
    .then((result)=>{
        let response = success_function(result);
        res.status(result.status).send(response);
    }).catch((error)=>{
        let response = error_function(error)
        res.status(error.status).send(response);
    });
}


exports.resetForgettedPassword = function(req, res)
{
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
}


exports.fetchAllProfiles = function (req,res){

    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    let page = req.query.page;

    let limit = req.query.limit;

    userManager
      .fetchAllProfiles(token, page, limit)
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