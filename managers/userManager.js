const userModel = require("../db/models/Users");
const userRoles = require("../db/models/user_role");
const email_transporter = require("../utils/email_transporter").sendEmail;
const reset_password_template = require("../utils/email-templates/reset_password").resetPassword;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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
            let email_template = await reset_password_template(
              name,
              email,
              password
            );
            // console.log(email_template);
            await email_transporter(email, "Reset Password", email_template);
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
            { user_id: user._id },
            process.env.PRIVATE_KEY,
            { expiresIn: "10m" }
          );
          let data = await userModel.findOrCreate({
            where: { email: email },
            defaults: {
              forgot_password_token : reset_token       
             }
          });


          
          if (data.matchedCount === 1 && data.modifiedCount == 1) {
            let reset_link = `${process.env.FRONTEND_URL}/reset-password?token=${reset_token}`;
            let email_template = await restPassword(
              user.first_name,
              reset_link
            );
            sendEmail(email, "Помоград - сброс пароля", email_template);
            resolve({ status: 200, message: "Email sent successfully" });
          } else if (data.matchedCount === 0)
            reject({ status: 404, message: "User not found" });
          else reject({ status: 400, message: "Password reset failed" });
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

