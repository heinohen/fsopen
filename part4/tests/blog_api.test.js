const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./api_test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')





beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

let tokenHolder

beforeEach(async () => {
  await User.deleteMany({})
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('salasana', saltRounds)

  const user = new User({
    username: 'testi',
    name: 'testi testinen',
    passwordHash,
  })

  await user.save()

  //info about the test user
  const testuser = {
    username: 'testi',
    password: 'salasana'
  }

  //log in with above
  tokenHolder = await api // same as manual login, we obtain token to be send with requests
    .post('/api/login')
    .send(testuser)



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
  describe('about specific note', () => {


    test('id field is defined', async () => {
      const response = await api.get('/api/blogs')

      const idField = response.body.map(r => r.id)

      expect(idField[0]).toBeDefined()
    })
  })

  describe('adding a blog', () => {

    test('a valid blog can be added by token holder', async () => {


      const newBlog = {
        title: 'Dummy blog',
        author: 'Valid Author',
        url: 'https://www.a-valid.url.com',
        likes: 444
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${tokenHolder.body.token}`) // this is from https://github.com/ladjs/supertest/issues/398
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

    test('a blog cannot be added without valid token', async () => {

      const newBlog = {
        title: 'Dummy blog',
        author: 'Valid Author',
        url: 'https://www.a-valid.url.com',
        likes: 444
      }


      const tokenString = 'eyJ1c2VybmFtZSI6InBhYWtheXR0YWphIiwieyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.aWQiOiI2NWI2NGRlOWE5ZWI1NjY2YzY4NmI2NzkiLCJpYXQiOjE3MDY0NTgyMDEsImV4cCI6MTcwNjQ2MTgwMX0.3byMCEdbcOY9kCzkxwuT5G_jskpPtkxmGFDoqatixAQ'

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${tokenString}`)
        .send(newBlog)
        .expect(400) //return response.status(400).json({ error: 'token missing or invalid' })

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)

    })

    test('a blog with undefined likes is added with 0 likes', async () => {

      const newBlog = {
        title: 'Dummy blog with no likes defined',
        author: 'No Likes Author',
        url: 'https://www.a-valid.url.com'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${tokenHolder.body.token}`) // this is from https://github.com/ladjs/supertest/issues/398
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

      const testBlog = response.body.find((e) => e.author === 'No Likes Author')
      expect(testBlog.likes).toBe(0)
    })



    test('blog without field \'title\' or \'url\' is not added', async () => {
      const newBlog = {
        author: 'malformed blog',
        likes: 666
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${tokenHolder.body.token}`) // this is from https://github.com/ladjs/supertest/issues/398
        .send(newBlog)
        .expect(400)

      const blogsAtTheEnd = await helper.blogsInDb()

      expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('removing a blog', () => {
    test('a blog with valid id can be deleted', async () => {

      const aValidBlog = {
        title: 'a valid blog to be deleted',
        author: 'its-a-me maaario',
        url: 'none',
        likes: 1337,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${tokenHolder.body.token}`) // this is from https://github.com/ladjs/supertest/issues/398
        .send(aValidBlog)
        .expect(201)

      const allInDb = await helper.blogsInDb()
      const deleteThisBlog = allInDb.find(blog => blog.title === aValidBlog.title)

      await api
        .delete(`/api/blogs/${deleteThisBlog.id}`)
        .set('Authorization', `Bearer ${tokenHolder.body.token}`) // this is from https://github.com/ladjs/supertest/issues/398
        .expect(204)

      const blogsAtTheEnd = await helper.blogsInDb()
      expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length)

      const titles = blogsAtTheEnd.map(b => b.title)
      expect(titles).not.toContain(aValidBlog.title)

    })

  })

  describe('changing likes of a blog', () => {

    test('like value increases by one', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const manipulatedBlog = blogsAtStart[0]
      const manipulatedLikes = manipulatedBlog.likes += 1
      manipulatedBlog.likes = manipulatedLikes

      await api
        .put(`/api/blogs/${manipulatedBlog.id}`)
        .send(manipulatedBlog)
        .expect(200)

      const blogsAtTheEnd = await helper.blogsInDb()

      const matchedBlog = blogsAtTheEnd.find(blog => blog.title === manipulatedBlog.title)
      expect(matchedBlog.likes).toEqual(manipulatedBlog.likes)
    })

    test('like value decreases by one', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const manipulatedBlog = blogsAtStart[0]
      const manipulatedLikes = manipulatedBlog.likes -= 1
      manipulatedBlog.likes = manipulatedLikes

      await api
        .put(`/api/blogs/${manipulatedBlog.id}`)
        .send(manipulatedBlog)
        .expect(200)

      const blogsAtTheEnd = await helper.blogsInDb()

      const matchedBlog = blogsAtTheEnd.find(blog => blog.title === manipulatedBlog.title)
      expect(matchedBlog.likes).toEqual(manipulatedBlog.likes)
    })

    test('like value cannot go below zero', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const manipulatedBlog = blogsAtStart[0]
      const manipulatedLikes = -999999999
      manipulatedBlog.likes = manipulatedLikes

      await api
        .put(`/api/blogs/${manipulatedBlog.id}`)
        .send(manipulatedBlog)
        .expect(200)

      const blogsAtTheEnd = await helper.blogsInDb()

      const matchedBlog = blogsAtTheEnd.find(blog => blog.title === manipulatedBlog.title)
      expect(matchedBlog.likes).toEqual(0)
    })



  })

})




afterAll(async () => {
  await mongoose.connection.close()
})