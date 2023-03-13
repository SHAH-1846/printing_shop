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
const entitiesModel = require('../db/models/entities');
const fs = require('fs');
const fileUpload = require('../utils/file_upload').fileUpload;
const validateCreateUser = require('../validation/create_user');
const users = require("../db/models/users");
const { decode } = require("punycode");
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


        // Validations
        // data ={
        //   first_name : first_name,
        //   last_name : last_name,
        //   email : email,
        //   phone : phone,
        //   role : role,
        //   department : department,
        //   section : section,
        //   branch : branch
        // }

        // const Validations = await validateCreateUser(data);

        // if (!isValid) {
        //   reject({"status" : 400, "data" : errors, "message" : "Validations failed"});
        // }



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
          let [newUser, created] = await userModel.findOrCreate({
            where: { email: email },
            defaults: new_user,
            raw : true
          });

          console.log("New user : ", newUser);

          console.log("New user id : " ,newUser.id );

          let role_id = (await userRoles.findOne({where : {role : role}, attributes : ['id']})).getDataValue('id');
          let setRoleId = await userRoleConnector.create({user_id : newUser.id, role_id : role_id});

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

exports.updateProfile = async function (first_name, last_name, image, phone, token) {
  return new Promise(async (resolve, reject) => {
    try {
      if(first_name && last_name && phone){

        let decoded = jwt.decode(token);

        let user = await userModel.findOne({where : {id : decoded.user_id}});

        if(user) {

          console.log("User Found : ", user);
          newProfile = {
            first_name : first_name,
            last_name : last_name,
            phone : phone,
            image : image
          }


             //Checking for image
             if (image) {
               image = await fileUpload(image, "users");

               if (image) {
                 newProfiel["image"] = image;
               } else {
                 console.log("Unable to save image");
               }
             } else {
               newProfile["image"] = null;
             }

             await user.update(newProfile);

             resolve({
              status: 200,
              message: "Profile updated successfully",
            });
  
        }

      } else {
        if (!first_name)
          reject({ status: 422, message: "First Name is required" });
        if (!last_name)
          reject({ status: 422, message: "Last Name is required" });
        if (!phone) reject({ status: 422, message: "Phone is required" });
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


exports.deleteProfile = async function (token, targetId) {
  return new Promise(async (resolve, reject) => {
    try {

      let decoded = jwt.decode(token);

      let user = await userModel.findByPk(decoded.user_id);

      if (user) {
        let targetUser = await userModel.findByPk(targetId);

        await targetUser.destroy();

        resolve({ status: 200, message: "Profile deleted" });
      } else {
        reject({ status: 404, message: "Requested user not found" });
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
              user.first_name,
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

exports.fetchAllProfiles = async function (token) {

  return new Promise(async (resolve, reject)=>{

    try {

      // console.log("Token : ", token);
      //decoding token and finding the requested user
      const decoded = jwt.decode(token);
      const user = await userModel.findOne({where : {id : decoded.user_id}});
    
      if(user){
    
        // let users = await userModel.findAll({
        //   attributes: ['first_name', 'last_name', 'email', 'image', 'phone', 'createdAt','updatedAt'] //incomplete, need to implement a way to fetch department, section, and branch details from corresponding columns
        // });

        //Array to store the ids of all users
        let idData = [];

        //Getting the id's
        let ids = await userModel.findAll({raw : true, attributes  : ['id']});

        // console.log("Ids : ", ids);

        //Pushing all ids to the idData array using map function
        ids.map(id => { idData.push(id.id)});

        // console.log("idData : " , idData);

        // let users = [];
      
        //Mapping idData inorder to fetch user details
       let users =  await Promise.all(idData.map(async (id) => { 
        //Variable to store user_info
          let user_info = {}
          //Variable to store user_role ids
          let user_role_id = [];


          //Finding the specific user from database using primary key
          let user = (await userModel.findByPk(id));


          //Saving basic info of user from user table to user_info
          user_info.id = user.id;
          user_info.first_name = user.first_name;
          user_info.last_name = user.last_name;
          user_info.phone = user.phone;

          if(user.image !== null) {

            user_info.image = user.image;

          }else {
            user_info.image = "No image";
          }

          let image_path = user.image
          console.log("Image Path : ", image_path);
          // if(image_path !== null) {


          //   fs.readFile(`${image_path}`, (err, data) => {
          //     if (err) throw err;
          //     // encode the data as base64 string
          //     const base64Image = Buffer.from(data).toString("base64");
          //     // send the base64 encoded string to the frontend
          //     user_info.image = base64Image;
          //   });

          // }else {
          //   user_info.image = "No image";
          // }



          //Finding role id's of the user from user-role connector table using user_id
          let role_ids = await userRoleConnector.findAll({where : {user_id : id}, raw : true, attributes : ['role_id']});

          //Mapping role_ids from database and storing only the role_id attribute to user_role_id variable
          role_ids.map(role => { user_role_id.push(role.role_id)});
          // console.log('Role ids : ',user_role_id );

          //Then we got the role_ids and map the user_role_ids inorder to find the roles from roles table
          let roles = await Promise.all(user_role_id.map(async (role_id) => {

            //Find specific role names from roles table
            let role = (await userRoles.findByPk(role_id)).getDataValue('role');
            return role;
            

          }))

          // saving roles to the  user_info object variable
          user_info.roles = roles;

          // console.log("Roles : ", roles);
          // users.push(user_info);
          // console.log("Users: ", users);


          // let user_by_id = await userModel.findByPk(id);
          //Finding department, section and branch id's
          let department_id = user.department_id;
          // console.log("Department_id : ", department_id);
          let section_id = user.section_id;
          // console.log("Section_id : ", section_id);
          let branch_id = user.branch_id;
          // console.log("Branch_id : ", branch_id);

          //Finding department, section and banch names from specific tables and saving it to the user_info object variable
          let department = (await departmentModel.findOne({ where : {id : department_id}, attributes : ['department'], raw : true})).department;
          console.log("Department : ", department);
          user_info.department = department;
          let section = (await sectionModel.findOne({where : {id : section_id}, attributes : ['section'], raw : true})).section;
          // console.log("Section : ", section);
          user_info.section = section;
          let branch = (await branchModel.findOne({where : {id : branch_id}, raw : true, attributes : ['branch']})).branch;
          // console.log("Branch : ", branch);
          user_info.branch = branch;

          //Returning the user_info of the user of mapped_id
          return user_info;
          // console.log("Users  : ", users);



        }));

        console.log("Users : ", users);



      
        // console.log("All fetched Users : ", users);
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




exports.fetchAllRoles = async function(token) {

  return new Promise(async (resolve, reject) =>{

    try {

      const decoded = jwt.decode(token);

      const user = await userModel.findByPk(decoded.user_id);
  
      if(user) {
  
        let data = await userRoles.findAll({raw: true, attributes : ['role']});
        console.log("Type of data  : ", typeof(data));
        let roles = [];
        console.log("Role length before : ", roles.length);


        // for(let i=0; i<data.length; i++){

        //   roles.push(data[i].role);

        // }



        data.map(e => { roles.push(e.role)});

        console.log("Roles : ", roles);

        console.log("Roles length after : ", roles.length);


        if(roles.length > 0) {

          resolve({"status" : 200, "data" : roles, "message" : "User roles fetched successfully"});
        }else {
          reject({"status" : 400, "message" : "No roles found"});
        }
  
      }else {
        reject({"status" : 400, "message" : "Requested user not found"});
      }
      
    } catch (error) {

      console.log("Error : ", error);

      reject({"status" : 400, "message" : "Something went wrong"});
      
    }

  
  })
}



exports.addRoles = async function (
  //Create another login for first time login
  token,
  user_id,
  role
) {
  return new Promise(async (resolve, reject) => {
    try {
      //checking if requested user is admin or not

      //checking if user exist
      if (token && role && user_id
      ) {

        let decoded = jwt.decode(token);
        let user = await userModel.findOne({ where: {id: decoded.user_id } });

        // decoded = jwt.decode(token);
        // const user_id = decoded.user_id;
        // user_role_id = userRoleConnector.findAll({ where: { user_id: user_id } });

        if (user) {
          //user exist
          let target_user = await userModel.findOne({where : {id : user_id}});
          console.log("Role : ", role);
          let user_role_id = (await userRoles.findOne({where : {role : role}})).getDataValue('id');
          console.log("user_role_id : ", user_role_id);
          let addRole = await userRoleConnector.create({user_id : user_id, role_id : user_role_id});

          if(addRole) {

            resolve({"status" : 200, "message" : "User role added successfully"});
          }else {

            reject({"status" : 400, "message" : "Cannot add user role"});
          }

        } else {
          reject({"status" : 400, "message" : "Cannot find requested user"});
        }
          // console.log(email_template)

        }else {
          reject({"status" : 400, "message" : "Datas not sufficient"});
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
