const printCoverManager = require('../managers/printCoverManager');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;




exports.createNew = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];


    let print_cover_operator = req.body.print_cover_operator // (Dropdown) (completed) From print_cover_operators table
    let print_cover_color = req.body.print_cover_color // (Dropdown) (completed) From print_cover_colors table
    let print_cover_status = req.body.print_cover_status // (Dropdown) (completed) From print_cover_statuses table
    let print_cover_printer = req.body.print_cover_printer // (Dropdown) (completed) From print_cover_printers table
    let print_cover_paper_type = req.body.print_cover_paper_type // (Dropdown) (completed) From print_cover_paper_types table
    let print_cover_side = req.body.print_cover_side // (Dropdown) (completed) From print_cover_sides table
    let require_lamination = req.body.require_lamination; // Yes or No
    let print_cover_quantity = req.body.print_cover_quantity;
    let print_cover_machine = req.body.print_cover_machine; // (Dropdown)
    // let request_date; // Insert date using dayjs
    // let completed_date; // Insert date using dayjs
    finishingAndBindingManager.createNew(token, job_id, binding_operator, binding_type, binding_status, material, binding_page_count, binding_quantity, require_perforation, binding_material, unit_cost)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }


exports.fetchAllPrintCoverOperators = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printCoverManager.fetchAllPrintCoverOperators(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }


  exports.fetchAllPrintCoverColors = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printCoverManager.fetchAllPrintCoverColors(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }


  exports.fetchAllPrintCoverStatus = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printCoverManager.fetchAllPrintCoverStatus(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }



  exports.fetchAllPrintCoverPrinters = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printCoverManager.fetchAllPrintCoverPrinters(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }

  
  exports.fetchAllPrintCoverPaperTypes = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printCoverManager.fetchAllPrintCoverPaperTypes(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }

  exports.fetchAllPrintCoverSides = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printCoverManager.fetchAllPrintCoverSides(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }