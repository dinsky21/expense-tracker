const express = require('express')
const router = express.Router()

const expenseList = require('../../models/expense')
const categoryList = require('../../models/category')

router.get('/', async (req, res) => {
	const userId = req.user._id
	const parsedExpenseList = await expenseList
		.find({ userId })
		.lean()
		.sort({ date: 'desc' })
	const parsedCategoryList = await categoryList.find().lean()
	let totalAmount = 0
	parsedExpenseList.forEach((exp) => {
		totalAmount += exp.cost
		parsedCategoryList.forEach((cat) => {
			if (exp.category === cat.name) {
				return (exp.icon = cat.icon)
			}
		})
	})

	res.render('index', { expenses: parsedExpenseList, totalAmount })
	// expenseList
	// 	.find({ userId })
	// 	.lean()
	// 	.sort({ date: 'asc' }) // desc
	// 	.then((expenses) => res.render('index', { expenses }))
	// 	.catch((error) => console.error(error))
})

// search function 動態路由，在req.query(<form>才有)中擷取keyword，再搭配filter, includes的功能呈現搜尋結果
router.get('/search', async (req, res) => {
	const keyword = req.query.keyword.trim().toLowerCase()
	const userId = req.user._id
	const parsedList = await expenseList.find({ userId }).lean()
	const filteredList = parsedList.filter(
		(e) =>
			e.name.toLowerCase().includes(keyword) ||
			e.category.includes(keyword)
	)
	console.log(filteredList)

	if (filteredList.length >= 1 || keyword === '') {
		res.render('index', { expenses: filteredList })
	} else {
		res.render('no_results')
	}
})

// 匯出路由器
module.exports = router
