const db = require('../models')
const { makeResponse, response500 } = require('../utils/makeResponse')

async function registerLoginUser(req, res) {
	const { user } = req.body
	if (!user) {
		return makeResponse(res, 404, 'User is required')
	}
	try {
		const userStored = await db.User.findOne({ userId: user.sub.toString() }).lean().exec()
		if (!userStored) {
			const newUser = new db.User({
				userId: user.sub,
				name: user.given_name || user.nickname,
				lastname: user.family_name || '',
				nickname: user.nickname || user.given_name,
				email: user.email,
				avatar: user.picture || '',
				language: user.locale || 'en'
			})
			try {
				const userSaved = await newUser.save()
				return makeResponse(res, 200, 'User created successful', userSaved)
			} catch (err) {
				if (err.code === 11000) {
					return makeResponse(res, 501, 'Email exists', null, err)
				}
				return response500(err)
			}
		} else {
			return makeResponse(res, 201, null, userStored)
		}
	} catch (err) {
		return response500(err)
	}
}

module.exports = {
	registerLoginUser,
}