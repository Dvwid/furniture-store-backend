const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");
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

router.post("/", upload.single("brandImage"), async (req, res) => {
	const brand = new Brand({
		name: req.body.name,
		brandImage: req.file.path,
	});
	try {
		const savedBrand = await brand.save();
		res.json(savedBrand);
		console.log(res, req);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get("/", async (req, res) => {
	try {
		const brands = await Brand.find();
		res.json(brands);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
