const express = require('express')
const router = express.Router()

const pool = require('../db')

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'test';
const someOtherPlaintextPassword = 'not_bacon';


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

router.get('/hashtest', async function (req, res){

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
    });

    res.send("nuggets")
})

module.exports = router