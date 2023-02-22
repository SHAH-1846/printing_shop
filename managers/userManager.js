const userModel = require("../db/models/Users");
const userRoles = require("../db/models/user_role");
const email_transporter = require("../utils/email_transporter").sendEmail;
const reset_password_template =
  require("../utils/email-templates/reset_password").resetPassword;
const bcrypt = require("bcryptjs");

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
