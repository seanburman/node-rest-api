const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    userEmail: { type: String, default: null},
	title: { type: String, default: null},
    description: { type: String, default: null},
    price: { type: Number, default: null},
    quantity: { type: Number, default: null},
    key: { type: String, default: null},
})

module.exports = mongoose.model("Product", schema)