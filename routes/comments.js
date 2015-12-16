// File: comments.js
// Description: Controller of Comment Model
// Author: Shubham Agrawal
// Edited By: Sarjak Gandhi

var express = require('express');
var router = express.Router();
var commentSchema = require('../models/comment');
var nodemailer = require('nodemailer');


// Controller: List all comments in the database
// URL: http://www.domain.com/comments
// Method: GET
// Paramaters: NO Paramters
// Returns: Object containing list of all the comments in the database

router.get('/',function(req,res,next){
	commentSchema.find({}, function(err, comment){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(comment);
		}
	});
});

// Controller: List all comment of particular post
// URL: http://www.domain.com/comments/getcomment/:postid
// Method: GET
// Paramaters: post_id
// Returns: Object containing list of all the comment on given postid

router.get('/getcomment/:post_id',function(req,res,next){
	commentSchema.find({ post_id : req.params.post_id }, function(err, comment){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(comment);
		}
	});
});

// Controller: Return Specific comment
// URL: http://www.domain.com/comments/:commentid
// Mehod: GET
// Parameters: comment_id
// Returns: Comment object if found in the database, else error.

router.get('/:comment_id', function(req,res,next){
	commentSchema.find({ _id : req.params.comment_id }, function(err,comment){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(comment);
		}
	});
});


// Controller: Add comment
// URL: http://www.domain.com/comments/add
// Mehod: POST
// Parameters: comment details
// Returs: status

router.post('/add', function(req,res,next) {
	
	var response_object;
	// Create new user Object
	var parameters = req.body;
	var comment = new commentSchema(parameters);

	// Checks 
	var err = comment.validateSync(); 
	if(err) {
		res.json(err);
	} else {
		comment.save(function(err, cmnt, numAffected) {
			if(err) {
				console.log(err);
				res.json(err);
			} else {
				res.json(cmnt);
			}
		});	
	}
});

// Controller: Delete comment
// URL: http://www.domain.com/comments/delete/<commentid>
// Mehod: DELETE
// Parameters: commentid
// Returns: "Successfully Deleted" message, else error message.

router.delete('/delete/:comment_id',function(req,res,next){

	var response_obj;
	commentSchema.remove({_id:req.params.comment_id},function(err,result){
		if(err){
			console.log(err);
			res.json(err);
		}else{
			response_obj = { status : 1 , message : "Comment Deleted"};
			res.json(response_obj);
		}
	});	
});

// Controller: Update a comment
// URL: http://www.domain.com/comments/edit/<commentid>
// Method: POST
// Parameters: Attributes of comment.
// Returns: Status and Message

router.post('/edit/:comment_id', function(req, res, next){
	var response_obj;

	var query = commentSchema.where( {_id : req.params.comment_id} );

	query.findOneAndUpdate( { "$set" : req.body },
		function(err, cmnt){
			if(err){
				console.log(err);
					response_obj={status:1, message:"Something went wrong"};
					res.send(response_obj);
			}
			else{
				if(cmnt){
					response_obj={status:2, message:"Comment Updated"};
					res.send(response_obj);
				}
				else{
					response_obj={status:3, message:"Comment Not Found"};
					res.send(response_obj);
				}

			}
		});
});

module.exports = router;