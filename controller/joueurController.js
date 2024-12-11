const User = require("../models/joueur")
const Partie = require("../models/partie")

async function newjoueur(req, res) {
    try {
        console.log(req.body);

        // Assurez-vous que les champs santé et score sont toujours initialisés correctement
        const joueurData = {
            pseudo: req.body.pseudo, // Prend le pseudo de la requête
            sante: req.body.sante || 100, // Utilisez la valeur de req.body.sante si fournie, sinon 100
            score: req.body.score || 0    // Utilisez la valeur de req.body.score si fournie, sinon 0
        };

        const user = new User(joueurData); // Création du joueur
        await user.save();                // Sauvegarde dans la base de données
        res.status(200).json({
            message: `Le joueur a été ajouté avec succès : ${user.pseudo}`,
            joueur: user // Incluez les détails du joueur ajouté si nécessaire
        });      // Envoi de la réponse avec le joueur ajouté
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while adding the player" });
    }
};
async function getalljoueur (req,res){
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
async function attaque(req,res){
    try{
        const attaquant = await  User.findById(req.params.id1);
        const victime = await  User.findById(req.params.id2);
        const j1=attaquant.score+=10
       const j2= victime.sante-=20
       const joueur1=await User.findByIdAndUpdate(req.params.id1,{score:j1},{new:true,});
       const joueur2=await User.findByIdAndUpdate(req.params.id2,{sante:j2},{new:true,})
        res.send(joueur1+""+joueur2);
    
    }catch(err){console.log(err);}
    
};
async function newPartie(req, res) {
    try {
        console.log(req.body);

        // Assurez-vous que les champs santé et score sont toujours initialisés correctement
        const newpartie =new Partie ({
            nom: req.body.nom, // Prend le pseudo de la requête
            joueur_1: req.params.id1, // Utilisez la valeur de req.body.sante si fournie, sinon 100
            joueur_2: req.params.id2 ,
            etat:"en cours" // Utilisez la valeur de req.body.score si fournie, sinon 0
        });

       // Création du joueur
        await newpartie.save();                // Sauvegarde dans la base de données
        res.status(200).json(newpartie);      // Envoi de la réponse avec le joueur ajouté
       
    } catch (err) {
        console.log(err);
        
    }
};
async function newpartiesocket(data) {
    try {
        
        const partie = new Partie({
            nom: data.nompartie,
            joueur_1:data.id1,
            joueur_2:data.id2,
            etat: 'en cours' 
        });

        await partie.save();
       // res.status(200).json({
           // message: 'Partie créée avec succès',
          //  partie
       // });
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la création de la partie.");
    }
}


async function affichersocket(data) {
    try {
        const joueur1 = await User.findById(data.id1); // Utilisez User au lieu de Joueur
        const joueur2 = await User.findById(data.id2);

        // Retourne les joueurs
        return { j1: joueur1, j2: joueur2 };
    } catch (err) {
        console.log(err);
    }
}

async function getAllParties(req, res) {
    try {
        const parties = await Partie.find();
        res.status(200).json(parties);
    } catch (err) {
        console.error('Erreur lors de la récupération des parties:', err);
        res.status(500).send('Erreur lors de la récupération des parties.');
    }

};


module.exports = { newjoueur,getalljoueur,showbyid ,deleteuser,attaque,newPartie,newpartiesocket,affichersocket,getAllParties};
