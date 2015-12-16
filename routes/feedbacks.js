// File: feedbacks.js
// Description: Controller of Comment Feedback
// Author: Shubham Agrawal
// Edited By: Sarjak Gandhi

var express = require('express');
var router = express.Router();
var userSchema = require('../models/user');
var feedbackSchema = require('../models/feedback');

// Controller: List all Feedback
// URL: http://www.domain.com/feedbacks
// Method: GET
// Paramaters: No parameters
// Returns: Object containing list of all the feedbacks in the database

router.get('/',function(req,res,next){
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

// Controller: Add feedback
// URL: http://www.domain.com/feedbacks/add
// Mehod: POST
// Parameters: feedback details
// Returns: Object of Feedback posted.

router.post('/add', function(req,res,next) {
	
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
				res.json(feedback);
			}
		});	
	}
});

// Controller: Delete Feedback
// URL: http://www.domain.com/feedabacks/delete/<feedbackid>
// Mehod: DELETE
// Parameters: feedbackid
// Returns: "Successfully Deleted" message, else error message.

router.delete('/delete/:feedback_id',function(req,res,next){

	var response_obj;
	feedbackSchema.remove({_id:req.params.feedback_id},function(err,result){
		if(err){
			console.log(err);
			res.json(err);
		}else{
			response_obj = { status : 1 , message : "Feedback Deleted"};
			res.json(response_obj);
		}
	});	
});


module.exports = router;