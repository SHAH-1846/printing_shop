const userModel = require("../db/models/users");
const userRoles = require("../db/models/user_roles");
const userRoleConnector = require("../db/models/user_roles_connection");
const email_transporter = require("../utils/email_transporter").sendEmail;
const set_password_template =
  require("../utils/email-templates/set_password").resetPassword;
const forgot_password_template =
  require("../utils/email-templates/forgot-password").forgotPassword;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const departmentModel = require("../db/models/departments");
const sectionModel = require("../db/models/sections");
const branchModel = require("../db/models/branches");
const fileUpload = require('../utils/file_upload').fileUpload;
// const branches = require("../db/models/branches");

exports.createUser = async function (
  //Create another login for first time login
  first_name,
  last_name,
  email,
  image,
  phone,
  role,
  department,
  section,
  branch
) {
  return new Promise(async (resolve, reject) => {
    try {
      //checking if requested user is admin or not

      //checking if user exist
      if (
        first_name &&
        last_name &&
        department &&
        section &&
        branch &&
        email &&
        phone &&
        role
      ) {
        let user = await userModel.findOne({ where: { email: email } });
        // decoded = jwt.decode(token);
        // const user_id = decoded.user_id;
        // user_role_id = userRoleConnector.findAll({ where: { user_id: user_id } });

        if (user) {
          //user exist
          reject({ status: 403, message: "User Already Exist" });
        } else {
          let salt = bcrypt.genSaltSync(10);

          // Generating a random one time password for first time login
          let chars =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDE#F$G@H*I&JKLMNOPQRSTUVWXYZ";
          let otp = "";
          for (let i = 0; i <= 7; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            otp += chars.substring(randomNumber, randomNumber + 1);
          }

          let oneTimePassword = bcrypt.hashSync(otp, salt);
          let password = bcrypt.hashSync(otp + 10101011011, salt);

          //Getting corresponding department id
          let department_value = await departmentModel.findOne({
            attributes: ["id"],
            raw: true,
            where: { department: department },
          });
          let department_id = department_value.id;
          console.log("Department Id : ", department_id);

          //Getting corresponding section id
          let section_value = await sectionModel.findOne({
            attributes: ["id"],
            raw: true,
            where: { section: section },
          });
          let section_id = section_value.id;
          console.log("Section Id : ", section_id);

          //Getting corresponding branch id
          let branch_value = await branchModel.findOne({
            attributes: ["id"],
            raw: true,
            where: { branch: branch },
          });
          let branch_id = branch_value.id;
          console.log("Branch Id : ", branch_id);



          //Initializing user datas
          let new_user = {
            first_name: first_name,
            last_name: last_name,
            image: image,
            email: email,
            phone: phone,
            department_id: department_id,
            section_id: section_id,
            branch_id: branch_id,
            password: password,
            otp: oneTimePassword,
            otp_status: "active",
            new_user: "true",
          };

          //Checking for image
          if(image) {
            image = await fileUpload(image, "users");

            if(image){

              new_user["image"] = image;
            }else {
              console.log("Unable to save image");
            }
          } else {
            new_user["image"] = null;
          }

          //saving
          await userModel.findOrCreate({
            where: { email: email },
            defaults: new_user,
          });

          //Sending email and password
          let email_template = await set_password_template(
            first_name,
            email,
            otp
          );
          // console.log(email_template);
          await email_transporter(email, "Update Password", email_template);
          resolve({
            status: 200,
            message: "Login details send to the email address",
          });

        }
      } else {
        if (!first_name)
          reject({ status: 422, message: "First Name is required" });
        if (!last_name)
          reject({ status: 422, message: "Last Name is required" });
        if (!phone) reject({ status: 422, message: "Phone is required" });
        if (!role) reject({ status: 422, message: "Role is required" });
        if (!email) reject({ status: 422, message: "Email is required" });
        if (!password) reject({ status: 422, message: "Password is required" });
      }
    } catch (error) {
      reject({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });
    }
  });
};

