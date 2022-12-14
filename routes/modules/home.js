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

module.exports = router
