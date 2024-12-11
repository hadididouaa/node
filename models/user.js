const mongoose = require('mongoose');

// Define the schema
const Schema = mongoose.Schema; // Use Schema with a capital S
const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        cin: { type: Number, required: true },
    }
);

// Export the model
module.exports = mongoose.model('User', UserSchema);
