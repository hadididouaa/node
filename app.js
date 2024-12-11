const express = require('express');
const bodyParser = require("body-parser");
const http = require('http');
const mongoose = require('mongoose'); // Assurez-vous d'avoir installé mongoose
const userRouter = require("./routes/users");
const residenceRouter = require("./routes/residences");
const joueurRouter = require("./routes/joueur");
const { addchat } = require("./controller/userController");


const db = require("./config/db.json");
const path = require ("path");
const { Socket } = require('socket.io');
const { affichersocket } = require('./controller/joueurController');
const {newpartiesocket}=require("./controller/joueurController")


// Connexion à MongoDB avec Mongoose
mongoose.connect(db.url)
    .then(console.log("Database connected"))
    .catch((err) => console.log(err));
    

// Initialisation de l'application Express
const app = express();
app.use(bodyParser.json());
app.set("views",path.join(__dirname,"views"))
app.set("view engine","twig");
// Middleware pour gérer les routes
app.use("/users", userRouter);
app.use("/residences", residenceRouter);
app.use("/user", joueurRouter);


// Création et démarrage du serveur
const server = http.createServer(app,console.log("server started"));

const io = require("socket.io")(server);
io.on("connection",(socket)=>{console.log("user is connected");///halit lflux
socket.emit("msg","user is connected")


socket.on("partie",(data)=>{
    console.log(JSON.stringify(data))
    newpartiesocket(data);
io.emit("partie",data);
})

socket.on("msgname",(data)=>{
    addchat(data);
    io.emit("msgname",data)});

    socket.on("partie",(data)=>{
        console.log(JSON.stringify(data))
        newpartiesocket(data);
    io.emit("partie",data);
    })
        
    socket.on("aff",async(data)=>{
       const datanew = await  affichersocket(data);
       
        io.emit("aff",datanew);});

 socket.on("istyping",(data)=>{
    console.log(data)
    socket.broadcast.emit("istyping",data);});
    
socket.on("disconnect", () => {
    console.log("User is disconnected");
    io.emit("msg","user is disconnected")
});

});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
module.exports = app ;
