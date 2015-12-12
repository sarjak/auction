// File: feedbacks.js
// Description: Controller for the model 'feedback'
// Author: Sarjak Gandhi

var express = require('express');
var router = express.Router();
var feedback_schema = require('../models/feedback');
var user = require('../models/user');

// Controller: List all Feedbacks
// URL: http://www.domain.com/feedbacks
// Method: GET
// Paramaters: No parameters
// Returns: Object containing list of all the feedbacks in the database

router.get('/',function(req,res,next){
	feedback_schema.find({}, function(err, feedback){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(feedback);
		}
	});
});


// Controller: Post Feedback
// URL: http://www.domain.com/feedbacks/postfeedback
// Method: POST
// Paramaters: user_id, feedback_description, feedback_rating
// Returns: Posted Feedback Object else error message.

router.post('/postfeedback', function(req,res,next){
	var feedback = new feedback_schema(req.body);

	var err = feedback.validateSync(); 
	if(err){
		res.json(err);
	}
	else{
		feedback.save(function(err, feed, numAffected){
			if(err){
				res.json(err);
			}else{
				res.json(feed);
			}
		});
	}
});
	