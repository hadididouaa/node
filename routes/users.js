const express = require("express");
const router =express.Router();
const validate = require("../middll/validate");
const userController = require("../controller/userController");
router.get("/show",(req,res)=>{res.send("salut twin9");});
router.get("/add/:username/:email/:cin",(req,res)=>{new User({
    username:req.params.username,
    email:req.params.email,
    cin:req.params.cin
}).save();
    res.send("good added");});

router.post("/add",validate,userController.add);
router.get("/user",userController.user);
router.get("/showbyid/:id",userController.showbyid);
router.get("/showUsername/:username",userController.showbyname);
router.get("/update/:id",userController.updateuser);
router.get("/delete/:id",userController.deleteuser);
router.get("/chat",(req,res)=>{res.render("chat");});
module.exports = router ;