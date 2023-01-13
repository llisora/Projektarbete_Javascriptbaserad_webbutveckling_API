var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(
    bodyParser.urlencoded({
        extended: true
    })
)
router.use(bodyParser.json());


/********************************************* 
 * Initialize MongoDB database and connect
 *********************************************/
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/horses', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // Global use of mongoose

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) { // Add the listener for db events 
    console.log("Connected to db");

    // Create DB scheme model
    var horseSchema = mongoose.Schema({
        name: String,
        breed: String,
        age: String,
        owner: String
    });
    // Initiate scheme model
    var Horse = mongoose.model('Horse', horseSchema)

    /********************************************* 
     * Get complete server listing
     *********************************************/
    router.get('/', function (req, res, next) {
        Horse.find(function (err, horses) {
            if (err) return console.error(err);
            //save in varible
            var jsonObj = JSON.stringify(horses);
            res.contentType('application/json');
            res.send(jsonObj);
        });
    });

    /********************************************* 
   * Get horse with specific id
   *********************************************/
    router.get('/:id', function (req, res, next) {
        //saved id from url
        var id = req.params.id;

        Horse.findById({ "_id": id }, function (err, horses) {
            if (err) return console.error(err);
            //save in varible
            var jsonObj = JSON.stringify(horses);
            res.contentType('application/json');
            res.send(jsonObj);
        });
    });


    //Delete course with Id
    router.delete('/:id', function (req, res, next) {
        //saved id from url
        var id = req.params.id;

        // Delete horse _id from db
        Horse.deleteOne({ "_id": id }, function (err) {
            if (err) return handleError(err);

        });
        Horse.find(function (err, horses) {
            if (err) return console.error(err);
            //save in varible
            var jsonObj = JSON.stringify(horses);
            res.contentType('application/json');
            res.send(jsonObj);
        });
    });

    /*
     Add new course
    *********************************************/
    router.post('/', function (req, res, next) {
        // Create a new horse
        var horse1 = new Horse({
            name: req.body.name,
            breed: req.body.breed,
            age: req.body.age,
            owner: req.body.owner
        });
        console.log("test" + req.body.name);

        // Save new horse to db
        horse1.save(function (err) {
            if (err) return console.error(err);
        });

        var jsonObj = JSON.stringify(horse1);
        res.contentType('application/json');
        res.send(jsonObj);

    });

    router.put('/:id', function (req, res, next) {
        //saved id from url
        var id = req.params.id;
        //  create the horse and save the users input in it
        var horse1 = {
            name: req.body.name,
            age: req.body.age,
            breed: req.body.breed,
            owner: req.body.owner
        };
        //use "findByIdAndUpdate" to update horse
        Horse.findByIdAndUpdate(id, horse1,
            function (err) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({ message: "Horse updated" });
                }
            });
    });

}); // DB connection
module.exports = router;
