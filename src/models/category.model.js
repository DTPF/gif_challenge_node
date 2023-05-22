const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
  name: { type: String, required: true },
  imageUrl: String,
  imagePublicId: String,
  gifsCount: Number,
  gifs: [{
    type: Schema.Types.ObjectId,
    ref: 'Gif'
  }],
}, {
  timestamps: true
})

const CategoryModel = model('Category', CategorySchema)

module.exports = CategoryModel