const User = require('../models/user')
const BlogSchema = require('../models/publicacionesalv')
const UserSchema = require('../models/user')

// Función para renderizar el home
function getHome(req, res) {
  res.render('home')
}

// Función para renderizar la vista principal
function getIndex(req, res) {
  res.render('index')
}
function getEditPost(req, res) {
  res.render('editPost')
}
// Función para renderizar la vista register
function getRegister(req, res) {
  res.render('register', { message: 'Invalid username or password' })
}

// Función para renderizar la vista login
function getLogin(req, res) {
  res.render('login', { message: 'Invalid username or password' })
}

function getPubli(req, res) {
  res.render('publi')
}

function getPubli(req, res) {
  res.render('publi')
}

function getEditPost(req, res) {
  res.render('editPost')
}
// Función para iniciar sesión
async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && password) {
      req.session.userId = user._id
      return res.redirect('blog')
    }
    res.render('login', { message: 'Invalid email or password' })
  } catch (error) {
    console.log(error)
    res.render('login', { message: 'Error logging in' })
  }
}

// Función para obtener la información del usuario actual
async function getUser(req, res) {
  try {
    const { id } = req.params
    console.log(id)
    // Buscamos el usuario en la base de datos
    const user = await User.findById(id).select('-password')

    // Enviamos los datos del usuario como respuesta
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Error al obtener la información del usuario' })
  }
}

async function getBlogs(req, res) {
  try {
    const posts = await BlogSchema.find()
    const usuario = await UserSchema.findById(req.session.userId).select('-password')
    // Enviamos los datos del usuario como respuesta
    res.render('blog', { posts, usuario })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Error al obtener los posts' })
  }
}

async function postBlog(req, res) {
  try {
    const { title, desc, img } = req.body
    const post = new BlogSchema({ title, desc, img })
    await post.save()
    //res.redirect('/auth/blog')
    res.json(post)
  } catch (error) {
    console.log(error)
    res.render('blog', { message: 'Error creating post' })
  }
}



async function putBlog(req, res) {
  try {
    const { id, title, desc, img } = req.body
    console.log(id)
    const post = await BlogSchema.findById(id)

    post.set({ title, desc, img })
    await post.save()
    //res.redirect('/auth/blog')
    res.json(post)
  } catch (error) {
    console.log(error)
    res.render('blog', { message: 'Error creating post' })
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params
    await BlogSchema.findByIdAndDelete(id)
    //res.redirect('/auth/blog')
    res.json({ msg: 'Post eliminado' })
  } catch (error) {
    console.log(error)
    res.render('blog', { message: 'Error creating post' })
  }
}

module.exports = {
  login,
  getUser,
  getIndex,
  getRegister,
  getLogin,
  getHome,
  getBlogs,
  getPubli,
  postBlog,
  putBlog,
  deleteBlog,
  getEditPost,
}
