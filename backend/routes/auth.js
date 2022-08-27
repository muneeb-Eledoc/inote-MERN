const express = require("express");
const router = express.Router();
const User = require("../models/User");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Harryisagoodboy";

router.post("/", async (req, res)=>{
    try{
        let success = false;
    let user = await User.findOne({email: req.body.email})
    if(user){
        success = false;
        return res.status(400).json({"error": "This email already exist!!"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email
    })
    const jwdata = {
        user:{
            id: user.id
        } 
    }
    const jwDataToken = jwt.sign(jwdata, JWT_SECRET); 
    success= true
    res.json({"success": success, "token": jwDataToken})
  }catch(err){
      console.log(err);
      res.status(500).send("Server error")
  }
});

router.post("/login", async (req, res)=>{
    try{
        let success = false;
        const {email, password} = req.body;
    let user = await User.findOne({email})

    if(!user){
        success = false;
        return res.status(400).json({"error": "Enter valid"})
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
    if(!passwordcompare){
        success = false;
        return res.status(400).json({"error": "Enter valid information"})
    }
    const jwdata = {
        user:{
            id: user.id
        } 
    }
    const jwDataToken = jwt.sign(jwdata, JWT_SECRET); 
    success = true
    res.json({"success": success, "token": jwDataToken})

  }catch(err){
      console.log(err);
      res.status(500).send("Server error")
  }
});

router.post("/getuser", fetchuser, async (req, res)=>{
   try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
   }catch(err){
      console.log(err);
      res.status(500).send("Server error")
  }
})
module.exports = router