exports.forgotPassword = async function (email) {
  return new Promise(async (resolve, reject) => {
    try {
      if (email) {
        let user = await userModel.findOne({ where: { email: email } });
        if (user) {
          let reset_token = jwt.sign(
            { user_id: user.id },
            process.env.PRIVATE_KEY,
            { expiresIn: "10m" }
          );

          console.log("Reset Token : ", reset_token);

          await user.set({
            forgot_password_token: reset_token,
          });

          let data = await user.save();

          // console.log("Data : ", data);

          if (data) {
            let reset_link = `${process.env.FRONTEND_URL}/reset-password?token=${reset_token}`;
            let email_template = await forgot_password_template(
              user.name,
              reset_link
            );
            email_transporter(email, "Forgot Password", email_template);
            resolve({ status: 200, message: "Email sent successfully" });
          } else reject({ status: 400, message: "Password reset failed" });
        } else {
          reject({ status: 403, message: "Forbidden" });
        }
      } else reject({ status: 422, message: "Email is required" });
    } catch (error) {
      reject({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });
    }
  });
};

//Reset Password
exports.passwordReset = async function (token, old_password, new_password) {
  return new Promise(async (resolve, reject) => {
    try {
      decoded = jwt.decode(token);
      console.log("User Id : ", decoded.user_id);
      const user_id = decoded.user_id;
      console.log("Decoded : ", decoded);
      let user = await userModel.findOne({
        where: { id: decoded.user_id },
      });

      console.log("User : ", user);

      if (user) {
        //Checking if the user is a new user or not
        //Setting the password value for corresponding users
        let new_user = user.new_user;
        var password;

        if (new_user === "true") {
          password = user.otp; //Password is otp if new user
          console.log("New user found");
        } else {
          password = user.password; //Password is password if old user
          console.log("Old user found");
        }

        bcrypt.compare(old_password, password, async (error, auth) => {
          if (auth === true) {
            let salt = bcrypt.genSaltSync(10);
            let password = bcrypt.hashSync(new_password, salt);

            //  let saveToken = await userModel.update({reset_password_token : token});

            //Updates users password field with new password and set new_user to false and now onwards this new user(if new user) can sccess the login route no need for the firsTime login route
            let updatePassword = await user.update({
              password: password,
              new_user: "false",
            });
            console.log("Updated Password : ", updatePassword);

            if (updatePassword) {
              resolve({
                status: 200,
                message: "Password changed successfully",
              });
            } else reject({ status: 400, message: "Password reset failed" });
          } else {
            reject({ status: 401, message: "Invalid credentials" });
          }
        });
      } else reject({ status: 403, message: "Forbidden" });
    } catch (error) {
      reject({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });
    }
  });
};

exports.resetForgettedPassword = async function (token, new_password) {
  return new Promise(async (resolve, reject) => {
    try {
      decoded = jwt.decode(token);
      console.log("Decoded : ", decoded);
      console.log("User Id : ", decoded.user_id);
      const user_id = decoded.user_id;
      console.log("Decoded : ", decoded);
      let user = await userModel.findOne({
        where: { id: decoded.user_id },
      });

      console.log("User : ", user);

      if (user) {
        //Checking if the user is a new user or not
        //Setting the password value for corresponding users
        // let new_user = user.new_user;

        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(new_password, salt);

        // if (new_user === "true") {
        
        //   await user.update({new_user : "false"});
        // }

        let updatePassword = await user.update({
          password: password,
          new_user: "false",
          otp_status : "used",
        });
        console.log("Updated Password : ", updatePassword);

        if (updatePassword) {
          resolve({
            status: 200,
            message: "Password changed successfully",
          });
        } else reject({ status: 400, message: "Password reset failed" });

      } else reject({ status: 403, message: "Forbidden" });
    } catch (error) {
      reject({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });
    }
  });
};

