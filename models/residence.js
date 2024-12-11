const mongoose = require('mongoose');
// Define the schema
const Schema = mongoose.Schema; // Use Schema with a capital S
const ResidenceSchema = new Schema(
    {
        name:  String,
        surface:  Number,
        status:  Boolean 
    }
);

// Export the model
module.exports = mongoose.model('residence', ResidenceSchema);
