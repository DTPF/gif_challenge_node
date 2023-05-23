const { Schema, model } = require('mongoose')

const GifSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: String,
  externalImageUrl: String,
  imagePublicId: String,
  timesShared: Number,
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
})

const GifModel = model('Gif', GifSchema)

module.exports = GifModel