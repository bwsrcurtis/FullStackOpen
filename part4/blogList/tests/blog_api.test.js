const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')
const helper = require('./test_helper')



beforeEach(async () => {
	await Blog.deleteMany({})
	console.log('cleared')
	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
		console.log('saved')
	}
	console.log('done')
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
	const response = await api.get('/api/blogs')

	const title = response.body.map(r => r.title)
	expect(title).toContain(
		'Here is a blog about space.'
	)
})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'Here is another blog.',
		author: 'Albert Oppenheimer',
		url: 'https://oppenheimer.com',
		likes: 420
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

	const title = blogsAtEnd.map(r => r.title)
	expect(title).toContain(
		'Here is another blog.'
	)
})

test('blog without content is not added', async () => {
	const newBlog = {
		title: 'new blog'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})



afterAll(async () => {
	await mongoose.connection.close()
})