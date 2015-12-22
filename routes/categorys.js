// File: categorys.js
// Description: Controller of category
// Author: Shubham Agrawal

var express = require('express');
var router = express.Router();
var categorySchema = require('../models/category');

// Controller: List all category
// URL: http://www.domain.com/category
// Method: GET
// Paramaters: No parameters
// Returns: Object containing list of all the category in the database

router.get('/',function(req,res,next){
	categorySchema.find({}, function(err, category){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(category);
		}
	});
});


// Controller: get particular category
// URL: http://www.domain.com/categorys/<categoryid>
// Method: POST
// Parameters:categoryid
// Returns: category Object.

router.post('/:categoryid', function(req, res, next){
	
	categorySchema.find({ _id : req.params.categoryid }, function(err, category){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(category);
		}
	});
});


// Controller: Add category
// URL: http://www.domain.com/categorys/add
// Mehod: POST
// Parameters: category details
// Returns: Object of category posted.

router.post('/add', function(req,res,next) {
	
	var response_object;
	// Create new category Object
	var parameters = req.body;

	var category = new categorySchema(parameters);

	// Checks 
	var err = category.validateSync(); 
	if(err) {
		res.json(err);
	} else {
		category.save(function(err, category, numAffected) {
			if(err) {
				console.log(err);
				res.json(err);
			} else {
				res.json(category);
			}
		});	
	}
});

// Controller: Delete category
// URL: http://www.domain.com/categorys/delete/<categoryid>
// Mehod: DELETE
// Parameters: categoryid
// Returns: "Successfully Deleted" message, else error message.

router.delete('/delete/:category_id',function(req,res,next){

	var response_obj;
	categorySchema.remove({_id:req.params.category_id},function(err,result){
		if(err){
			console.log(err);
			res.json(err);
		}else{
			response_obj = { status : 1 , message : "category Deleted"};
			res.json(response_obj);
		}
	});	
});


// Controller: Update the category information
// URL: http://www.domain.com/categorys/update/<categoryid>
// Method: POST
// Parameters: All Paramters except categoryid
// Returns: Updated category Object else error message.

router.post('/update/:categoryid', function(req, res, next){
	var response_obj;

	var query = categoryschema.where( {_id : req.params.categoryid} );

	query.findOneAndUpdate( { "$set" : req.body }, function(err, post){
		if(err){
			console.log(err);
			response_obj={status:1, message:"Something went wrong"};
			res.send(response_obj);
		}
		else{
			if(post){
				response_obj={status:2, message:"information Updated"};
				res.send(response_obj);
			}
			else{
				response_obj={status:3, message:"not found"};
				res.send(response_obj);
			}
		}
	});
});

module.exports = router;