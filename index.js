const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const data = require('./db.json')
const morgan = require('morgan')

const maxPersons = 100
const newRandomId = () => Math.floor((Math.random() * maxPersons) + 1)

app.use(bodyParser.json())

morgan.token('body', function (request, resource) {
    if ( request.body ) {
        return JSON.stringify(request.body)
    }
    return ''
})

app.use(morgan(function (tokens, request, resource) {
  return [
    tokens.method(request, resource),
    tokens.url(request, resource),
    tokens.status(request, resource),
    tokens.res(request, resource, 'content-length'), '-',
    tokens['response-time'](request, resource), 'ms',
    tokens.body(request,resource)
  ].join(' ')
}))

app.get('/api/persons', (request,response) => {
    response.json(data.persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const phonenumber = data.persons.find( number => {
        return number.id === id
    } )

    if ( phonenumber ) {
        response.json(phonenumber)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request,response) => {

    if ( data.persons.length >= maxPersons ) {
        response.json({'error': 'database is full'})
    } else if (!request.body.name) {
        response.json({'error': 'no name'})
    } else if (!request.body.number) {
        response.json({'error': 'no phone number'})
    } else if ( data.persons.find( person => {
        return person.name === request.body.name
    } ) != undefined ) {
        response.json({'error': `person ${request.body.name} exists already in the phonebook`})
    } else {

        let id = newRandomId()
        while ( data.persons.find( person => {
            return person.id === id
        } ) ) {
            id = newRandomId()
        }

        const person = {...request.body, "id":id}

        data.persons = data.persons.concat(person)

        response.json(person)
    }

})

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)

    data.persons = data.persons.filter( person => {
        return person.id !== id
    })

    response.status(204).end()
})

app.get('/info', (request,response) => {
    response.send(`<body><p>Phonebook has info for ${data.persons.length} people</p><p>${new Date()}</p></body>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
