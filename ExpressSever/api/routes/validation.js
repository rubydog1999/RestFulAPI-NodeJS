const Joi = require('joi');

//npm install @hapi/joi
//Register validation
const RegisterValidation = data =>{
const schema=Joi.object({  
    firstname : Joi.string().min(6).required(),
    lastname: Joi.string().min(6).required(),
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required()
});
    return schema.validate(data);
};
const LoginValidation = data =>{
    const schema=Joi.object({  
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    });
        return schema.validate(data);
    };
module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;