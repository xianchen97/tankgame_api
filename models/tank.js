let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let tankSchema = new Schema({
    userID: String, 
    userScore: Number,
    badgeImgUrl: String
});

module.exports = mongoose.model('Tank', tankSchema);