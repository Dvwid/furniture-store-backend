const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(
			null,
			new Date().toLocaleDateString().split(".").join("") +
				new Date().toLocaleTimeString().split(":").join("") +
				file.originalname
		);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 5 },
	fileFilter: fileFilter,
});

router.post("/", upload.single("productImage"), async (req, res) => {
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path,
		rating: req.body.rating,
		category: req.body.category,
		subcategory: req.body.subcategory,
		description: req.body.description,
		brand: req.body.brand,
		promotion: req.body.promotion,
		stock: req.body.stock,
		recomended: req.body.recomended,
	});
	try {
		const savedProduct = await product.save();
		res.json(savedProduct);
		console.log(res, req);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get("/", async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get("/:productId", async (req, res) => {
	try {
		const product = await Product.findById(req.params.productId);
		res.json(product);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
