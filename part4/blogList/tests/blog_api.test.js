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

test('id field key equals id', async () => {
	const response = await api.get('/api/blogs')
	expect(200)
	expect(response.body[0].id).toBeDefined()
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

test('succeeds with status code 204 if id is valid', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDb()

	expect(blogsAtEnd).toHaveLength(
		helper.initialBlogs.length - 1
	)

	const title = blogsAtEnd.map(r => r.title)

	expect(title).not.toContain(blogToDelete.title)
})

test('a valid blog with no likes can be added and likes default to zero', async () => {
	const newBlog = {
		title: 'Here is another blog.',
		author: 'Albert Oppenheimer',
		url: 'https://oppenheimer.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

	const likes = blogsAtEnd[blogsAtEnd.length-1].likes
	expect(likes).toBe(
		0
	)
})

test('a valid blog with no name or url responds with status code 400', async () => {
	const newBlog = {
		author: 'Albert Oppenheimer',
		url: 'https://oppenheimer.com',
		likes: 420
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
})

test('update a blog', async() => {
	const blogsInDb = await helper.blogsInDb()
	const blogToUpdate = blogsInDb[0]
	blogToUpdate.likes = 3
	await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send(blogToUpdate)

	const updatedBlogs = await helper.blogsInDb()
	const likes = updatedBlogs[0].likes
	expect(likes).toBe(3)
})

afterAll(async () => {
	await mongoose.connection.close()
})