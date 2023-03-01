const loginManager = require('../managers/loginManager');
const logoutManager = require('../managers/logoutManager');

const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const checkRevoked = require('../managers/logoutManager').checkRevoked;


exports.firstTimeLogin = function(req,res){
    let email = req.body.email;
    let otp = req.body.otp; //one time password

    loginManager.firstTimeLogin(email, otp)
    .then((result) => {
        let response = success_function(result);
        res.status(result.status).send(response);
    }).catch((error)=> {
        let response = error_function(error);
        res.status(error.status).send(response);
    })
}


exports.login = function(req, res)
{
    let email = req.body.email;
    let password = req.body.password;

    loginManager.login(email, password)
    .then((result)=>{
        let response = success_function(result);
        res.status(result.status).send(response);
    }).catch((error)=>{
        let response = error_function(error);
        res.status(error.status).send(response);
    });
}


exports.logout = async function(req, res)
{
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    // if (
    //     token == null ||
    //     token == "null" ||
    //     token == "" ||
    //     token == "undefined"
    //   ) {
    //     console.log()
    //     return res.status(406).send(success_function({status : 406, message : "Only login users can logout"}));
    //   }

    if(token){
    
              let isRevoked =  await checkRevoked(token);
              console.log("isRevoked : ", isRevoked);


    if(!isRevoked){


        logoutManager.revoke(token)
        .then((result)=>{
            let response = success_function(result);
            res.status(result.status).send(response);
        }).catch((error)=>{
            let response = error_function(error);
            res.status(error.status).send(response);
        });

    }else{
        console.log("Token already in revoked list");
        res.status(406).send(error_function({status : 406, message : "Token already in revoked list"}));
    }
}else{
    return res.status(406).send(success_function({status : 406, message : "Only login users can logout"}));
}

    }

    
