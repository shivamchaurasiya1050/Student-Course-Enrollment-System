const jwt = require("jsonwebtoken")

exports.generateToken=(payload)=>{
    try {
        return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
    } catch (error) {
        console.log(error)
    }
}