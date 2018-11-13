// BASE SETUP
// =============================================================================
let express    = require('express');     
let app        = express();                 
let bodyParser = require('body-parser');
let mongoose = require("mongoose");
let Tank = require('./models/tank')
app.use(bodyParser.urlencoded({ extended: true })); //Allows us to retrieve pata from POST requests

app.use(bodyParser.json());

mongoose.connect("mongodb://admin:Lacrimus1!@ds039778.mlab.com:39778/tankgame")

var port = process.env.PORT || 8080;        

// ROUTES FOR OUR API
// =============================================================================
let router = express.Router();      

//Handle requests for middle ware
router.use(function(req, res, next) {
    // do logging
    console.log('Received requests!');
    next(); // Continue to next route
});

//Base route
router.get('/', function(req, res) {
    res.json({ message: 'API is working!' });   
});     

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//ROUTE TO MAKE BEAR
router.route('/tanks')
    .post(function(req, res) {
        var tank = new Tank();      // create a new instance of the Bear model
        tank.userID = req.body.userID;
        tank.userScore = req.body.userScore;
        tank.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'A tank has been created!' });
        });
    });
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port: ' + port);

