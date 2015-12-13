// File: notification.js
// Description: Model of notification
// Author: Shubham Agrawal

var mongoose = require('mongoose');

var userSchema=require('../models/user');

var commentSchema=require('../models/comment');

var Schema = mongoose.Schema;

var notificationSchema = new Schema({

	// id of the user
	user_id: {type:Schema.Types.ObjectId,ref:"UserSchema", required:true, unique:false},

	// id of the comment
	comment_id: {type:Schema.Types.ObjectId,ref:"CommentSchema", required:true, unique:false}

});

// Export notification Schema
module.exports=mongoose.model("NotificationSchema",notificationSchema);