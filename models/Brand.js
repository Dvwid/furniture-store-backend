const mongoose = require("mongoose");
const Brand = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	brandImage: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Brand", Brand);
