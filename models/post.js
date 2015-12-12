// File: post.js
// Description: Model of Post
// Author: Shubham Agrawal

var mongoose = require('mongoose');

var userSchema=require('../models/user');

var subcategorySchema=require('../models/subcategory');

var Schema = mongoose.Schema;

var postSchema = new Schema({

	// id of the seller user
	user_sellerid: {type:Schema.Types.ObjectId,ref:"UserSchema", required:true, unique:false};

	// id of the buyer user
	user_buyerid: {type:Schema.Types.ObjectId,ref:"UserSchema", required:true, unique:false};

	// date of the post
	post_date: {type:Date, required:true, unique:false};

	// end date of the post
	post_enddate: {type:Date, requireD:true, unique:false};

	// start price of the post
	post_startprice: {type:Number, required:true, unique:false};

	// end price of the post
	post_endprice: {type:Number, required:true, unique:false};

	// subcategory of the post
	subcat_id: {type:Schema.Types.ObjectId,ref:"SubcategorySchema", required:true, unique:false};

	// URL of the image of the post
	image_URL: {type:String};

	// title of the post
	post_title: {type:String, required:true, unique:false};

	// description of the post
	post_description: {type:String, required:true, unique:false};

});

// Export Post Schema
modules.exports=mongoose.model("PostSchema",postSchema);