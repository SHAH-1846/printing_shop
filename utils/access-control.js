const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const error_function = require('./response-handler').error_function;
const control_data = require('./control-data.json');
const userModel = require('../db/models/users');
const checkRevoked = require('../managers/logoutManager').checkRevoked;



exports.accessControl = async function (access_types, req, res, next) {
    try {
        //middleware to check JWT
        if (access_types == "*") {
            next();
        }
        else {
            const authHeader = req.headers['authorization'];
            const token = authHeader ? authHeader.split(' ')[1] : null;
            if (token == null || token == "null" || token == "" || token == "undefined") {
                let response = error_function({ "status": 401, "message": "Invalid Access Token" })
                res.status(401).send(response);
            }
            else {
                //verifying token
                jwt.verify(token, process.env.PRIVATE_KEY, async function (err, decoded) {
                    if (err) {
                        let response = error_function({ "status": 401, "message": err.message })
                        res.status(401).send(response);
                    }
                    else {
                        //checking access control
                        let allowed = (access_types.split(',')).map(obj => control_data[obj]); 
                        // console.log("allowed : (from access control) : ", allowed);
                        let user = await userModel.findOne({where : {id : decoded.user_id}});
                        // console.log("user : (from access control) : ", user);
                        let user_role = user.type;
                        // console.log("user_role : (from access control) : ", user_role);
                        if (allowed && allowed.includes(user_role)) {
                            //checking if the token is in revoked list
                            let revoked = await checkRevoked(token);
                            if (revoked === false) {
                                //token not in revoked list
                                next();
                            }
                            else if (revoked === true) {
                                //token is in revoked list
                                let response = error_function({ "status": 401, "message": "Revoked Access Token" })
                                res.status(401).send(response);
                            }
                            else {
                                let response = error_function({ "status": 400, "message": "Something Went Wrong" })
                                res.status(400).send(response);
                            }
                        }
                        else {
                            let response = error_function({ "status": 403, "message": "Not allowed to access the route" })
                            res.status(403).send(response);
                        }
                    }
                });
            }
        }
    }
    catch (error) {
        let response = error_function(error)
        res.status(400).send(response);
    }
}