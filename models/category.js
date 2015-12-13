// File: category.js
// Description: Model of category
// Author: Shubham Agrawal

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({

	//Name of the category
	cat_name: {type:String, required:true, unique:false}

});

// Export category Schema
module.exports=mongoose.model("CategorySchema",categorySchema);