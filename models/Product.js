const mongoose = require("mongoose");
const Product = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	productImage: {
		type: String,
		required: true,
	},
	rating: {
		type: Array,
		required: false,
	},
	category: {
		type: String,
		required: true,
	},
	subcategory: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	promotion: {
		type: Number,
		required: false,
	},
	stock: {
		type: Number,
		required: true,
	},
	recomended: {
		type: Boolean,
		required: false,
	},
});

module.exports = mongoose.model("Product", Product);
