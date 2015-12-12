// File: posts.js
// Description: Controller for the model 'post'
// Author: Sarjak Gandhi

var express = require('express');
var router = express.Router();
var post_schema = require('../models/post');
var user = require('../models/user');

// Controller: List all Posts
// URL: http://www.domain.com/posts
// Method: GET
// Paramaters: No parameters
// Returns: Object containing list of all the posts in the database

router.get('/',function(req,res,next){
	post_schema.find({}, function(err, post){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(post);
		}
	});
});

// Controller: Insert a Post
// URL: http://www.domain.com/posts/add
// Method: POST
// Paramaters: user_sellerid, post_enddate, post_startprice, subcat_id, post_title, post_description
// Returns: Post Object else error message.

router.post('/add', function(req,res,next){
	var post = new post_schema(req.body);

	var err = post.validateSync(); 
	if(err){
		res.json(err);
	}
	else{
		post.save(function(err, posts, numAffected){
			if(err){
				res.json(err);
			}else{
				res.json(posts);
			}
		});
	}
});


// Controller: Update the Post information
// URL: http://www.domain.com/posts/update/<postid>
// Method: POST
// Parameters: All Paramters except postid
// Returns: Updated Post Object else error message.

router.post('/update/:postid', function(req, res, next){
	var response_obj;

	var query = post_schema.where( {_id : req.params.postid} );

	query.findOneAndUpdate( { "$set" : req.body }, function(err, post){
		if(err){
			console.log(err);
			response_obj={status:1, message:"Something went wrong"};
			res.send(response_obj);
		}
		else{
			if(post){
				response_obj={status:2, message:"User information Updated"};
				res.send(response_obj);
			}
			else{
				response_obj={status:3, message:"user not found"};
				res.send(response_obj);
			}
		}
	});
});


// Controller: Delete Post
// Description: Deletes the Post
// URL: http://www.domain.com/posts/delete/<postid>
// Mehod: DELETE
// Parameters: postid
// Returns: "Successfully Deleted" message, else error message.

router.delete('/delete/:postid',function(req,res,next){

	var response_obj;
	post_schema.remove({'_id':req.params.postid},function(err,result){
		if(err){
			console.log(err);
			res.json(err);
		}else{
			response_obj = { status : 1 , message : "User Deleted"};
			res.json(response_obj);
		}
	});	
});


// Controller: Search for the post based on the string
// URL: http://www.domain.com/posts/search/<search_string>
// Method: POST
// Parameters: search_string
// Returns: Search for a post

router.get('/search/:search_string', function(req, res, next){
	var response_obj;

	var re = new RegExp(req.params.search_string, 'i');

	post_schema.find().or([{ 'post_title': { $regex: re }}, { 'post_description': { $regex: re }}]).exec(function(err, posts) {
    	res.json(posts);
	});
});


module.exports = router;