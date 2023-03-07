const usersModel = require('../db/models/users');
const jobsModel = require('../db/models/jobs');
const entitiesModel = require('../db/models/entities');
const departmentsModel = require('../db/models/departments');
const sectionsModel = require('../db/models/sections');
const deliveryModesModel = require('../db/models/delivery_modes');
const jwt = require('jsonwebtoken');

exports.createJob = async function(token, job_req_date, job_type, job_title,requested_by,requested_by_entity, requested_by_department, requested_by_section, job_req_comment, confidentiality, require_sample, require_edits, document_type, document_name, document_mode, req_delivery_date, delivery_mode, deliver_to, deliver_to_entity, deliver_to_department, deliver_to_section, require_cover, require_finishing) {

    return new Promise(async (resolve, reject) => {
        try {
            
            const decoded = jwt.decode(token);
            const user = await usersModel.findByPk(decoded.user_id);

            if(user) {
                if(job_req_date && job_type && job_title && requested_by && requested_by_entity && requested_by_department && requested_by_section && job_req_comment && confidentiality && require_sample && require_edits && document_type && document_name && document_mode && req_delivery_date && delivery_mode && deliver_to && deliver_to_entity && deliver_to_department && deliver_to_section && require_cover && require_finishing) {

                    let entity_id = await entitiesModel.findOne({where : {entity : deliver_to_entity}, attributes : ['id'], raw : true});
                    let department_id = await departmentsModel.findOne({where : {department : deliver_to_department}, attributes : ['id'], raw : true});
                    let section_id = await sectionsModel.findOne({where : { section : deliver_to_section}, attributes : ['id'], raw : true});
                    let new_job = {
                        job_title : job_title,
                        requested_by : requested_by, // Dropdown
                        requested_by_entity : requested_by_entity, // Dropdown
                        requested_by_department : requested_by_department, // Dropdown
                        requested_by_section : requested_by_section, // Dropdown
                        job_type : job_type, 
                        job_req_comment : job_req_comment,
                        document_type : document_type, // Dropdown
                        document_name : document_name,
                        document_mode : document_mode, // Dropdown
                        requested_delivery_date : req_delivery_date,
                        job_requested_on : job_req_date,
                        job_status : "pending",
                        confidentiality : confidentiality, // Yes or No
                        require_sample : require_sample, // Yes or No
                        require_edits : require_edits, // Yes or No
                        delivery_mode : delivery_mode, // Dropdown
                        deliver_to : deliver_to, // Dropdown
                        deliver_to_entity : entity_id, // Dropdown
                        deliver_to_department_id : department_id,
                        deliver_to_section_id : section_id ,
                        require_cover : require_cover, // Yes or No and redirects to print_cover page
                        require_finishing : require_finishing //Yes or No and redirects to finishing and binding page
                    }

                    console.log("New Job : ", new_job);


                }else {
                    reject({"status" : 400, "message" : "Datas not sufficient"});
                }
            }

        } catch (error) {
            
        }
    })
}


exports.fetchAllEntities = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){
          let entities = (await entitiesModel.findAll({attributes : ['entity']}));
          console.log("Entities : ", entities);
  
          let data = entities.map((e) => {
            return e.entity;
          })
          resolve({"status" : 200, "data" : data, "message" : "Entities fetched successfully"});
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
  

  exports.fetchAllDeliveryModes = async function (token) {
    return new Promise(async (resolve, reject) => {
        try {
            const decoded = jwt.decode(token);
            const user = usersModel.findByPk(decoded.user_id);

            if(user) {
                let deliveryModes = await deliveryModesModel.findAll({attributes : ['delivery_mode']});
                console.log("Delivery Modes : ", deliveryModes);

                let data = deliveryModes.map((e) => {
                  return e.delivery_mode;
                });

                resolve({"status" : 200, "data" : data, "message" : "Delivery modes fetched successfully"});
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