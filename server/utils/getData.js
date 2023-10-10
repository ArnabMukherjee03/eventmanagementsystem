const jwt = require('jsonwebtoken');

exports.getDataFromToken = (req)=>{
    try {
        const token = req.cookies.jwt || '';
       
        if(!token){
            throw new Error("Login Required")
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message)
    }
}