// File: bid.js
// Description: Model of bid
// Author: Shubham Agrawal

var mongoose = require('mongoose');

var userSchema=require('../models/user');

var postSchema=require('../models/post');

var Schema = mongoose.Schema;

var bidSchema = new Schema({

	// id of the user
	user_id: {type:Schema.Types.ObjectId,ref:"UserSchema", required:true, unique:false},

	// date of bid
	bid_date: {type:Date, requireD:true, unique:false},

	//proce of bid
	bid_price: {type:Number, required:true, unique:false}

});

// Export bid Schema
module.exports=mongoose.model("BidSchema",bidSchema);
