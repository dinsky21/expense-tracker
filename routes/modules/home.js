const express = require('express')
const router = express.Router()

const expenseList = require('../../models/expense')

router.get('/', (req, res) => {
	const userId = req.user._id
	expenseList
		.find({ userId })
		.lean()
		.sort({ date: 'asc' }) // desc
		.then((expenses) => res.render('index', { expenses }))
		.catch((error) => console.error(error))
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

	// restaurantList
	//   .find()
	//   .lean()
	//   .then((restaurant) => {
	//     const restaurants = restaurant.filter(
	//       (r) =>
	//         r.name.toLowerCase().includes(keyword) || r.category.includes(keyword)
	//     )

	//     if (restaurants.length >= 1 || keyword === '') {
	//       res.render('index', { restaurants, keyword })
	//     } else {
	//       res.render('no_results')
	//     }
	//   })
	//   .catch((error) => console.log(error))
})

// 匯出路由器
module.exports = router

module.exports = router
