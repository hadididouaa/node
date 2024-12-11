const mongoose = require('mongoose');
// Define the schema
const Schema = mongoose.Schema; // Use Schema with a capital S
const PartieSchema = new Schema(
    {
        nom:  String,
        joueur_1 :  String,
        joueur_2:  String,
        etat:  String,
        
    }
);

// Export the model
module.exports = mongoose.model('Partie', PartieSchema);
