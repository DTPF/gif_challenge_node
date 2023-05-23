const express = require('express')
const controller = require('../controllers/gif.controller')
const md_auth = require('../middlewares/auth.middleware')
const api = express.Router()

api
  .post('/gif/:userId', md_auth.ensureAuth, controller.postGif)
  .get('/gif', controller.getGifs)
  .get('/gif/:gifId', controller.getGifById)
  .get('/gifs-by-user/:userId', md_auth.ensureAuth, controller.getGifsByUser)
  .delete('/gif/:gifId/:userId', md_auth.ensureAuth, controller.deleteGif)
  .put('/gif/:gifId', md_auth.ensureAuth, controller.updateGif)
  .put('/gif-image/:gifId', md_auth.ensureAuth, controller.updateGifImage)
  .put('/increment-shared-count/:gifId', controller.incrementSharedCount)

module.exports = api;