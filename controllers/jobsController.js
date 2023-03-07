const jobsManager = require('../managers/jobsManager');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;


exports.createJob = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    
    //Fetch all these details using token
    // let job_req_by = req.body.job_req_by;
    // let req_user_entity = req.body.entity;
    // let req_user_department = req.body.department;
    // let req_user_section = req.body.section;
    
    
    // let job_status = req.body.job_status;
    let job_req_date = req.body.job_req_date;
    let job_type = req.body.job_type;
    let job_title = req.body.job_title;
    let requested_by = req.body.requested_by; // Dropdown
    let requested_by_entity = req.body.requested_by_entity; // Dropdown (completed)
    let requested_by_department = req.body.requested_by_department; // Dropdown (completed)
    let requested_by_section = req.body.requested_by_section; // Dropdown (completed)
    let job_req_comment = req.body.job_req_comment;
    let confidentiality = req.body.confidentiality; //Yes or No
    let require_sample = req.body.require_sample; //Yes or No
    let require_edits = req.body.require_edits; //Yes or No
    let document_type = req.body.document_type; // Dropdown
    let document_name = req.body.document_name; 
    let document_mode = req.body.document_mode; // Dropdown
    let req_delivery_date = req.body.req_delivery_date;
    let delivery_mode = req.body.delivery_mode; // Dropdown (completed)
    let deliver_to = req.body.deliver_to;
    let deliver_to_entity = req.body.deliver_to_entity; // Dropdown (completed)
    let deliver_to_department = req.body.deliver_to_department; // Dropdown (completed)
    let deliver_to_section = req.body.deliver_to_section; // Dropdown (completed)
    let require_cover = req.body.require_cover; // Yes or No
    let require_finishing = req.body.require_finishing; // Yes or No


    jobsManager.createJob(token, job_req_date, job_type, job_title, requested_by,requested_by_entity, requested_by_department, requested_by_section, job_req_comment, confidentiality, require_sample, require_edits, document_type, document_name, document_mode, req_delivery_date,delivery_mode, deliver_to, deliver_to_entity, deliver_to_department, deliver_to_section, require_cover, require_finishing)
        .then((result) => {

            let response = success_function(result);
            res.status(result.status).send(response);

        })
        .catch((error)=>{
            let response = error_function(error);
            res.status(error.status).send(error);
        })
}

exports.fetchAllEntities = function (req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
  
    jobsManager.fetchAllEntities(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }

  exports.fetchAllDeliveryModes = function (req,res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    jobsManager.fetchAllDeliveryModes(token)
        .then((result) =>{
            const response = success_function(result);
            res.status(result.status).send(response);
        })
        .catch((error) =>{
            const response = error_function(error);
            res.status(error.status).send(response);
        })
  }