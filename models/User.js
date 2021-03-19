const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	email: { type: String, required: true},
    username: { type: String, default: null},
    title: { type: String, default: null},
    description: { type: String, default: null},
    products: { type: Array, default: null}
})

module.exports = mongoose.model("User", schema)