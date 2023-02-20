const express = require('express')
const router = express.Router()

const expenseList = require('../../models/expense')
const categoryList = require('../../models/category')
const icons = { '家居物業':'fa-solid fa-house','交通出行':'fa-solid fa-van-shuttle', '餐飲食品':'fa-solid fa-utensils','休閒娛樂': '	fa-solid fa-face-grin-beam','其他':'fa-solid fa-pen'}

router.get('/', async (req, res) => {
	const userId = req.user._id
	const parsedExpenseList = await expenseList
		.find({ userId })
		.lean()
		.sort({ date: 'desc' })
	const parsedCategoryList = await categoryList.find().lean()
	let totalAmount = parsedExpenseList.reduce((accu, exp) => accu + exp.cost, 0)
	// parsedExpenseList.forEach((exp) => {
	// 	totalAmount += exp.cost
	// 	parsedCategoryList.forEach((cat) => {
	// 		if (exp.category === cat.name) {
	// 			return (exp.icon = cat.icon)
	// 		}
	// 	})
	// })

	res.render('index', {
		expenses: parsedExpenseList,
		totalAmount,
		categories: parsedCategoryList,
		icons
	})
})

// search function 動態路由，在req.query(<form>才有)中擷取keyword，再搭配filter, includes的功能呈現搜尋結果
router.get('/search', async (req, res) => {
	const keyword = req.query.keyword.trim().toLowerCase()
	const userId = req.user._id
	const parsedExpenseList = await expenseList.find({ userId }).lean()
	const filteredList = parsedExpenseList.filter(
		(e) =>
			e.name.toLowerCase().includes(keyword) ||
			e.category.includes(keyword)
	)
	const parsedCategoryList = await categoryList.find().lean()
	let totalAmount = 0
	filteredList.forEach((exp) => {
		totalAmount += exp.cost
		parsedCategoryList.forEach((cat) => {
			if (exp.category === cat.name) {
				return (exp.icon = cat.icon)
			}
		})
	})

	if (filteredList.length >= 1 || keyword === '') {
		res.render('index', {
			expenses: filteredList,
			totalAmount,
			categories: parsedCategoryList,
		})
	} else {
		res.render('no_results')
	}
})

router.post('/filter', async (req, res) => {
	const category = req.body.category
	const userId = req.user._id

	// icons.stringify = JSON.stringify(icons);
	const parsedExpenseList = await expenseList
		.find({ userId, category })
		.lean()
	const parsedCategoryList = await categoryList.find().lean()
	let totalAmount = parsedExpenseList.reduce((accu, exp) => accu + exp.cost, 0)
	// console.log(parsedExpenseList)
	
	// parsedExpenseList.forEach((exp) => {
	// 	totalAmount += exp.cost
	// 	parsedCategoryList.forEach((cat) => {
	// 		if (exp.category === cat.name) {
	// 			return (exp.icon = cat.icon)
	// 		}
	// 	})
	// })
	// parsedExpenseList.reduce((totalAmount, exp) => exp.cost+ totalAmount, 0)
// console.log(parsedExpenseList)

	res.render('index', {
		expenses: parsedExpenseList,
		totalAmount,
		categories: parsedCategoryList,
		icons
		})
	
})

// 匯出路由器
module.exports = router
