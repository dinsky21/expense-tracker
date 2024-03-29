const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	cost: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true,
		required: true,
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		index: true,
	},
})

module.exports = mongoose.model('Expense', expenseSchema)
