const User = require('../user')
const expenseList = require('../expense')
const categoryList = require('../category')
const bcrypt = require('bcryptjs')
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
	for (k = 0; k < categoryIconList.length; k++) {
		const { name, icon } = categoryIconList[k]
		categoryList.create({ icon, name }).then(() => {
			console.log('done')
			process.exit()
		})
	}
})
