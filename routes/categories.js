const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
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

router.post("/", upload.single("categoryImage"), async (req, res) => {
	const category = new Category({
		name: req.body.name,
		categoryImage: req.file.path,
	});
	try {
		const savedCategory = await category.save();
		res.json(savedCategory);
		console.log(res, req);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get("/", async (req, res) => {
	try {
		const categories = await Category.find();
		res.json(categories);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
