
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  logger.info('täällä')
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })
  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    logger.info('save complete')

  } catch (exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  logger.info('delete <----')

  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }

})


module.exports = blogRouter