const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const expenseList = require('../../models/expense')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, cost, description } = req.body
  return expenseList
    .create({ name, date, category, cost, description, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
