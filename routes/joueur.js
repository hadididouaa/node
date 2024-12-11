const express = require("express");
const router =express.Router();

const joueurController = require("../controller/joueurController");
router.get("/show",(req,res)=>{res.send("salut twin9");});
router.get("/add/:username/:email/:cin",(req,res)=>{new User({
    username:req.params.username,
    email:req.params.email,
    cin:req.params.cin
}).save();
    res.send("good added");});

router.post("/newjoueur",joueurController.newjoueur);
router.get("/getalljoueur/",joueurController.getalljoueur);
router.get("/getjoueur/:id",joueurController.showbyid);
router.delete("/deletejoueur/:id",joueurController.deleteuser);
router.put("/attaque/:id1/:id2", joueurController.attaque);
router.post("/newpartie/:id1/:id2", joueurController.newPartie);
router.get("/partie",(req,res)=>{res.render("partie");});
//router.get("/showUsernameresidence/:username",userController.showbyname);
//router.get("/updateresidence/:id",userController.updateuser);

module.exports = router ;