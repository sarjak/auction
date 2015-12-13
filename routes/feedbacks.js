var express = require('express');
var router = express.Router();
var userSchema = require('../models/user');
var feedbackSchema = require('../models/feedback');
var nodemailer = require('nodemailer');

// Controller: List all Feedback
// URL: http://www.domain.com/feedback/
// Method: GET
// Paramaters: No parameters
// Returns: Object containing list of all the feedback in the database

router.get('/feedback',function(req,res,next){
	feedbackSchema.find({}, function(err, feedback){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(feedback);
		}
	});
});

// Controller: insert feedback
// URL: http://www.domain.com/user/givefeedback
// Mehod: POST
// Parameters: feedback details
// Returns: staus

router.post('/user/givefeedback', function(req,res,next) {
	
	var response_object;
	// Create new feedback Object
	var parameters = req.body;

	var feedback = new feedbackSchema(parameters);

	// Checks 
	var err = feedback.validateSync(); 
	if(err) {
		res.json(err);
	} else {
		feedback.save(function(err, feedback, numAffected) {
			if(err) {
				console.log(err);
				res.json(err);
			} else {
				console.log("success");
			}
		});	
	}
});

module.exports = router;