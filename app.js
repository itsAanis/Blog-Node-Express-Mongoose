const { render } = require('ejs')
const express = require('express')
require('dotenv').config()
const { default: mongoose } = require('mongoose')
const morgan = require('morgan')
const Blog = require ('./models/blog')
const blogRoutes = require('./routes/blogRoutes')

//app
const app = express()

//connect to mongo db & listen for request

mongoose.connect(process.env.dburi, {useNewUrlparser:true, useUnifiedTopology: true})
    .then((result) => app.listen(3200) , console.log('connected to db'))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

//middle ware and static files.
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))


//routes
app.get('/', (req, res) => {
   res.redirect('/blogs')
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
  
  
  //blog routes
app.use('/blogs',blogRoutes)



  
  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });