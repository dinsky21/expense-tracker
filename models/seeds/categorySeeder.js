const User = require('../user')
const categoryList = require('../category')
const db = require('../../config/mongoose')

const categoryIconList = [
	{ name: '家居物業', icon: 'fa-solid fa-house' },
	{ name: '交通出行', icon: 'fa-solid fa-van-shuttle' },
	{ name: '休閒娛樂', icon: 'fa-solid fa-face-grin-beam' },
	{ name: '餐飲食品', icon: 'fa-solid fa-utensils' },
	{ name: '其他', icon: 'fa-solid fa-pen' },
]

db.on('error', () => {
	console.log('mongodb error!')
})

db.once('open', () => {
	console.log('mongodb connected!')
	Promise.all(
		categoryIconList.map(async (category) => {
			await categoryList.create({
				name: category.name,
				icon: category.icon,
			})
		})
	).then(() => {
		console.log('seed categories done!')
		db.close()
	})
})
