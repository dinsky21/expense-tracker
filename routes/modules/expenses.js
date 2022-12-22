const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const expenseList = require('../../models/expense')
const categoryList = require('../../models/category')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/new', (req, res) => {
	categoryList
		.find()
		.lean()
		.then((category) => res.render('new', { category }))
		.catch((error) => console.error(error))
	// console.log(category._id)
})

router.post('/', async (req, res) => {
	const userId = req.user._id
	const { name, date, category, cost, description } = req.body
	const createdCategory = await categoryList.find({ name: category }).lean()

	await expenseList.create({
		name,
		date,
		category,
		cost,
		description,
		userId,
		categoryId: createdCategory[0]._id,
	})
	res.redirect('/')
	// categoryList
	// 	.find({ category })
	// 	.then((category) => {
	// 		console.log(category)
	// 		const categoryId = category._id
	// 		expenseList
	// 			.create({
	// 				name,
	// 				date,
	// 				category,
	// 				cost,
	// 				description,
	// 				userId,
	// 				categoryId,
	// 			})
	// 			.then(() => {
	// 				res.redirect('/')
	// 			})
	// 	})
	// 	.catch((error) => console.log(error))
})

module.exports = router
