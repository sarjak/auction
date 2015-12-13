var express = require('express');
var router = express.Router();
var commentSchema = require('../models/comment');
var nodemailer = require('nodemailer');

// Controller: List all comment of particular post
// URL: http://www.domain.com/post/getcomment/:postid
// Method: GET
// Paramaters: post_id
// Returns: Object containing list of all the comment in the database

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
// URL: http://www.domain.com/post/comment/:commentid
// Mehod: GET
// Parameters: comment_id
// Returns: comment object if found in the database, else error.

router.get('/post/comment/:comment_id', function(req,res,next){
	
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


// Controller: insert comment
// URL: http://www.domain.com/post/comment
// Mehod: POST
// Parameters:comment details
// Returs: status

router.post('/post/comment', function(req,res,next) {
	
	var response_object;
	// Create new user Object
	var parameters = req.body;
	var comment = new commentSchema(parameters);

	// Checks 
	var err = comment.validateSync(); 
	if(err) {
		res.json(err);
	} else {
		comment.save(function(err, user, numAffected) {
			if(err) {
				console.log(err);
				res.json(err);
			} else {
					console.log("success");
			}
		});	
	}
});

// Controller: Delete comment
// URL: http://www.domain.com/post/deletecomment/<commentid>
// Mehod: DELETE
// Parameters: commentid
// Returns: "Successfully Deleted" message, else error message.

router.delete('/post/deletecomment/:comment_id',function(req,res,next){

	var response_obj;
	commentSchema.remove({_id:req.params.comment_id},function(err,result){
		if(err){
			console.log(err);
			res.json(err);
		}else{
			response_obj = { status : 1 , message : "comment Deleted"};
			res.json(response_obj);
		}
	});	
});

// Controller: Update a user information
// URL: http://www.domain.com/post/editcomment/<commentid>
// Method: POST
// Parameters: Attributes of comment.
// Returns: Status and Message

router.post('/post/editcomment/:comment_id', function(req, res, next){
	var response_obj;

	var query = commentSchema.where( {_id : req.params.comment_id} );

	query.findOneAndUpdate( { "$set" : req.body },
		function(err, coupon){
			if(err){
				console.log(err);
					response_obj={status:1, message:"Something went wrong"};
					res.send(response_obj);
			}
			else{
				if(coupon){
					response_obj={status:2, message:"comment Updated"};
					res.send(response_obj);
				}
				else{
					response_obj={status:3, message:"comment not found"};
					res.send(response_obj);
				}

			}
		});
});

module.exports = router;