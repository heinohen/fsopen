const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./api_test_helper')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('API tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific author is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)

    expect(authors).toContain(
      'Michael Chan'
    )
  })

  test('id field is defined', async () => {
    const response = await api.get('/api/blogs')

    const idField = response.body.map(r => r.id)

    expect(idField[0]).toBeDefined()
  })

  test('a valid blog can be added', async () => {

    const newBlog = {
      title: 'Dummy blog',
      author: 'Valid Author',
      url: 'https://www.a-valid.url.com',
      likes: 444
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await helper.blogsInDb()

    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)

    const authors = blogsAtTheEnd.map(b => b.author)
    expect(authors).toContain(
      'Valid Author'
    )
  })

  test('a blog with undefined likes is added with 0 likes', async () => {
    const newBlog = {
      title: 'Dummy blog with no likes defined',
      author: 'No Likes Author',
      url: 'https://www.a-valid.url.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    const testBlog = response.body.find((e) => e.author === 'No Likes Author')
    expect(testBlog.likes).toBe(0)
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('blog without field \'title\' or \'url\' is not added', async () => {
    const newBlog = {
      author: 'malformed blog',
      likes: 666
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtTheEnd = await helper.blogsInDb()

    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length)
  })







})