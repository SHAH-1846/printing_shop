const userModel = require("../db/models/users");
const userRoles = require("../db/models/user_roles");
const userRoleConnector = require('../db/models/user_roles_connection');
const email_transporter = require("../utils/email_transporter").sendEmail;
const set_password_template = require("../utils/email-templates/set_password").resetPassword;
const forgot_password_template = require('../utils/email-templates/forgot-password').forgotPassword;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const departmentModel = require('../db/models/departments');
const sectionModel = require('../db/models/sections');
const branchModel = require('../db/models/branches');



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
        if (first_name && last_name && image && department && section && branch && email && phone && role) {
          let user = await userModel.findOne({ where: { email: email } });
          // decoded = jwt.decode(token);
          // const user_id = decoded.user_id;
          // user_role_id = userRoleConnector.findAll({ where: { user_id: user_id } });

          if (user) {
            //user exist
            reject({ status: 403, message: "User Already Exist" });
          } else {
            let salt = bcrypt.genSaltSync(10);

            // let code = Math.floor(1000 + Math.random() * 9000);
            let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let otp = "";
           for (let i = 0; i <= 7; i++) {
              var randomNumber = Math.floor(Math.random() * chars.length);
              otp += chars.substring(randomNumber, randomNumber +1);
             }

             let password = bcrypt.hashSync(otp,salt);

            let department_value = await departmentModel.findOne({attributes : ['id'], raw : true, where : {department : department}});
            let department_id = department_value.id;
            console.log('Department Id : ', department_id);
            let section_value = await sectionModel.findOne({attributes : ['id'], raw : true,where : {section : section}});
            let section_id = section_value.id;
            console.log('Section Id : ', section_id);
            let branch_value = await branchModel.findOne({attributes : ['id'], raw : true, where : {branch : branch}});
            let branch_id = branch_value.id;
            console.log('Branch Id : ', branch_id);



            let new_user = {
              first_name: first_name,
              last_name : last_name,
              image : image,
              email: email,
              phone: phone,
              department_id : department_id,
              section_id : section_id,
              branch_id : branch_id,
              password: password,
              otp : otp,
              otp_status : "active"
            };

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
          if (!first_name) reject({ status: 422, message: "First Name is required" });
          if (!last_name) reject({ status: 422, message: "Last Name is required" });
          if (!phone) reject({ status: 422, message: "Phone is required" });
          if (!role) reject({ status: 422, message: "Role is required" });
          if (!email) reject({ status: 422, message: "Email is required" });
          if (!password)
            reject({ status: 422, message: "Password is required" });
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
        let user = await userModel.findOne({where : {email : email}});
        if (user) {
          let reset_token = jwt.sign(
            { user_id: user.id },
            process.env.PRIVATE_KEY,
            { expiresIn: "10m" }
          );

          console.log("Reset Token : ", reset_token);

          await user.set({
            forgot_password_token : reset_token
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
          }else reject({ status: 400, message: "Password reset failed" });
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
exports.passwordReset = async function (token, password) {
  return new Promise(async (resolve, reject) => {
    try {
      decoded = jwt.decode(token);
      console.log("User Id : ", decoded.user_id);
      const user_id = decoded.user_id;
      console.log("Decoded : ", decoded);
      let user = await userModel.findOne({
        where: {
          [Op.and]: [{ id: decoded.user_id }, { reset_password_token : token}],
        },
      });

      console.log("User : ", user);

      if (user) {
        let salt = bcrypt.genSaltSync(10);
        let password_hash = bcrypt.hashSync(password, salt);
        let data = await userModel.update(
          { password : password_hash },
          {
            where: {
              id : decoded.user_id,
            },
          }
        );
        if (data){ 
          resolve({ status: 200, message: "Password changed successfully" });
        }else reject({ status: 400, message: "Password reset failed" });

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