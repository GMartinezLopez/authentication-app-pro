const express = require('express')
const authController = require('../controllers/authController')
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../models/user')
const Publicacionesalv = require('../models/publicacionesalv')
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

router.post('/editPost', async (req, res) => {
  try {
    const { title, desc, img } = req.body
    const publicacionesalv = new Publicacionesalv({ title, desc,img })
    await publicacionesalv.save()
    res.redirect('/auth/editPost')
  } catch (error) {
    console.log(error)
    res.render('editPost', { message: 'Error creating post' })
  }
})

router.post('/login', authController.login)
router.get('/register', authController.getRegister)
router.get('/login', authController.getLogin)
router.get('/home', authController.getHome)
router.get('/blog', authController.getBlogs)
router.get('/publi', authController.getPubli)
router.get('/editPost', authController.getEditPost)
router.post('/blog', authController.postBlog)
router.put('/blog', authController.putBlog)
router.delete('/blog/:id', authController.deleteBlog)
router.get('/editPost', authController.getEditPost)

module.exports = router