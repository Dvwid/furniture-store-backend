const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
	try {
		const recomended = await Product.find({ recomended: true });
		res.json(recomended);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
