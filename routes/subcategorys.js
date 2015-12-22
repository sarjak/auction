// File: subcategorys.js
// Description: Controller of subcategory
// Author: Shubham Agrawal

var express = require('express');
var router = express.Router();
var subcategorySchema = require('../models/subcategory');

// Controller: List all subcategory
// URL: http://www.domain.com/subcategory
// Method: GET
// Paramaters: No parameters
// Returns: Object containing list of all the subcategory in the database

router.get('/',function(req,res,next){
	subcategorySchema.find({}, function(err, subcategory){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(subcategory);
		}
	});
});


// Controller: get particular subcategory
// URL: http://www.domain.com/subcategorys/<subcategoryid>
// Method: POST
// Parameters:subcategoryid
// Returns: subcategory Object.

router.get('/:subcategoryid', function(req, res, next){
	
	subcategorySchema.find({ _id : req.params.subcategoryid }, function(err, subcategory){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(subcategory);
		}
	});
});


// Controller: get subcatgories of particular category
// URL: http://www.domain.com/subcategorys/category/<categoryid>
// Method: POST
// Parameters:subcategoryid
// Returns: subcategories.

router.get('/category/:categoryid', function(req, res, next){
	
	subcategorySchema.find({ category_id : req.params.categoryid }, function(err, subcategory){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(subcategory);
		}
	});
});

// Controller: Add subcategory
// URL: http://www.domain.com/subcategorys/add
// Mehod: POST
// Parameters: subcategory details
// Returns: Object of subcategory posted.

router.post('/add', function(req,res,next) {
	
	var response_object;
	// Create new subcategory Object
	var parameters = req.body;

	var subcategory = new subcategorySchema(parameters);

	// Checks 
	var err = subcategory.validateSync(); 
	if(err) {
		res.json(err);
	} else {
		subcategory.save(function(err, subcategory, numAffected) {
			if(err) {
				console.log(err);
				res.json(err);
			} else {
				res.json(subcategory);
			}
		});	
	}
});

// Controller: Delete subcategory
// URL: http://www.domain.com/subcategorys/delete/<subcategoryid>
// Mehod: DELETE
// Parameters: subcategoryid
// Returns: "Successfully Deleted" message, else error message.

router.delete('/delete/:subcategory_id',function(req,res,next){

	var response_obj;
	subcategorySchema.remove({_id:req.params.subcategory_id},function(err,result){
		if(err){
			console.log(err);
			res.json(err);
		}else{
			response_obj = { status : 1 , message : "subcategory Deleted"};
			res.json(response_obj);
		}
	});	
});


// Controller: Update the subcategory information
// URL: http://www.domain.com/subcategorys/update/<subcategoryid>
// Method: POST
// Parameters: All Paramters except subcategoryid
// Returns: Updated subcategory Object else error message.

router.post('/update/:subcategoryid', function(req, res, next){
	var response_obj;

	var query = subcategoryschema.where( {_id : req.params.subcategoryid} );

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