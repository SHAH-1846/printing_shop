const usersModel = require('../db/models/users');
const job_print_operators_model = require('../db/models/job_print_operator');
const job_print_colors_model = require('../db/models/job_print_color');
const print_pages_printers_model = require('../db/models/print_pages_printer');
const print_pages_paper_types_model = require('../db/models/print_pages_paper_type');
const print_pages_machines_model = require('../db/models/print_pages_machine');
const jwt  = require('jsonwebtoken');



exports.createNew = async function(token, job_print_operator, job_print_color, print_sides, item_pages, print_pages_printer, job_print_quantity,  paper_type, job_req_paper_quantity, job_print_comment, print_pages_machine, job_print_total) {

    return new Promise(async (resolve, reject) => {
        try {
            
            const decoded = jwt.decode(token);
            const user = await usersModel.findByPk(decoded.user_id);
            console.log("Token : ", token);
  
            if(user) {
              
                if(job_id && job_print_operator && job_print_color && print_sides && item_pages && print_pages_printer && job_print_quantity &&  paper_type && job_req_paper_quantity && job_print_comment && print_pages_machine && job_print_total) {
                  
                  let job_print_operator_id = (await job_print_operators_model.findOne({where : {job_print_operator : job_print_operator}, attributes : ['id'], raw : true})).id;
                  console.log("job_print_operator_id : ", job_print_operator_id);
  
                  let job_print_color_id = (await job_print_colors_model.findOne({where : {job_print_color : job_print_color}, attributes : ['id'], raw : true})).id;
                  console.log("job_print_color_id : ", job_print_color_id);
  
                  let print_pages_printer_id = (await bindingStatusModel.findOne({where : {print_pages_printer : print_pages_printer}, attributes : ['id'], raw : true})).id;
                  console.log("print_pages_printer : ", print_pages_printer);
  
                  let paper_type_id = (await print_pages_paper_types_model.findOne({where : {paper_type : paper_type}, attributes : ['id'], raw : true})).id;
                  console.log("paper_type_id : ", paper_type_id);
  
                    let print_pages_machine_id = (await print_pages_machines_model.findOne({where : {machine : print_pages_machine}, attributes : ['id'], raw : true})).id;
                    console.log("print_pages_machine_id : ", print_pages_machine_id);
  
  
  
  
                    let new_instance = {
                        job_id : job_id, // (id) sent from req body
                        job_print_operator_id : job_print_operator_id, // Dropdown (id)
                        job_print_color_id : job_print_color_id, // Dropdown (id)
                        print_sides : print_sides, // Single or Double
                        item_pages : item_pages,
                        print_pages_printer_id : print_pages_printer_id, // Dropdown (id)
                        job_print_quantity : job_print_quantity,
                        paper_type_id : paper_type_id, // Dropdown (id)
                        job_req_paper_quantity : job_req_paper_quantity, // Dropdown (id)
                        job_print_comment : job_print_comment, // Dropdown (id)
                        print_pages_machine_id : print_pages_machine_id, //Dropdown (id)
                        job_print_total : job_print_total
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


exports.fetchAllPrintPagesOperators = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let job_print_operators = (await job_print_operators_model.findAll({attributes : ['job_print_operator']}));
          console.log("job_print_operators : ", job_print_operators);
  
          let data = job_print_operators.map((e) => {
            return e.job_print_operator;
          })

          resolve({"status" : 200, "data" : data, "message" : "Job print operators fetched successfully"});
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


  exports.fetchAllPrintPagesColors = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let job_print_colors = (await job_print_colors_model.findAll({attributes : ['job_print_color']}));
          console.log("job_print_colors : ", job_print_colors);
  
          let data = job_print_colors.map((e) => {
            return e.job_print_color;
          })

          resolve({"status" : 200, "data" : data, "message" : "Job print colors fetched successfully"});
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


  exports.fetchAllPrintPagesPrinters = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let printers = (await print_pages_printers_model.findAll({attributes : ['print_pages_printer']}));
          console.log("printers : ", printers);
  
          let data = printers.map((e) => {
            return e.print_pages_printer;
          })

          resolve({"status" : 200, "data" : data, "message" : "Job print pages fetched successfully"});
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


  exports.fetchAllPrintPagesPaperTypes = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let paperTypes = (await print_pages_paper_types_model.findAll({attributes : ['paper_type']}));
          console.log("paperTypes : ", paperTypes);
  
          let data = paperTypes.map((e) => {
            return e.paper_type;
          })

          resolve({"status" : 200, "data" : data, "message" : "Job print pages paper types fetched successfully"});
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

  exports.fetchAllPrintPagesMachines = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let machines = (await print_pages_machines_model.findAll({attributes : ['machine']}));
          console.log("machines : ", machines);
  
          let data = machines.map((e) => {
            return e.machine;
          })

          resolve({"status" : 200, "data" : data, "message" : "Print pages machines fetched successfully"});
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