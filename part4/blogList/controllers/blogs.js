const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	if (!blog.likes) {blog.likes = 0}
	if (!blog.title || !blog.url) {
		response.status(400).json({ error: 'Missing Title or URL' })
	} else {
		const result = await blog.save()
		response.status(201).json(result)
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {
	const body = request.body

	const blog = {
		name: body.name,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.then(updatedBlog => {
			response.json(updatedBlog)
		})
		.catch(error => next(error))
})

module.exports = blogsRouter