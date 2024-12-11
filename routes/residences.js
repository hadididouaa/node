const express = require("express");
const router =express.Router();
const validateresidence = require("../middll/validateresidence.js");
const userController = require("../controller/residence.Controller");
router.get("/show",(req,res)=>{res.send("salut twin9");});
router.get("/add/:username/:email/:cin",(req,res)=>{new User({
    username:req.params.username,
    email:req.params.email,
    cin:req.params.cin
}).save();
    res.send("good added");});

router.post("/addresidence",validateresidence,userController.add);
router.get("showresidence/",userController.user);
router.get("/showbyidresidence/:id",userController.showbyid);
router.get("/showUsernameresidence/:username",userController.showbyname);
router.get("/updateresidence/:id",userController.updateuser);
router.get("/deleteresidence/:id",userController.deleteuser);
module.exports = router ;