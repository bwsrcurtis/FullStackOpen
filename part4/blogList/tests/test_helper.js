const Blog = require('../models/blogs')

const initialBlogs = [
	{
		title: 'Here is a blog about space.',
		author: 'Stephen Hawking',
		url: 'https://hawking.com',
		likes: 69
	},
	{
		title:'Here is another blog.',
		author:'Albert Oppenheimer',
		url:'https://oppenheimer.com',
		likes: 420
	}
]

const nonExistingId = async () => {
	const blog = new Blog({ content: 'willremovethissoon' })
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, nonExistingId, blogsInDb
}