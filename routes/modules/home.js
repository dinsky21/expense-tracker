const express = require('express')
const router = express.Router()

const ExpenseList = require('../../models/expense')

router.get('/', (req, res) => {
  res.render('index')
  // const userId = req.user._id
  // ExpenseList.find({ userId })
  //   .lean()
  //   .sort({ _id: 'asc' }) // desc
  //   .then((todos) => res.render('index', { todos }))
  //   .catch((error) => console.error(error))
})

module.exports = router
