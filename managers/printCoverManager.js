const usersModel = require('../db/models/users');
const printCoversModel = require('../db/models/print_cover');
// const printCoverOperatorsModel = require('../db/models/print_cover_operator');
const printCoverColorsModel = require('../db/models/print_cover_color');
const printCoverStatusModel = require('../db/models/print_cover_status');
const printCoverPrintersModel = require('../db/models/print_cover_printer');
const printCoverPaperTypesModel = require('../db/models/print_cover_paper_type');
const printCoverSidesModel = require('../db/models/print_cover_sides');
const printCoverMachinesModel = require('../db/models/print_cover_machine');
// const printCoverMaterialsModel = require('../db/models/print_cover_material');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');


exports.createNew = async function(token, job_id, print_cover_operator, print_cover_color, print_cover_status, print_cover_printer, print_cover_paper_type, print_cover_side, require_lamination, print_cover_quantity, print_cover_machine, print_cover_material) {

  return new Promise(async (resolve, reject) => {
      try {
          
          const decoded = jwt.decode(token);
          const user = await usersModel.findByPk(decoded.user_id);
          console.log("Token : ", token);

          if(user) {
            
              if(job_id && print_cover_operator && print_cover_color && print_cover_status && print_cover_printer && print_cover_paper_type && print_cover_side && require_lamination && print_cover_quantity && print_cover_machine && print_cover_material) {
                
                let print_cover_operator_id = (await printCoverOperatorsModel.findOne({where : {print_cover_operator : print_cover_operator}, attributes : ['id'], raw : true})).id;
                console.log("print_cover_operator_id : ", print_cover_operator_id);

                let print_cover_color_id = (await printCoverColorsModel.findOne({where : {print_cover_color : print_cover_color}, attributes : ['id'], raw : true})).id;
                console.log("print_cover_color_id : ", print_cover_color_id);

                let print_cover_status_id = (await printCoverStatusModel.findOne({where : {status : print_cover_status}, attributes : ['id'], raw : true})).id;
                console.log("print_cover_status_id : ", print_cover_status_id);

                let print_cover_printer_id = (await printCoverPrintersModel.findOne({where : {printer : print_cover_printer}, attributes : ['id'], raw : true})).id;
                console.log("print_cover_printer_id : ", print_cover_printer_id);

                  let print_cover_paper_type_id = (await printCoverPaperTypesModel.findOne({where : {paper_type : print_cover_paper_type}, attributes : ['id'], raw : true})).id;
                  console.log("print_cover_paper_type_id : ", print_cover_paper_type_id);

                  let print_cover_side_id = (await printCoverSidesModel.findOne({where : {print_cover_side : print_cover_side}, attributes : ['id'], raw : true})).id;
                  console.log("print_cover_side_id : ", print_cover_side_id);

                  let print_cover_machine_id = (await printCoverMachinesModel.findOne({where : {print_cover_machine : print_cover_machine}, attributes : ['id'], raw : true})).id;
                  console.log("print_cover_machine_id : ", print_cover_machine_id);

                  let print_cover_material_id = (await printCoverMaterialsModel.findOne({where : {print_cover_material : print_cover_material}, attributes : ['id'], raw : true})).id;
                  console.log("print_cover_material_id : ", print_cover_material_id);


                  let new_instance = {
                      job_id : job_id, // (id) sent from req body
                      print_cover_operator_id : print_cover_operator_id, // Dropdown (id)
                      print_cover_color_id : print_cover_color_id, // Dropdown (id)
                      print_cover_status_id : print_cover_status_id, // Dropdown (id)
                      print_cover_printer_id : print_cover_printer_id, // Dropdown (id)
                      print_cover_paper_type_id : print_cover_paper_type_id, // Dropdown (id)
                      print_cover_side_id : print_cover_side_id, // Dropdown (id)
                      require_lamination : require_lamination, // Yes or No
                      print_cover_quantity : print_cover_quantity,
                      print_cover_machine_id : print_cover_machine_id, //Dropdown (id)
                      print_cover_material_id : print_cover_material_id,
                      request_date : dayjs().format()
                    }

                  console.log("New Instance : ", new_instance);

                  //Saving to database
                  let newInstance = await printCoversModel.create(new_instance);
                  newInstance.save();

                  resolve({"status" : 200, "message" : "New instance created for print covers section"});


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


exports.fetchAllPrintCoverOperators = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let print_cover_operators = (await printCoverOperatorsModel.findAll({attributes : ['print_cover_operator']}));
          console.log("print_cover_operators : ", print_cover_operators);
  
          let data = print_cover_operators.map((e) => {
            return e.print_cover_operator;
          })

          resolve({"status" : 200, "data" : data, "message" : "Print cover operators fetched successfully"});
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


  exports.fetchAllPrintCoverColors = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let print_cover_colors = (await printCoverColorsModel.findAll({attributes : ['print_cover_color']}));
          console.log("print_cover_colors : ", print_cover_colors);
  
          let data = print_cover_colors.map((e) => {
            return e.print_cover_color;
          })

          resolve({"status" : 200, "data" : data, "message" : "Print cover colors fetched successfully"});
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


  exports.fetchAllPrintCoverStatus = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let print_cover_status = (await printCoverStatusModel.findAll({attributes : ['status']}));
          console.log("print_cover_status : ", print_cover_status);
  
          let data = print_cover_status.map((e) => {
            return e.status;
          })

          resolve({"status" : 200, "data" : data, "message" : "Print statuses fetched successfully"});
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


  exports.fetchAllPrintCoverPrinters = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let print_cover_printer = (await printCoverPrintersModel.findAll({attributes : ['printer']}));
          console.log("print_cover_printer : ", print_cover_printer);
  
          let data = print_cover_printer.map((e) => {
            return e.printer;
          })

          resolve({"status" : 200, "data" : data, "message" : "Printers fetched successfully"});
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


  exports.fetchAllPrintCoverPaperTypes = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let print_cover_paper_type = (await printCoverPaperTypesModel.findAll({attributes : ['paper_type']}));
          console.log("print_cover_paper_type : ", print_cover_paper_type);
  
          let data = print_cover_paper_type.map((e) => {
            return e.paper_type;
          })

          resolve({"status" : 200, "data" : data, "message" : "Paper types fetched successfully"});
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

  exports.fetchAllPrintCoverSides = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let print_cover_sides = (await printCoverSidesModel.findAll({attributes : ['print_cover_side']}));
          console.log("print_cover_sides : ", print_cover_sides);
  
          let data = print_cover_sides.map((e) => {
            return e.print_cover_side;
          })

          resolve({"status" : 200, "data" : data, "message" : "Print cover sides fetched successfully"});
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


  exports.fetchAllPrintCoverMachines = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let print_cover_machines = (await printCoverMachinesModel.findAll({attributes : ['print_cover_machine']}));
          console.log("print_cover_machines : ", print_cover_machines);
  
          let data = print_cover_machines.map((e) => {
            return e.print_cover_machine;
          })

          resolve({"status" : 200, "data" : data, "message" : "Print cover machines fetched successfully"});
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


  exports.fetchAllPrintCoverMaterials = async function (token) {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = jwt.decode(token);
        const user = await usersModel.findByPk(decoded.user_id);
  
        if(user){

          let print_cover_materials = (await printCoverMaterialsModel.findAll({attributes : ['print_cover_material']}));
          console.log("print_cover_materials : ", print_cover_materials);
  
          let data = print_cover_materials.map((e) => {
            return e.print_cover_material;
          })

          resolve({"status" : 200, "data" : data, "message" : "Print cover materials fetched successfully"});
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