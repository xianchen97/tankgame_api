/**
=============================================================================
Variable set up
=============================================================================
*/
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let Tank = require("./models/tank");
let port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true })); //Allows us to retrieve pata from POST requests
app.use(bodyParser.json());

mongoose.connect("mongodb://admin:Lacrimus1!@ds039778.mlab.com:39778/tankgame");

/**
 * API ROUTING
 */
let router = express.Router();

//Handle requests for middle ware
router.use(function(req, res, next) {
  console.log("Received requests!");
  next(); // Continue to next route
});

//Base route
router.get("/", function(req, res) {
  res.json({ message: "API is working!" });
});

/**
 * ======================================================================
 * ROUTES
 * ======================================================================
 */

 //Prefixed with /api
app.use("/api", router);

//Prefixed with /api/tanks 
router.route("/tanks")

  //POST method 
  .post(function(req, res) {
    var tank = new Tank(); // create a new instance of the Tank
    tank.userID = req.body.userID;
    tank.userScore = req.body.userScore;
    tank.badgeImgUrl = req.body.badgeImgUrl;
    tank.save(function(err) {
      if (err) res.send(err);
      res.json(tank + "\n has been created!");
    });
  })
  
  //GET method
  .get(function(req, res) {
    Tank.find(function(err, tanks) {
      if (err) res.send(err);
      res.json(tanks);
    });
  });

//Prefixed with /api/tanks/:userID
router.route("/tanks/:userID")

  .get(function(req, res) {
    Tank.findById(req.params.userID, function(err, tank) {
      if (err) res.send(err);
      res.json(tank);
    });
  })

  //PUT request, updates tank based on ID
  .put(function(req, res) {
    Tank.findOne({userID: req.params.userID}, function(err, tank) {
      if (err){
        res.send(err);
      }
      tank.userID = req.body.userID;
      tank.userScore = req.body.userScore 
      tank.badgeImgUrl = req.body.badgeImgUrl;

      tank.save(function(err) {
        if (err)
         res.send(err);
        res.json({ message: "Tank updated!" + "\n" + tank });
      });
    });
  })

  //Delete request, deletes tank based on ID
  .delete(function(req, res) {
    Tank.findOneAndDelete({
        userID: req.params.userID
    }, function(err, tank) {
        if (err)
            res.send(err);

        res.json({message:  "Deleted!" + tank});
    });
});

/**
 * =================================================================
 * Server
 * =================================================================
 */
app.listen(port);
console.log("Listening on port: " + port);
