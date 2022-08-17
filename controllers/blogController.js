//blog_index, blog_creates_get, blog_create_post, blog_delete    // naming convention
const Blog = require ('../models/blog')

module.exports.blog_index = (req, res) => {
    Blog.find()
    .then((result) => {
      res.render('index', {title: 'All Blogs', blogs: result})  
    })
    .catch((err) =>{
      console.log(err)
    })
}

module.exports.blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
    .then(result => {
      res.render('details', {blog: result})
    })
    .catch(err => {
        res.status(404).render('404', { title: '404' })
    })
}

module.exports.blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' })
}

module.exports.blog_create_post = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
    .then((result) => {
      res.redirect('/blogs')
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports.blog_delete = (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({redirect: '/blogs' })
    })
    .catch(err => {
      console.log(err)
    })
}