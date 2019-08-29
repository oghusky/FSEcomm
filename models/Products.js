const faker = require("faker");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    description: String
});
module.exports = mongoose.model("Products", productSchema);
