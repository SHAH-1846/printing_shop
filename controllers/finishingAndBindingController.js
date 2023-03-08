const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const finishingAndBindingManager = require('../managers/finishingAndBindingManager');



exports.createNew = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];


    let job_id = req.body.job_id; // (id) to be sent from the front-end from the createJob response
    let binding_operator = req.body.binding_operator; // (Dropdown) (completed) From binding_operators table
    let binding_type = req.body.binding_type; // (Dropdown) (completed) From binding_types table


  
    finishingAndBindingManager.createNew(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }


  exports.fetchAllBindingOperators = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    finishingAndBindingManager.fetchAllBindingOperators(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }


  exports.fetchAllBindingTypes = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    finishingAndBindingManager.fetchAllBindingTypes(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }

  