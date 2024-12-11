const User = require ("../models/residence");
async function add(req, res)  {
    try {
        console.log(req.body)
        const user=new User(req.body);
        await user.save();
        res.status(200).json(user)
        console.log(user);
         } catch (err) {
        console.log(err);
     }
};
async function user (req,res){
    try{
      const user =await User.find();
        res.status(200).json(user);
    
    }catch(err){console.log(err);}
};
async function showbyid(req,res){
    try{
        const user = await  User.findById(req.params.id);
        res.status(200).json(user);
    
    }catch(err){console.log(err);}
};
async function showbyname(req,res){
    try{
        const user = await User.findOne({ username: req.params.username });
        res.status(200).json(user);
    
    }catch(err){console.log(err);}
};
async function updateuser(req,res){
    try{
        const user = await  User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(user);
    
    }catch(err){console.log(err);}
};
async function deleteuser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // Supprime l'utilisateur par son ID
        
        if (!user) {
            // Si l'utilisateur n'existe pas
            return res.status(404).json({ message: "User not found" });
        }

        // Réponse de succès si l'utilisateur a été supprimé
        res.status(200).json({ message: "User successfully deleted", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
};

module.exports={add , user ,showbyid ,showbyname ,updateuser,deleteuser };