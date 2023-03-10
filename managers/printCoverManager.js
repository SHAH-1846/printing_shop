const usersModel = require('../db/models/users');
const printCoverOperatorsModel = require('../db/models/print_cover_operator');
const printCoverColorsModel = require('../db/models/print_cover_color');
const printCoverStatusModel = require('../db/models/print_cover_status');
const printCoverPrintersModel = require('../db/models/print_cover_printer');
const printCoverPaperTypesModel = require('../db/models/print_cover_paper_type');
const printCoverSidesModel = require('../db/models/print_cover_sides');
const jwt = require('jsonwebtoken');

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