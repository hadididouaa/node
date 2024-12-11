const mongoose = require('mongoose');

// Define the schema
const Schema = mongoose.Schema;

const JoueurSchema = new Schema(
    {
        pseudo: { type: String, required: true }, // pseudo est obligatoire
        sante: { type: Number, default: 100 },   // santé initialisée à 100
        score: { type: Number, default: 0 }      // score initialisé à 0
    }
);

// Export the model
module.exports = mongoose.model('Joueur', JoueurSchema);
