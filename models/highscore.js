//Variable setup
let mongoose = require("mongoose");
let Schema = mongoose.Schema;


//Define mongodb structure
let highscoreSchema = new Schema({
    topScore: Number, 
    topUser: String,
});

//Export tank model
module.exports = mongoose.model('highscore', highscoreSchema);