import Joi from "joi";

//Sign Up Validation
export const signUpValidation = (req,res,next) => {
    const schema = Joi.object({
        name: Joi.string().max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
    });

    //Validate the Schema and store under an Error Variable
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message, success:false, error:true});
    }
    next();
}

//Login Validation
export const loginValidation = (req,res,next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
    });

    //Validate the Schema and store under an Error Variable
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message, success:false, error:true});
    }
    next();
}