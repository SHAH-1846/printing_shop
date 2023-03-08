const usersModel = require('../db/models/users');
const jobsModel = require('../db/models/jobs');
const entitiesModel = require('../db/models/entities');
const departmentsModel = require('../db/models/departments');
const sectionsModel = require('../db/models/sections');
const deliveryModesModel = require('../db/models/delivery_modes');
const documentModesModel = require('../db/models/document_modes'); 
const documentTypesModel = require('../db/models/document_types');
const clientsModel = require('../db/models/clients');
const jobTypesModel = require('../db/models/job_types');
const jobStatusModel = require('../db/models/job_status');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const job_status = require('../db/models/job_status');

exports.createJob = async function(token, job_type, job_status,  job_title,requested_by, requested_by_entity, requested_by_department, requested_by_section, job_req_comment, confidentiality, require_sample, require_edits, document_type, document_name, document_mode, req_delivery_date, delivery_mode, deliver_to, deliver_to_entity, deliver_to_department, deliver_to_section, require_cover, require_finishing) {

    return new Promise(async (resolve, reject) => {
        try {
            
            const decoded = jwt.decode(token);
            const user = await usersModel.findByPk(decoded.user_id);
            console.log("Token : ", token);

            if(user) {
                if(job_type && job_status && job_title && requested_by && requested_by_entity && requested_by_department && requested_by_section && job_req_comment && confidentiality && require_sample && require_edits && document_type && document_name && document_mode && req_delivery_date && delivery_mode && deliver_to && deliver_to_entity && deliver_to_department && deliver_to_section && require_cover && require_finishing) {
                  
                  let job_status_id = (await jobStatusModel.findOne({where : {status : job_status}, attributes : ['id'], raw : true})).id;
                  console.log("job_status_id : ", job_status_id);

                  let requested_by_entity_id = (await entitiesModel.findOne({where : {entity : requested_by_entity}, attributes : ['id'], raw : true})).id;
                  console.log("requested_by_entity_id : ", requested_by_entity_id);

                  let requested_by_department_id = (await departmentsModel.findOne({where : {department : requested_by_department}, attributes : ['id'], raw : true})).id;
                  console.log("requested_by_department_id : ", requested_by_department_id);

                  let requested_by_section_id = (await sectionsModel.findOne({where : {section : requested_by_section}, attributes : ['id'], raw : true})).id;
                  console.log("requested_by_section_id : ", requested_by_section_id);

                    let deliver_to_entity_id = (await entitiesModel.findOne({where : {entity : deliver_to_entity}, attributes : ['id'], raw : true})).id;
                    console.log("deliver_to_entity_id : ", deliver_to_entity_id);

                    let deliver_to_department_id = (await departmentsModel.findOne({where : {department : deliver_to_department}, attributes : ['id'], raw : true})).id;
                    console.log("deliver_to_department_id : ", deliver_to_department_id);

                    let deliver_to_section_id = (await sectionsModel.findOne({where : { section : deliver_to_section}, attributes : ['id'], raw : true})).id;
                    console.log("deliver_to_section_id : ", deliver_to_section_id);

                    let delivery_modes_id = (await deliveryModesModel.findOne({where : { delivery_mode : delivery_mode}, attributes : ['id'], raw : true})).id;
                    console.log("delivery_modes_id : ", delivery_modes_id);

                    let document_modes_id = (await documentModesModel.findOne({where : { document_mode : document_mode}, attributes : ['id'], raw : true})).id;
                    console.log("document_modes_id : ", document_modes_id);

                    let document_types_id = (await documentTypesModel.findOne({where : { document_type : document_type}, attributes : ['id'], raw : true})).id;
                    console.log("document_types_id : ", document_types_id);

                    // requested_by in UI image
                    let requested_by_client_id = (await clientsModel.findOne({where : { client : requested_by}, attributes : ['id'], raw : true})).id;
                    console.log("requested_by_client_id : ", requested_by_client_id);

                    let job_type_id = (await jobTypesModel.findOne({where : { job_type : job_type}, attributes : ['id'], raw : true})).id;
                    console.log("job_type_id : ", job_type_id);

                    // deliver_to in UI image
                    let deliver_to_client_id = (await clientsModel.findOne({where : { client : deliver_to}, attributes : ['id'], raw : true})).id;
                    console.log("deliver_to_client_id : ", deliver_to_client_id);



                    let new_job = {
                        job_title : job_title,
                        requested_by_id : requested_by_client_id, // Dropdown (id)
                        requested_by_entity_id : requested_by_entity_id, // Dropdown (id)
                        requested_by_department_id : requested_by_department_id, // Dropdown (id)
                        requested_by_section_id : requested_by_section_id, // Dropdown (id)
                        job_type_id : job_type_id, // Dropdown (id)
                        job_req_comment : job_req_comment,
                        document_type_id : document_types_id, // Dropdown (id)
                        document_name : document_name,
                        document_mode_id : document_modes_id, // Dropdown (id)
                        requested_delivery_date : req_delivery_date,
                        job_requested_on : dayjs().format(),
                        job_status : job_status_id, // Dropdown (id)
                        confidentiality : confidentiality, // Yes or No
                        require_sample : require_sample, // Yes or No
                        require_edits : require_edits, // Yes or No
                        delivery_mode_id : delivery_modes_id, // Dropdown (id)
                        deliver_to_id : deliver_to_client_id, // Dropdown (id)
                        deliver_to_entity_id : deliver_to_entity_id, // Dropdown (id)
                        deliver_to_department_id : deliver_to_department_id, // Dropdown (id)
                        deliver_to_section_id : deliver_to_section_id , // Dropdown (id)
                        require_cover : require_cover, // Yes or No and redirects to print_cover page
                        require_finishing : require_finishing //Yes or No and redirects to finishing and binding page
                    }

                    console.log("New Job : ", new_job);

                    //Saving to database
                    let newJob = await jobsModel.create(new_job);
                    newJob.save();

                    resolve({"status" : 200, "data" : newJob.id, "message" : "New job created successfully"});


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


  exports.fetchAllDocumentModes = async function(token) {

    return new Promise(async (resolve, reject) =>{

      try {
        
        const decoded = jwt.decode(token);
  
        const user = usersModel.findByPk(decoded.user_id);
        
        if(user) {
  
          let documentModes = await documentModesModel.findAll({attributes : ['document_mode']});
          let data = documentModes.map((e) => { return e.document_mode });
  
          resolve({"status" : 200, "data" : data, "message" : "Document modes fetched successfully"});
  
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



  
  exports.fetchAllDocumentTypes = async function(token) {

    return new Promise(async (resolve, reject) =>{

      try {
        
        const decoded = jwt.decode(token);
  
        const user = usersModel.findByPk(decoded.user_id);
        
        if(user) {
  
          let documentTypes = await documentTypesModel.findAll({attributes : ['document_type']});
          let data = documentTypes.map((e) => { return e.document_type });
  
          resolve({"status" : 200, "data" : data, "message" : "Document types fetched successfully"});
  
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


  exports.fetchAllClients = async function(token) {

    return new Promise(async (resolve, reject) =>{

      try {
        
        const decoded = jwt.decode(token);
  
        const user = usersModel.findByPk(decoded.user_id);
        
        if(user) {
  
          let clients = await clientsModel.findAll({attributes : ['client']});
          let data = clients.map((e) => { return e.client });
  
          resolve({"status" : 200, "data" : data, "message" : "Document types fetched successfully"});
  
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




  exports.fetchAllJobTypes = async function(token) {

    return new Promise(async (resolve, reject) =>{

      try {
        
        const decoded = jwt.decode(token);
  
        const user = usersModel.findByPk(decoded.user_id);
        
        if(user) {
  
          let jobTypes = await jobTypesModel.findAll({attributes : ['job_type']});
          let data = jobTypes.map((e) => { return e.job_type });
  
          resolve({"status" : 200, "data" : data, "message" : "Job types fetched successfully"});
  
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


  exports.fetchAllJobStatus = async function(token) {

    return new Promise(async (resolve, reject) =>{

      try {
        
        const decoded = jwt.decode(token);
  
        const user = usersModel.findByPk(decoded.user_id);
        
        if(user) {
  
          let jobStatus = await jobStatusModel.findAll({attributes : ['status']});
          let data = jobStatus.map((e) => { return e.status });
  
          resolve({"status" : 200, "data" : data, "message" : "Job status fetched successfully"});
  
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