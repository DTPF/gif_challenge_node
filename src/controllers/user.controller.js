const db = require('../models')

async function registerLoginUser(req, res) {
	const { user } = req.body
	if (!user) {
		return res.status(404).send({ status: 404 })
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
				return res.status(200).send({ status: 200, message: 'User created successful', user: userSaved })
			} catch (err) {
				if (err.code === 11000) {
					return res.status(501).send({ status: 501, err: err, message: 'Email exists' })
				}
				return res.status(501).send({ status: 501, message: 'Server error', error: err })
			}
		} else {
			return res.status(201).send({ status: 201, user: userStored })
		}
	} catch (err) {
		return res.status(500).send({ status: 500, message: 'Server error', error: err })
	}
}

module.exports = {
	registerLoginUser,
}