exports.fetchAllProfiles = async function (token, page, limit) {

  return new Promise(async (resolve, reject)=>{

    try {

      console.log("Token : ", token);
      
      const decoded = jwt.decode(token);
      const user = await userModel.findOne({where : {id : decoded.user_id}});
    
      if(user){
    
        let users = await userModel.findAll({
          attributes: ['first_name', 'last_name', 'email', 'image', 'phone', 'createdAt','updatedAt'] //incomplete need to implement a way to fetch department, section, and branch details from corresponding columns
        });
      
        console.log("All fetched Users : ", users);
        resolve({"status" : 200, "data" : users, "message" : "All users details fetched successfully"});
    
      }
    } catch (error) {

      reject({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });
      
    }


  })



}


exports.fetchSingleProfile = async function (token) {

  return new Promise(async (resolve, reject)=>{

    try {

      console.log("Token : ", token);
      
      const decoded = jwt.decode(token);
      const user = await userModel.findOne({where : {id : decoded.user_id}});
    
      if(user){

        let branchName = (await branchModel.findOne({where : {id : user.branch_id}})).getDataValue('branch');
        let sectionName = (await sectionModel.findOne({where : {id : user.section_id}})).getDataValue('section');
        let departmentName = (await departmentModel.findOne({where : {id : user.department_id}})).getDataValue('department');

        let profile = {
          firstName : user.first_name,
          lastName : user.last_name,
          email : user.email,
          image : user.image,
          phone : user.phone,
          department : departmentName,
          section : sectionName,
          branch : branchName,
        }
  
      
        console.log("Profile data : ", profile);
        resolve({"status" : 200, "data" : profile, "message" : "User details fetched successfully"});
    
      }else {

        reject({"status" : 404, "message" : "No profile found"});
      }
    } catch (error) {

      reject({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });
      
    }


  })



}



exports.fetchAllDepartments = async function (token) {

  return new Promise(async (resolve, reject)=>{

    try {

      console.log("Token : ", token);
      
      const decoded = jwt.decode(token);
      const user = await userModel.findOne({where : {id : decoded.user_id}});
    
      if(user){
    
        let departments = await departmentModel.findAll({attributes : ['department']});
      
        console.log("All fetched Users : ", departments);
        resolve({"status" : 200, "data" : departments, "message" : "Departments fetched successfully"});
    
      }else {
        reject({"status" : 401, "message" : "Not allowed to access the route"});
      }
    } catch (error) {

      reject({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });
      
    }


  })



}


exports.fetchAllSections = async function (token) {

  return new Promise(async (resolve, reject)=>{

    try {

      console.log("Token : ", token);
      
      const decoded = jwt.decode(token);
      const user = await userModel.findOne({where : {id : decoded.user_id}});
    
      if(user){
    
        let sections = await sectionModel.findAll({attributes : ['section']});
      
        console.log("All fetched Users : ", sections);
        resolve({"status" : 200, "data" : sections, "message" : "Sections fetched successfully"});
    
      }else {
        reject({"status" : 401, "message" : "Not allowed to access the route"});
      }
    } catch (error) {

      reject({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });
      
    }


  })



}



exports.fetchAllBranches = async function (token) {

  return new Promise(async (resolve, reject)=>{

    try {

      console.log("Token : ", token);
      
      const decoded = jwt.decode(token);
      const user = await userModel.findOne({where : {id : decoded.user_id}});
    
      if(user){
    
        let branches = await branchModel.findAll({attributes : ['branch']});
      
        console.log("All fetched Users : ", branches);
        resolve({"status" : 200, "data" : branches, "message" : "Branches fetched successfully"});
    
      }else {
        reject({"status" : 401, "message" : "Not allowed to access the route"});
      }
    } catch (error) {

      reject({
        status: 400,
        message: error
          ? error.message
            ? error.message
            : error
          : "Something went wrong",
      });
      
    }


  })



}

