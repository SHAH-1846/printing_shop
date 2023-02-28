const userManager = require('../managers/userManager');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;


exports.createUser = function(req, res)
{
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let image = req.body.image;
    let phone = req.body.phone;
    let role = req.body.role;
    let department = req.body.department;
    let section = req.body.section;
    let branch = req.body.branch;
    
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];



    userManager.createUser(first_name, last_name, email, image, phone, role,department, section, branch)
    .then((result)=>{
        let response = success_function(result);
        res.status(result.status).send(response);
    }).catch((error)=>{
        let response = error_function(error);
        res.status(error.status).send(response);
    });
}


exports.forgotPasswordController = function(req, res)
    {
        let email = req.body.email;
    
        userManager.forgotPassword(email)
        .then((result)=>{
            let response = success_function(result)
            res.status(result.status).send(response);
        }).catch((error)=>{
            let response = error_function(error)
            res.status(error.status).send(response);
        });
    }


    exports.resetPasswordController = function(req, res)
{
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    let password = req.body.password;

    userManager.passwordReset(token, password)
    .then((result)=>{
        let response = success_function(result);
        res.status(result.status).send(response);
    }).catch((error)=>{
        let response = error_function(error)
        res.status(error.status).send(response);
    });
}