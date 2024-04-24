const mongoose = require("mongoose")

const Schema = mongoose.Schema

const quoteSchema = new Schema ({
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  likes: []
}, { timestamps: true })

module.exports = mongoose.model("Quote", quoteSchema)