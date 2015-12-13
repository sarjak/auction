// File: subcategory.js
// Description: Model of subcategory
// Author: Shubham Agrawal

var mongoose = require('mongoose');

var categorySchema=require('../models/category');

var Schema = mongoose.Schema;

var subcategorySchema = new Schema({

	//Name of the subcategory
	subcat_name: {type:String, required:true, unique:false},

	//id of the category
	category_id: {type:Schema.Types.ObjectId,ref:"CategorySchema", required:true, unique:false}

});

// Export subcategory Schema
module.exports=mongoose.model("SubcategorySchema",subcategorySchema);