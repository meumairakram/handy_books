
const Config = require('../config/config').get(process.env);
const jwt = require('jsonwebtoken');
const {User} = require('../models/user');



const auth = (req,res,next) => {
    
    var document = null;
    let token = req.cookies.token;
    if(token == undefined) {
        document = false;
        next();
    } else {
        
        User.findByToken(token,(err,doc) => {
            // console.log(doc);
            if(!doc) {
                document = false;
            } else {
                jwt.verify(token, Config.SECRET,(err,decoded) => {
                    // console.log(doc.email);
                    if(decoded.email == doc.email) {
                        document = doc;
                    } else {
                        document = false;
                    }
                });
    
            }

            req.user = document;
            next();
            
            

        })
    } 


}

module.exports = auth;