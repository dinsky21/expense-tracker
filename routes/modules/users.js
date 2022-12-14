const express = require('express')
const router = express.Router()
const User = require('../../models/user')
// const Todo = require('../../models/todo')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/edit', (req, res) => {
  res.render('edit')
})

module.exports = router
