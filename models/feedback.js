// File: feedback.js
// Description: Model of feedback
// Author: Shubham Agrawal

var mongoose = require('mongoose');

var userSchema=require('../models/user');

var postSchema=require('../models/post');

var Schema = mongoose.Schema;

var feedbackSchema = new Schema({

	// id of the user
	user_id: {type:Schema.Types.ObjectId,ref:"UserSchema", required:true, unique:false},

	// id of the post
	post_id: {type:Schema.Types.ObjectId,ref:"PostSchema", required:true, unique:false},

	// date of the feedback
	feedback_date: {type:Date, required:true, unique:false},

	// description of the feedback
	feedback_description: {type:String, required:true, unique:false},

	// rating of the feedback
	feedback_rating: {type:Number, required:true, unique:false}

});

// Export Feedback Schema
module.exports=mongoose.model("FeedbackSchema",feedbackSchema);