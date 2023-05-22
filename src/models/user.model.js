const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: String,
  nickname: String,
  email: { type: String, required: true, unique: true },
  language: String,
  avatar: String,
  gifs: [{
    type: Schema.Types.ObjectId,
    ref: 'Gif'
  }],
}, {
  timestamps: true
})

const UserModel = model('User', UserSchema)

module.exports = UserModel