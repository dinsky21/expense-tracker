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
	const { name, date, cost, description } = req.body
	const categoryFromReq = req.body.category
	const errors = []
	if (cost <= 0){errors.push({ message: 'Cost is required and should be positive value'})}
	if (errors.length)
			{
			return categoryList
			.find()
			.lean()
			.then((category) => {
				res.render('new', {
					errors,
					name,
					categoryFromReq,
					category,
					date,  
					cost, 
					description
				})
			})
			.catch((error) => console.error(error))
	}

	const createdCategory = await categoryList.find({ name: categoryFromReq }).lean()
	await expenseList.create({
		name,
		date,
		category: categoryFromReq,
		cost,
		description,
		userId,
		categoryId: createdCategory[0]._id,
	})
	res.redirect('/')
})

// detail page
router.get('/:id', async (req, res) => {
	const _id = req.params.id
	const userId = req.user._id
	const createdCategory = await categoryList.find().lean()
	const parsedExpenseList = await expenseList.findOne({ _id, userId }).lean()
	res.render('detail', {
		expenses: parsedExpenseList,
		category: createdCategory,
	})
})

// edit function
router.get('/:id/edit', async (req, res) => {
	const _id = req.params.id
	const userId = req.user._id
	const createdCategory = await categoryList.find().lean()
	const parsedExpenseList = await expenseList.findOne({ _id, userId }).lean()
	res.render('edit', {
		expenses: parsedExpenseList,
		category: createdCategory,
	})
})

router.put('/:id', (req, res) => {
	const _id = req.params.id
	const userId = req.user._id
	expenseList
		.findOneAndUpdate({ _id, userId }, req.body)
		.then(() => res.redirect(`/`))
		.catch((error) => console.log(error))
})

router.delete('/:id', (req, res) => {
	const _id = req.params.id
	const userId = req.user._id
	expenseList
		.findOneAndRemove({ _id, userId })
		.then(() => res.redirect(`/`))
		.catch((error) => console.log(error))
})
module.exports = router
