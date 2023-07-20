let lod = require('lodash')

const totalLikes = (blogs) => {
  const likes = blogs.reduce((accumulator, object) => {
    return accumulator + object.likes
  }, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length <= 0) {
    return 'There are no blogs'
  }
  const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  const { title, author, likes } = favorite

  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length <= 0) {
    return 'There are no blogs'
  }
  const author = lod.head(lod(blogs)
    .countBy('author')
    .entries()
    .maxBy(lod.last))
  const blogTotal = blogs.filter(blog => blog.author === author).length
  //   const likes = authorArray.reduce((accumulator, object) => {
  //     return accumulator + object.likes
  //   }, 0)
  return { author, blogTotal }
}

const mostLikes = (blogs) => {
  if (blogs.length <= 0) {
    return 'There are no blogs'
  }

  let grouped = lod(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      'author': key,
      'likes': lod.sumBy(objs, 'likes') }))
    .value()

  let sorted = lod.sortBy(grouped, ['likes']).reverse()
  return sorted[0]
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}