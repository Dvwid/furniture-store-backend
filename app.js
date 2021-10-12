const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const productsRoute = require("./routes/products");
const recomendedRoute = require("./routes/recomended");
const brandsRoute = require("./routes/brands");
const categoriesRoute = require("./routes/categories");
const cors = require("cors");

mongoose.connect(process.env.DB_CONNECT, () => {
	console.log("DB CONNECTED");
});

app.use("/uploads", cors(), express.static("uploads"));
app.use(express.json());
app.use("/products", productsRoute);
app.use("/brands", cors(), brandsRoute);
app.use("/recomended", cors(), recomendedRoute);
app.use("/categories", cors(), categoriesRoute);
app.listen(3000, () => {
	console.log("Server is already running");
});
