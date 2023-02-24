const userModel = require("../db/models/users");
const userRoles = require("../db/models/user_roles");
const email_transporter = require("../utils/email_transporter").sendEmail;
const set_password_template = require("../utils/email-templates/set_password").resetPassword;
const forgot_password_template = require('../utils/email-templates/forgot-password').forgotPassword;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

exports.createUser = async function (
  name,
  email,
  phone,
  role,
  password
  ) {
  return new Promise(async (resolve, reject) => {
    try {
      //checking if requested user is admin or not

      //checking if user exist
        if (name && email && phone && role && password) {
          let user = await userModel.findOne({ where: { email: email } });

          if (user) {
            //user exist
            reject({ status: 403, message: "User Already Exist" });
          } else {
            let salt = bcrypt.genSaltSync(10);

            // let code = Math.floor(1000 + Math.random() * 9000);

            let password_hash = bcrypt.hashSync(password, salt);

            let new_user = {
              name: name,
              email: email,
              phone: phone,
              password: password_hash,
              type: role,
            };

            await userModel.findOrCreate({
              where: { email: email },
              defaults: new_user,
            });

            //Sending email and password
            let email_template = await set_password_template(
              name,
              email,
              password
            );
            // console.log(email_template);
            await email_transporter(email, "Update Password", email_template);
            resolve({
              status: 200,
              message: "Login details send to the email address",
            });
          }
        } else {
          if (!name) reject({ status: 422, message: "Name is required" });
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