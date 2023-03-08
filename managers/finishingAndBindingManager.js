const usersModel = require('../db/models/users');
const bindingOperatorsModel = require('../db/models/binding_operators');
const bindingTypesModel = require('../db/models/binding_types');
const jwt = require('jsonwebtoken');

exports.fetchAllBindingOperators = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let bindingOperators = (await bindingOperatorsModel.findAll({attributes : ['binding_operator']}));
          console.log("Binding_operators : ", bindingOperators);
  
          let data = bindingOperators.map((e) => {
            return e.binding_operator;
          })
          resolve({"status" : 200, "data" : data, "message" : "Binding operators fetched successfully"});
        }else {
          reject({"status" : 400, "message" : "Requested user not found"});
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
  

  exports.fetchAllBindingTypes = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let bindingTypes = (await bindingTypesModel.findAll({attributes : ['binding_type']}));
          console.log("Binding_types : ", bindingTypes);
  
          let data = bindingTypes.map((e) => {
            return e.binding_type;
          })

          resolve({"status" : 200, "data" : data, "message" : "Binding types fetched successfully"});
        }else {
          reject({"status" : 400, "message" : "Requested user not found"});
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
  