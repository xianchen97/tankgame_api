//Variable setup
let mongoose = require("mongoose");
let Schema = mongoose.Schema;


//Define mongodb structure
let tankSchema = new Schema({
    userID: String, 
    userScore: Number,
    badgeImgUrl: String
});

//Export tank model
module.exports = mongoose.model('Tank', tankSchema);