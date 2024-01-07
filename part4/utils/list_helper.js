const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    const reducer = (total, blog) => {
      return total + blog.likes
    }

    const result = blogs.reduce(reducer, 0)
    return result

  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    const res = {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    }

    return res
  } else {
    // get only likes
    const likes = blogs.map(blogs => blogs.likes)
    const most = likes.indexOf(Math.max(...likes))
    const mostObject = {
      title: blogs[most].title,
      author: blogs[most].author,
      likes: blogs[most].likes
    }

    return mostObject
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    const res = {
      author: blogs[0].author,
      blogs: 1
    }
    return res
  } else {

    const groupedByAuthor = _.groupBy(blogs, 'author')
    let most = 0
    let by = groupedByAuthor[0]
    for (const [key, value] of Object.entries(groupedByAuthor)) {
      if (value.length > most) {
        most = value.length
        by = key
      }
    }

    return {
      author: by,
      blogs: most
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  } else {
    const groupedByAuthor = _.groupBy(blogs, 'author')
    let most = 0
    let by = groupedByAuthor[0]

    for (const [key, value] of Object.entries(groupedByAuthor)) {
      const likes = value.map(v => v.likes)
      const sumOfLikes = _.sum(likes)
      if (sumOfLikes > most) {
        most = sumOfLikes
        by = key
      }
    }

    return {
      author: by,
      likes: most
    }
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}