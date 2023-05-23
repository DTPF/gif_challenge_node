const db = require('../models')

async function migrateCascadeArray(items, Model, dbFieldName, documentId) {
	return await items.forEach(async modelId => {
		return await Model.findOneAndUpdate(
			{ _id: modelId },
			{ $addToSet: { [dbFieldName]: documentId } }
		).lean().exec()
	});
}

async function migrateCascadeObject(Model, modelId, dbFieldName, documentId) {
	return await Model.findOneAndUpdate(
		{ _id: modelId },
		{ $addToSet: { [dbFieldName]: documentId } }
	).lean().exec()
}

async function deleteCascadeArray(items, Model, dbFieldName, documentId) {
	return await items.forEach(async modelId => {
		return await Model.findOneAndUpdate(
			{ _id: modelId },
			{ $pullAll: { [dbFieldName]: [documentId] } }
		).lean().exec()
	});
}

async function deleteCascadeObject(Model, modelToUpdate, dbFieldName, idToDelete) {
	return await Model.findOneAndUpdate(
		{ _id: modelToUpdate },
		{ $pullAll: { [dbFieldName]: [idToDelete] } }
	).lean().exec()
}

module.exports = {
	migrateCascadeArray,
	migrateCascadeObject,
	deleteCascadeArray,
	deleteCascadeObject
}