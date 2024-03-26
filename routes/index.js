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

router.post('/login', async function (req, res) {
    const username = req.body.username
    const password = req.body.password
    console.log(username, password)
    const [result] = await pool.promise().query(`
    SELECT * FROM SÅSIALDMÅKRATERN_LOGIN WHERE SÅSIALDMÅKRATERN_LOGIN.username = ? limit 1`, [username])
    console.log(result)

    if (result.length == 0) {
        console.log("jag suger")
        return res.redirect('/login')
    }

    bcrypt.compare(password, result[0].password, async function (err, result) {
        console.log(result)
        if (result) {
            req.session.username = req.body.username
            console.log(`is logged in:${result} woth username: ${req.session.username}`)
            return res.redirect('/secret')
        } else {
            res.redirect('/login')
        }

    })

})

router.get('/signup', function (req, res) {
    res.render('signup.njk', { title: 'Welcome' })
})

router.post('/signup', async function (req, res) {
    const signupusername = req.body.signupusername
    const signuppassword = req.body.signuppassword
    console.log(signupusername, signuppassword)

    res.render('signup.njk', { title: 'Welcome' })
})

router.get('/secret', function (req, res) {
    res.render('secret.njk', { title: 'DU ÄR INLOGGAD' })
})

router.get('/dbtest', async function (req, res) {
    const [result] = await pool.promise().query('SELECT * FROM SÅSIALDMÅKRATERN_LOGIN')
    res.json({ result })
})

router.get('/hashtest', async function (req, res) {

    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        console.log(hash)
    });

    res.send("nuggets")
})

module.exports = router