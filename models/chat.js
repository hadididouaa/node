const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    msg:  String ,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);
