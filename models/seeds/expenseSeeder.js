const User = require('../user')
const expenseList = require('../expense')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const expenses = require('../../expenses.json').expenses

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ override: true })
}

const SEED_USER = [
	{
		name: '廣志',
		email: 'root@example.com',
		password: 'root1234',
		list: expenses,
	},
]

db.on('error', () => {
	console.log('mongodb error!')
})

db.once('open', () => {
	console.log('mongodb connected!')

	const { name, password, email, list } = SEED_USER[0]

	bcrypt
		.genSalt(10)
		.then((salt) => bcrypt.hash(password, salt))
		.then((hash) =>
			User.create({
				name,
				email,
				password: hash,
			})
		)
		.then((user) => {
			const userId = user._id
			return Promise.all(
				Array.from({ length: 5 }, (_, i) =>
					expenseList.create({
						name: list[i].name,
						category: list[i].category,
						date: list[i].date,
						cost: list[i].cost,
						description: list[i].description,
						userId,
					})
				)
			)
		})
		.then(() => {
			console.log('seed expenses done!')
			db.close()
		})
})
