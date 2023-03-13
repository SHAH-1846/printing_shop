const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const printPagesManager = require('../managers/printPagesManager');


exports.createNew = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    let job_id = req.body.job_id;
    let job_print_operator = req.body.job_print_operator; // (Dropdown) (Completed) From job_print_operators table
    let job_print_color = req.body.job_print_color; // (Dropdown) (Completed) From job_print_colors table
    let print_sides = req.body.print_sides; // (Single or Double)
    let item_pages = req.body.item_pages;
    let print_pages_printer = req.body.print_pages_printer; // (Dropdown) (Completed) From print_pages_printers table
    let job_print_quantity = req.body.job_print_quantity;
    let paper_type = req.body.paper_type; // (Dropdown) (Completed) From print_pages_paper_types table
    let job_req_paper_quantity = req.body.job_req_paper_quantity;
    let job_print_comment = req.body.job_print_comment;
    let print_pages_machine = req.body.print_pages_machine // (Dropdown) (Completed) From print_pages_machines table
    let job_print_total = req.body.job_print_total;

    printPagesManager.createNew(token, job_id, job_print_operator, job_print_color, print_sides, item_pages, print_pages_printer, job_print_quantity,  paper_type, job_req_paper_quantity, job_print_comment, print_pages_machine, job_print_total)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }


exports.fetchAllPrintPagesOperators = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printPagesManager.fetchAllPrintPagesOperators(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }


  
exports.fetchAllPrintPagesColors = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printPagesManager.fetchAllPrintPagesColors(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }


  exports.fetchAllPrintPagesPrinters = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printPagesManager.fetchAllPrintPagesPrinters(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }

  exports.fetchAllPrintPagesPaperTypes = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printPagesManager.fetchAllPrintPagesPaperTypes(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }


  exports.fetchAllPrintPagesMachines = function (req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

  
    printPagesManager.fetchAllPrintPagesMachines(token)
      .then((result) => {
        const response = success_function(result);
        res.status(result.status).send(response);
      })
      .catch((error) => {
        const response = error_function(error);
        res.status(error.status).send(response);
      })
  }