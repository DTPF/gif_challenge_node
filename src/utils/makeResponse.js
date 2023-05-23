const makeResponse = (res, code, msg, result, err) => {
	return res.status(code).send({ status: code, message: msg, result, error: err })
}

const response500 = (res, err) => makeResponse(res, 500, 'Server error', err)

module.exports = {
	makeResponse,
	response500
}