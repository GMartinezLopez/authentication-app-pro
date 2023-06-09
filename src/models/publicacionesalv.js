const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: Object,
    required: true,
  },
})

module.exports = mongoose.model('Blog', BlogSchema)
