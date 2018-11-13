let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let tankSchema = new Schema({
    userID: String,
    userScore: Number
});

module.exports = mongoose.model('Tank', tankSchema);