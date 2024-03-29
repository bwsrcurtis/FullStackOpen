require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')


app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))

const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error })
    }

    next(error)
}

app.use(errorHandler)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/info', (request, response, next) => {
    Person.estimatedDocumentCount()
        .then(function (count) { response.send(`<p>Phonebook has info for ${count} people</p><p>${Date()}</p>`) })
        .catch((err) => { next(err) })

}

    // response.send(`<p>Phonebook has info for ${Person.find().count((count) => count)} people</p><p>${Date()}</p>`)
)

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error =>
            next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))

    // const id = Number(request.params.id)
    // persons = persons.filter(person => person.id !== id)
    // response.status(204).end()
})

// const generateId = () => {
// 	return Math.floor(Math.random() * 10000)
// }

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or Number Missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})