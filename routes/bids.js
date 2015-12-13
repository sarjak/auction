var express = require('express');
var router = express.Router();
var bidSchema = require('../models/bid');
var nodemailer = require('nodemailer');

// Controller: List all bid of post
// URL: http://www.domain.com/post/:post_id
// Method: GET
// Paramaters: post_id
// Returns: Object containing list of all the users in the database

router.get('/post/:post_id',function(req,res,next){
	bidSchema.find({post_id:req.p.post_id}, function(err, bid){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(bid);
		}
	});
});

// Controller: Return Specific bid
// URL: http://www.domain.com/post/bid/:bid_id
// Mehod: GET
// Parameters: No parameters
// Returns: User object if found in the database, else error.

router.get('/post/bid/:bid_id', function(req,res,next){
	
	userSchema.find({ _id : req.params.bid_id }, function(err, bid){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(bid);
		}
	});
});

// Controller: insert bid
// URL: http://www.domain.com/post/bid
// Mehod: POST
// Parameters: bid details
// Returs: status and message

router.post('/post/bid',function(req,res,next) {
	
	var response_object;
	// Create new user Object
	var parameters = req.body;
	var bid = new bidSchema(parameters);

	// Checks 
	var err = bid.validateSync(); 
	if(err) {
		res.json(err);
	} else {
		bid.save(function(err, bid, numAffected) {
			if(err) {
				console.log(err);
				res.json(err);
			} else {
					console.log("Success");
			}
		});	
	}
});

// Controller: Delete bid
// URL: http://www.domain.com/post/deletebid/<bid_id>
// Mehod: DELETE
// Parameters: bid_id
// Returns: "Successfully Deleted" message, else error message.

router.delete('/post/deletebid/:bid_id',function(req,res,next){

	var response_obj;
	bidSchema.remove({'_id':req.params.bid_id},function(err,result){
		if(err){
			console.log(err);
			res.json(err);
		}else{
			response_obj = { status : 1 , message : "bid Deleted"};
			res.json(response_obj);
		}
	});	
});

// Controller: Update a user information
// URL: http://www.domain.com/post/editbid/<bid_id>
// Method: POST
// Parameters: Attributes of bid.
// Returns: Status and Message

router.post('/post/editbid/:bid_id', function(req, res, next){
	var response_obj;

	var query = bidSchema.where( {_id : req.params.bid_id} );

	query.findOneAndUpdate( { "$set" : req.body },
		function(err, coupon){
			if(err){
				console.log(err);
					response_obj={status:1, message:"Something went wrong"};
					res.send(response_obj);
			}
			else{
				if(coupon){
					response_obj={status:2, message:"bid Updated"};
					res.send(response_obj);
				}
				else{
					response_obj={status:3, message:"bid not found"};
					res.send(response_obj);
				}

			}
		});
});


module.exports = router;
