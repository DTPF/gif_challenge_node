const db = require('../models')
const fs = require('fs-extra')
const { uploadImage, removeMedia } = require('../utils/cloudinary')
const { makeResponse, response500 } = require('../utils/makeResponse')
const cloudinaryConfig = require('../config/config').cloudinary

async function postCategory(req, res) {
	const { name } = req.body
	if (!name) {
		return makeResponse(res, 404, 'Name is required')
	}
	const newCategory = new db.Category({ name })
	try {
		const category = await newCategory.save()
		return makeResponse(res, 200, 'Category created successful', category)
	} catch (err) {
		if (err.code === 11000) {
			return makeResponse(res, 501, 'Category exists')
		}
		return response500()
	}
}

async function getCategories(req, res) {
	try {
		const categoriesStored = await db.Category.aggregate([{
			$project: {
				_id: 1,
				name: 1,
				imageUrl: 1,
				createdAt: 1,
			}
		}])
		return makeResponse(res, 200, null, categoriesStored)
	} catch (err) {
		return response500(err)
	}
}

async function getCategoriesName(req, res) {
	try {
		const categoriesStored = await db.Category.aggregate([{
			$project: {
				_id: 1,
				name: 1,
			}
		}])
		return makeResponse(res, 200, null, categoriesStored)
	} catch (err) {
		return response500(err)
	}
}

async function getFullCategories(req, res) {
	try {
		const categoriesStored = await db.Category.find().populate('gifs').lean().exec()
		return makeResponse(res, 200, null, categoriesStored)
	} catch (err) {
		return response500(err)
	}
}

async function getCategoryById(req, res) {
	const { categoryId } = req.params
	try {
		const categoryStored = await db.Category.findOne({ _id: categoryId }).populate('gifs').populate('gifs.user').lean().exec()
		if (!categoryStored) {
			return makeResponse(res, 400, 'Not exist')
		}
		return makeResponse(res, 200, 'Get category successful', categoryStored)
	} catch (err) {
		return response500(err)
	}
}

async function deleteCategory(req, res) {
	const { categoryId } = req.params
	try {
		const findCategory = await db.Category.findOne({ _id: categoryId }).lean().exec()
		if (!findCategory) {
			return makeResponse(res, 404, 'Not exist')
		}
		if (findCategory.imagePublicId) await removeMedia(findCategory.imagePublicId, 'image')
		await db.Category.findOneAndDelete({ _id: categoryId }).exec()
		return makeResponse(res, 200)
	} catch (err) {
		return response500(err)
	}
}

async function updateCategoryImage(req, res) {
	const { categoryId } = req.params
	if (!req.files) {
		return makeResponse(res, 404, 'File is required')
	}
	try {
		const findCategory = await db.Category.findOne({ _id: categoryId }).lean().exec()
		if (!findCategory) {
			return makeResponse(res, 404, 'Not exist')
		}
		if (findCategory.imagePublicId) await removeMedia(findCategory.imagePublicId, 'image')
		const imageUploaded = await uploadImage(req.files.image.tempFilePath, `${cloudinaryConfig.folder}/categoryImages`)
		const categoryStored = await db.Category.findOneAndUpdate(
			{ _id: categoryId },
			{
				imageUrl: imageUploaded.secure_url,
				imagePublicId: imageUploaded.public_id
			},
			{ returnOriginal: false }
		).lean().exec()
		await fs.unlink(req.files.image.tempFilePath)
		return makeResponse(res, 200, 'Image uploaded successful', categoryStored)
	} catch (err) {
		return response500(err)
	}
}

async function getCategoryName(req, res) {
	const { categoryId } = req.params
	try {
		const categoryStored = await db.Category.findOne({ _id: categoryId }).lean().exec()
		if (!categoryStored) {
			return makeResponse(res, 400, 'Not exist')
		}
		return makeResponse(res, 200, 'Get category name successful', categoryStored.name)
	} catch (err) {
		return response500(err)
	}
}

module.exports = {
	postCategory,
	getCategories,
	getFullCategories,
	getCategoryById,
	deleteCategory,
	updateCategoryImage,
	getCategoriesName,
	getCategoryName
}