const db = require('../models')
const fs = require('fs-extra')
const { uploadImage, removeMedia } = require('../utils/cloudinary')
const { response500, makeResponse } = require('../utils/makeResponse')
const dbCascade = require('../utils/dbCascade')
const cloudinaryConfig = require('../config/config').cloudinary

async function postGif(req, res) {
	const { userId } = req.params
	const { name, categories, externalImageUrl } = req.body
	let gifId = null
	const newGif = new db.Gif({ user: userId, name, categories, externalImageUrl })
	try {
		const gifSaved = await newGif.save()
		const findUser = await db.User.findOne({ _id: gifSaved.user })
		gifSaved.user = findUser
		gifId = gifSaved._id
		if (findUser) {
			return makeResponse(res, 200, 'Gif created successful', gifSaved)
		}
	} catch (err) {
		return response500(res, err)
	} finally {
		gifId && await dbCascade.migrateCascadeObject(db.User, userId.toString(), 'gifs', gifId)
		categories && await dbCascade.migrateCascadeArray(categories, db.Category, 'gifs', gifId)
	}
}

async function getGifs(req, res) {
	try {
		const gifsStored = await db.Gif.find().populate('user').lean().exec()
		return makeResponse(res, 200, 'Get gif`s successful', gifsStored)
	} catch (err) {
		return response500(res, err)
	}
}

async function getGifsByUser(req, res) {
	const { userId } = req.params
	try {
		const gifsStored = await db.Gif.find({ user: userId }).populate('user').lean().exec()
		return makeResponse(res, 200, 'Get gif`s by user successful', gifsStored)
	} catch (err) {
		return response500(res, err)
	}
}

async function getGifById(req, res) {
	const { gifId } = req.params
	try {
		const gifStored = await db.Gif.find({ _id: gifId }).lean().exec()
		return makeResponse(res, 200, 'Get gif successful', gifStored)
	} catch (err) {
		return response500(res, err)
	}
}

async function deleteGif(req, res) {
	const { gifId, userId } = req.params
	try {
		const findGif = await db.Gif.findOne({ _id: gifId }).lean().exec()
		if (!findGif) {
			return makeResponse(res, 404, 'Not found')
		}
		if (findGif.imagePublicId) await removeMedia(findGif.imagePublicId, 'image')
		await dbCascade.deleteCascadeArray(findGif.categories, db.Category, 'gifs', gifId)
		await db.Gif.findOneAndDelete({ _id: gifId }).exec()
		return makeResponse(res, 200)
	} catch (err) {
		return response500(res, err)
	} finally {
		gifId && await dbCascade.deleteCascadeObject(db.User, userId.toString(), 'gifs', gifId)
	}
}

async function updateGifImage(req, res) {
	const { gifId } = req.params
	if (!req.files?.image) {
		return makeResponse(res, 404, 'File required')
	}
	try {
		const findGif = await db.Gif.findOne({ _id: gifId }).lean().exec()
		if (!findGif) {
			return makeResponse(res, 404, 'Not exists')
		}
		if (findGif.imagePublicId) await removeMedia(findGif.imagePublicId, 'image')
		const imageUploaded = await uploadImage(req.files.image.tempFilePath, `${cloudinaryConfig.folder}/gifImages`)
		if (!imageUploaded) {
			return makeResponse(res, 400, 'Image failed')
		}
		const gifUpdated = await db.Gif.findOneAndUpdate(
			{ _id: gifId },
			{
				imageUrl: imageUploaded.secure_url,
				imagePublicId: imageUploaded.public_id
			},
			{ returnOriginal: false }
		).lean().exec()
		await fs.unlink(req.files.image.tempFilePath)
		const findUser = await db.User.findOne({ _id: gifUpdated.user })
		gifUpdated.user = findUser
		return makeResponse(res, 200, 'Image updated successful', gifUpdated)
	} catch (err) {
		return response500(res, err)
	}
}

async function updateGif(req, res) {
	const { gifId } = req.params
	const { name, categories } = req.body
	let gifsToRemoveIntoCategories = []
	let isPropietary = false
	try {
		// Middleware to protect content from others users
		const user = await db.User.findOne({ userId: req.auth.payload.sub.toString() }).lean().exec()
		user?.gifs.forEach(gif => {
			if (gif.toString() === gifId.toString()) {
				isPropietary = true
			}
		});
		if (!isPropietary) return makeResponse(res, 401, 'Not authorized')
		/////////////
		const findGif = await db.Gif.findOne({ _id: gifId }).lean().exec()
		findGif.categories?.forEach(category => {
			if (categories && !categories.includes(category.toString())) {
				gifsToRemoveIntoCategories.push(category)
			}
		});
		const gifUpdated = await db.Gif.findOneAndUpdate(
			{ _id: gifId },
			{ name, categories },
			{ new: true }
		).lean().exec()
		const findUser = await db.User.findOne({ _id: gifUpdated.user })
		gifUpdated.user = findUser
		categories && await dbCascade.migrateCascadeArray(categories, db.Category, 'gifs', gifId)
		return makeResponse(res, 200, 'Gif updated successful', gifUpdated)
	} catch (err) {
		return response500(res, err)
	} finally {
		gifsToRemoveIntoCategories?.forEach(async gif_id => {
			return await dbCascade.deleteCascadeObject(db.Category, gif_id, 'gifs', gifId)
		});
	}
}

async function incrementSharedCount(req, res) {
	const { gifId } = req.params
	try {
		await db.Gif.findOneAndUpdate(
			{ _id: gifId },
			{ $inc: { timesShared: 1 } }
		).lean().exec()
		return makeResponse(res, 200, 'Shared count incremented')
	} catch (err) {
		return response500(res, err)
	}
}

module.exports = {
	postGif,
	getGifs,
	getGifById,
	deleteGif,
	updateGif,
	updateGifImage,
	incrementSharedCount,
	getGifsByUser
}