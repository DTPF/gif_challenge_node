const express = require('express')
const controller = require('../controllers/category.controller')
const md_auth = require('../middlewares/auth.middleware')
const api = express.Router()

api
  .post('/category', md_auth.ensureAuth, controller.postCategory)
  .delete('/category/:categoryId', md_auth.ensureAuth, controller.deleteCategory)
  .get('/full-categories', controller.getFullCategories)
  .get('/categories', controller.getCategories)
  .get('/categories-name', controller.getCategoriesName)
  .get('/category/:categoryId', controller.getCategoryById)
  .put('/category-image/:categoryId', md_auth.ensureAuth, controller.updateCategoryImage)

module.exports = api;