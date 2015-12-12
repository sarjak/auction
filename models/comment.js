// File: comment.js
// Description: Model of comment
// Author: Shubham Agrawal

var mongoose = require('mongoose');

var userSchema=require('../models/user');

var postSchema=require('../models/post');

var Schema = mongoose.Schema;

var commentSchema = new Schema({

	// id of the user
	user_id: {type:Schema.Types.ObjectId,ref:"UserSchema", required:true, unique:false};

	// id of the post
	post_id: {type:Schema.Types.ObjectId,ref:"PostSchema", required:true, unique:false};

	// date of the comment
	comment_date: {type:Date, required:true, unique:false};

	// description of the comment
	comment_description: {type:String, required:true, unique:false};

});

// Export Comment Schema
modules.exports=mongoose.model("CommentSchema",commentSchema);