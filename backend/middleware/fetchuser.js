const jwt = require('jsonwebtoken');
const JWT_SECRET = "Harryisagoodboy";

const fetchuser = (req, res, next)=>{
  const token = req.header("auth-token")
  if(!token){
      res.status.send({error:"Please authenticate using valid token"})
  }
  try{
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      next()
  }catch(e){
    res.status(401).send({error:"Please authenticate using valid token"})
  }
}

module.exports = fetchuser;