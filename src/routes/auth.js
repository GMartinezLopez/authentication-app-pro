const express = require('express')
const authController = require('../controllers/authController')
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../models/user')
const blogController = require('../controllers/blogController')

// Parse request body
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, date } = req.body
    const user = new User({ name, email, password, date })
    await user.save()
    res.redirect('/auth/login')
  } catch (error) {
    console.log(error)
    res.render('register', { message: 'Error creating user' })
  }
})

router.post('/login', authController.login)
router.get('/register', authController.getRegister)
router.get('/login', authController.getLogin)
router.get('/home', authController.getHome)
router.get('/blog', authController.getBlogs)
router.post('/blog', authController.postBlog)
router.put('/blog', authController.putBlog)
router.delete('/blog/:id', authController.deleteBlog)

module.exports = router
