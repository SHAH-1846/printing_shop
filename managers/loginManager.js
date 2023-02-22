const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const Cryptr = require('cryptr');
const userModel = require('../db/models/Users');

exports.login = async function (email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            if (email && password) {
                let user = await userModel.findOne({ where: { email : email } });
                // console.log("User : ", user);
                if (user) {
                    //verifying password
                    bcrypt.compare(password, user.password, async (error, auth) => {
                        if (auth === true) {
                            //valid credentials
                            //saving last login
                            let access_token = jwt.sign({ "user_id": user.id}, process.env.PRIVATE_KEY, { expiresIn: '10d' });
                            resolve({ "status": 200, "data": access_token, "message": "Login Successful" });
                        }
                        else {
                            reject({ "status": 401, "message": "Invalid Credentials" });
                        }
                    });
                }
                else {
                    reject({ "status": 401, "message": "Invalid Credentials" });
                }
            }
            else {
                if (!email) reject({ "status": 422, "message": "Email is required" });
                if (!password) reject({ "status": 422, "message": "Password is required" });
            }
        }
        catch (error) {
            reject({ "status": 400, "message": error.message ? error.message : error });
        }
    });
}
