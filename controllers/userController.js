const userManager = require('../managers/userManager');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;


exports.createUser = function(req, res)
{
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let role = req.body.role;
    let password = req.body.password;

    userManager.createUser(name, email, phone, role, password)
    .then((result)=>{
        let response = success_function(result);
        res.status(result.status).send(response);
    }).catch((error)=>{
        let response = error_function(error);
        res.status(error.status).send(response);
    });
}