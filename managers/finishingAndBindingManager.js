const usersModel = require('../db/models/users');
// const bindingOperatorsModel = require('../db/models/binding_operators');
const bindingTypesModel = require('../db/models/binding_types');
const bindingStatusModel = require('../db/models/binding_status');
// const bindingMaterialsModel = require('../db/models/binding_materials');
const MaterialsModel = require('../db/models/materials');
const bindingUnitCostsModel = require('../db/models/binding_unit_costs');
const finishingAndBindingModel = require('../db/models/finishing_and_bindings');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');



exports.createNew = async function(token, job_id, binding_operator, binding_type, binding_status, material, binding_page_count, binding_quantity, require_perforation, binding_material, unit_cost) {

  return new Promise(async (resolve, reject) => {
      try {
          
          const decoded = jwt.decode(token);
          const user = await usersModel.findByPk(decoded.user_id);
          console.log("Token : ", token);

          if(user) {
            
              if(job_id && binding_operator && binding_type && binding_status && material && binding_page_count && binding_quantity && require_perforation && binding_material && unit_cost) {
                
                let binding_operator_id = (await bindingOperatorsModel.findOne({where : {binding_operator : binding_operator}, attributes : ['id'], raw : true})).id;
                console.log("binding_operator_id : ", binding_operator_id);

                let binding_type_id = (await bindingTypesModel.findOne({where : {binding_type : binding_type}, attributes : ['id'], raw : true})).id;
                console.log("binding_type_id : ", binding_type_id);

                let binding_status_id = (await bindingStatusModel.findOne({where : {status : binding_status}, attributes : ['id'], raw : true})).id;
                console.log("binding_status_id : ", binding_status_id);

                let material_id = (await MaterialsModel.findOne({where : {material : material}, attributes : ['id'], raw : true})).id;
                console.log("material_id : ", material_id);

                  let binding_material_id = (await bindingMaterialsModel.findOne({where : {material : binding_material}, attributes : ['id'], raw : true})).id;
                  console.log("binding_material_id : ", binding_material_id);

                  let unit_cost_id = (await bindingUnitCostsModel.findOne({where : {unit_cost : unit_cost}, attributes : ['id'], raw : true})).id;
                  console.log("unit_cost_id : ", unit_cost_id);



                  let new_instance = {
                      job_id : job_id, // (id) sent from req body
                      binding_operator_id : binding_operator_id, // Dropdown (id)
                      binding_type_id : binding_type_id, // Dropdown (id)
                      binding_status_id : binding_status_id, // Dropdown (id)
                      material_id : material_id, // Dropdown (id)
                      binding_page_count : binding_page_count,
                      binding_quantity : binding_quantity,
                      require_perforation : require_perforation, // Yes or No
                      binding_material_id : binding_material_id, // Dropdown (id)
                      unit_cost_id : unit_cost_id, // Dropdown (id)
                      request_date : dayjs().format()
                  }

                  console.log("New Instance : ", new_instance);

                  //Saving to database
                  let newInstance = await finishingAndBindingModel.create(new_instance);
                  newInstance.save();

                  resolve({"status" : 200, "message" : "New instance created for finishing and binding section"});


              }else {
                  reject({"status" : 400, "message" : "Datas not sufficient"});
              }
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
  

  exports.fetchAllBindingStatus = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let bindingStatus = (await bindingStatusModel.findAll({attributes : ['status']}));
          console.log("Binding_status : ", bindingStatus);
  
          let data = bindingStatus.map((e) => {
            return e.status;
          })

          resolve({"status" : 200, "data" : data, "message" : "Binding status fetched successfully"});
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

  exports.fetchAllBindingMaterials = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let bindingMaterials = (await bindingMaterialsModel.findAll({attributes : ['material']}));
          console.log("Binding_material : ", bindingMaterials);
  
          let data = bindingMaterials.map((e) => {
            return e.material;
          })

          resolve({"status" : 200, "data" : data, "message" : "Binding materials fetched successfully"});
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


  exports.fetchAllMaterials = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let materials = (await MaterialsModel.findAll({attributes : ['material']}));
          console.log("material : ", materials);
  
          let data = materials.map((e) => {
            return e.material;
          })

          resolve({"status" : 200, "data" : data, "message" : "Materials fetched successfully"});
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


  exports.fetchAllBindingUnitCosts = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let costs = (await bindingUnitCostsModel.findAll({attributes : ['unit_cost']}));
          console.log("Costs : ", costs);
  
          let data = costs.map((e) => {
            return e.unit_cost;
          })

          resolve({"status" : 200, "data" : data, "message" : "Unit costs fetched successfully"});
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