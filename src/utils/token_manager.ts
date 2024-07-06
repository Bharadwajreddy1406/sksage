import jwt from "jsonwebtoken";

export const createToken = (username:String,expiresIn)=>{

    const payload = {username};
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:expiresIn});

    return token;
}

