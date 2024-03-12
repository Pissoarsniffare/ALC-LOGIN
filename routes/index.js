const express = require('express')
const router = express.Router()

const pool = require('../db')

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Welcome' })
})

router.get('/login', function (req, res) {
    res.render('login.njk', { title: 'Welcome' })
})

router.get('/signup', function (req, res) {
    res.render('signup.njk', { title: 'Welcome' })
})

router.get('/dbtest', async function (req, res) {
    const [result] = await pool.promise().query('SELECT * FROM SÅSIALDMÅKRATERN_LOGIN')
    res.json({result})
})

module.exports = router