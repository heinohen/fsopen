const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

describe('Dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('Total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})


describe('Favourite blog', () => {

  test('of empty list is zero', () => {
    expect(listHelper.favoriteBlog([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const exp = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    const testSubject = listHelper.favoriteBlog(listWithOneBlog)

    expect(testSubject).toEqual(exp)
  })

  test('of a bigger list is given back right object', () => {
    const exp = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }

    const testSubject = listHelper.favoriteBlog(blogs)

    expect(testSubject).toEqual(exp)
  })
})

describe('Most blogs', () => {
  test('of empty list is zero', () => {
    expect(listHelper.mostBlogs([])).toBe(0)
  })

  test('when list has only one blog equals the amount of that', () => {
    const exp = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }

    const testSubject = listHelper.mostBlogs(listWithOneBlog)

    expect(testSubject).toEqual(exp)
  })

  test('of a bigger list is given back right object', () => {
    const exp = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    const testSubject = listHelper.mostBlogs(blogs)

    expect(testSubject).toEqual(exp)
  })
})

describe('Most likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.mostLikes([])).toBe(0)
  })

  test('when list has only one blog equals the amount of likes of that', () => {

    const exp = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    const testSubject = listHelper.mostLikes(listWithOneBlog)

    expect(testSubject).toEqual(exp)
  })

  test('of a bigger list is given back right object', () => {
    const exp = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    const testSubject = listHelper.mostLikes(blogs)

    expect(testSubject).toEqual(exp)

  })
})
