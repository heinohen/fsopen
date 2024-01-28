
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
//
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})



blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) { return response.status(401).json({ error: 'token invalid' })
  }



  const user = await User.findById(decodedToken.id)

  logger.info(user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  if (blog.title === undefined || blog.url === undefined) {
    logger.info('hit')
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }

})

blogRouter.delete('/:id', async (request, response) => {
  logger.info('delete <----')

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) { return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)


  //if no user field is present return token missing or invalid
  if (!user) { return response.status(400).json({ error: '1 ) token missing or invalid' })}

  const blog = await Blog.findById(request.params.id)
  console.log(blog)

  console.log('täällä asti')
  console.log(`blog user ----> ${blog.user.toString()}, user user ${user.id.toString()}`)

  if ( !(blog.user.toString() === user.id.toString()) ) { return response.status(400).json({ error: 'unauthorized' })}

  await Blog.findByIdAndRemove(request.params.id)
  //A 204 No Content status code indicates that the resource has been removed but there is no message body to further describe the action or the status.
  response.status(204).end()




  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (body.likes - 1 < 0) {
    body.likes = 0
  }

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.json(updatedBlog)
})



module.exports = blogRouter