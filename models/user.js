// File: user.js
// Description: Model of User
// Author: Shubham Agrawal

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({

	// FName of the user
	user_name: {type:String, required:true, unique:false},

	// LName of the user
	username: {type:String, required:true, unique:true},

	// emailid of the user
	user_emailid: {type:String, required:true, unique:true},

	// password of the user
	user_pwd: {type:String, required:true, unique:false},

	// contact of the user
	user_contact: {type:Number, required:true, unique:false},

	// city of the user
	user_city: {type:String, required:true, unique:false},

	// state of the user
	user_state: {type:String, required:true, unique:false},

	// country of the user
	user_country: {type:String, required:true, unique:false},

	// URL of the image of the user
	image_URL: {type:String}

});

// Export User Schema
module.exports=mongoose.model("UserSchema",userSchema);