const listHelper = require('../utils/list_helper')

// describe('total likes', () => {

//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0
//     }
//   ]

//   const listWithTwoBlogs = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Highest rated',
//       author: 'Einstein',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 10,
//       __v: 0
//     }
//   ]

//   const listWithNoBlogs = []

//   test('when list has only one blog, equals the likes of that', () => {
//     const result = listHelper.totalLikes(listWithOneBlog)
//     expect(result).toBe(5)
//   })

//   test('when list has multiple blog, equals total likes', () => {
//     const result = listHelper.totalLikes(listWithTwoBlogs)
//     expect(result).toBe(15)
//   })

//   test('when list has no blogs, equals zero', () => {
//     const result = listHelper.totalLikes(listWithNoBlogs)
//     expect(result).toBe(0)
//   })
// })

// describe('favorite blog', () => {

//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0
//     }
//   ]

//   const listWithTwoBlogs = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Highest rated',
//       author: 'Einstein',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 10,
//       __v: 0
//     }
//   ]

//   const listWithNoBlogs = []

//   test('when list has only one blog, that blog', () => {
//     const result = listHelper.favoriteBlog(listWithOneBlog)
//     expect(result).toEqual({
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       likes: 5
//     })
//   })

//   test('when list has multiple blogs, the most popular blogs', () => {
//     const result = listHelper.favoriteBlog(listWithTwoBlogs)
//     expect(result).toEqual({
//       title: 'Highest rated',
//       author: 'Einstein',
//       likes: 10
//     })
//   })

//   test('when list no blogs, return notice', () => {
//     const result = listHelper.favoriteBlog(listWithNoBlogs)
//     expect(result).toEqual('There are no blogs')
//   })
// })

// describe('most likes', () => {

//   const listWithOneBlog = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0
//     }
//   ]

//   const listWithMultipleBlogs = [
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 5,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Highest rated',
//       author: 'Einstein',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 10,
//       __v: 0
//     },
//     {
//       _id: '5a422aa71b54a676234d17f8',
//       title: 'Go To Statement Considered Harmful',
//       author: 'Edsger W. Dijkstra',
//       url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//       likes: 7,
//       __v: 0
//     }
//   ]

//   const listWithNoBlogs = []

//   test('when list has only one blog, that blog', () => {
//     const result = listHelper.mostBlogs(listWithOneBlog)
//     expect(result).toEqual({
//       author: 'Edsger W. Dijkstra',
//       blogTotal: 1
//     })
//   })

//   test('when list has multiple blogs, the most popular author', () => {
//     const result = listHelper.mostBlogs(listWithMultipleBlogs)
//     expect(result).toEqual({
//       author: 'Edsger W. Dijkstra',
//       blogTotal: 2
//     })
//   })

//   test('when list no blogs, return notice', () => {
//     const result = listHelper.mostBlogs(listWithNoBlogs)
//     expect(result).toEqual('There are no blogs')
//   })
// })

describe('most likes', () => {

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

	const listWithMultipleBlogs = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Highest rated',
			author: 'Einstein',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 10,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 7,
			__v: 0
		}
	]

	const listWithNoBlogs = []

	test('when list has only one blog, that blog', () => {
		const result = listHelper.mostLikes(listWithOneBlog)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 5
		})
	})

	test('when list has multiple blogs, the most popular author', () => {
		const result = listHelper.mostLikes(listWithMultipleBlogs)
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 12
		})
	})

	test('when list no blogs, return notice', () => {
		const result = listHelper.mostLikes(listWithNoBlogs)
		expect(result).toEqual('There are no blogs')
	})
})