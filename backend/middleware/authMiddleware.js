const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

module.exports.authMiddleware = async(req,res,next) => {

     const {authToken} = req.cookies;
     // const authToken = false;
     //console.log(`req.cookies are ${JSON.stringify(req.cookies)}`)

     if(authToken){
          const deCodeToken = await jwt.verify(authToken, process.env.SECRET);
          req.myId = deCodeToken.id;
          next();
     }else{
          res.status(400).json({
               error:{
                    errorMessage: ['Please Login First']
               }
          })
     } 
}