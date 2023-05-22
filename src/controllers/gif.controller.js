const db = require('../models')
const fs = require('fs-extra')
const { uploadImage, removeMedia } = require('../utils/cloudinary')
const { response500, makeResponse } = require('../utils/makeResponse')
const cloudinaryConfig = require('../config/config').cloudinary

async function postGif(req, res) {
	const { userId } = req.params
	const { name } = req.body
	let gifId = null
	const newGif = new db.Gif({ user: userId, name })
	try {
		const gifSaved = await newGif.save()
		gifId = gifSaved._id
		return makeResponse(res, 200, 'Gif created successful', gifSaved)
	} catch (err) {
		if (err.code === 11000) {
			return makeResponse(res, 501, 'Email exists')
		}
		return response500(err)
	} finally {
		if (gifId) {
			await db.User.findByIdAndUpdate(
				{ _id: userId.toString() },
				{ $addToSet: { gifs: [gifId] } }
			).lean().exec()
		}
	}
}

async function getGifs(req, res) {
	try {
		const gifsStored = await db.Gif.find().populate('user').lean().exec()
		return makeResponse(res, 200, 'Get gif`s successful', gifsStored)
	} catch (err) {
		return response500(err)
	}
}

async function getGifById(req, res) {
	const { gifId } = req.params
	try {
		const gifStored = await db.Gif.find({ _id: gifId }).lean().exec()
		return makeResponse(res, 200, 'Get gif successful', gifStored)
	} catch (err) {
		return response500(err)
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
		await db.Gif.findOneAndDelete({ _id: gifId }).exec()
		return makeResponse(res, 200)
	} catch (err) {
		return response500(err)
	} finally {
		await db.User.findByIdAndUpdate(
			{ _id: userId.toString() },
			{ $pullAll: { gifs: [gifId] } }
		).lean().exec()
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
		return makeResponse(res, 200, 'Image updated successful', gifUpdated)
	} catch (err) {
		return response500(err)
	}
}

async function updateGif(req, res) {
	const { gifId } = req.params
	const { name } = req.body
	if (!name) {
		return makeResponse(res, 400, 'Name required')
	}
	try {
		await db.Gif.findOneAndUpdate(
			{ _id: gifId },
			{ name }
		).lean().exec()
		return res.status(200).send({ status: 200 })
	} catch (err) {
		return response500(err)
	}
}

async function incrementSharedCount(req, res) {
	const { gifId } = req.params
	try {
		await db.Gif.findOneAndUpdate(
			{ _id: gifId },
			{ $inc: { timesShared: 1 } }
		).lean().exec()
		return res.status(200).send({ status: 200 })
	} catch (err) {
		return response500(err)
	}
}

module.exports = {
	postGif,
	getGifs,
	getGifById,
	deleteGif,
	updateGif,
	updateGifImage,
	incrementSharedCount
}