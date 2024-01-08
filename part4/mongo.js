const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://mongohenkka:${password}@isoklusteri.ms3ihqf.mongodb.net/testBloglistApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = new mongoose.model('Blog', blogSchema)

const blog1 = new Blog({
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
})

const blog2 = new Blog({
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
})

// eslint-disable-next-line no-unused-vars
blog1.save().then(result => {
  console.log('blog saved!')
})
// eslint-disable-next-line no-unused-vars
blog2.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})