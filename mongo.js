require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

//***mongoose setup***
const url = process.env.MONGODB_URI

//create persons
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Person = mongoose.model('Person', personSchema)
const maxPersons = 100
const newRandomId = () => Math.floor((Math.random() * maxPersons) + 1)

//***api server setup***//
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('body', (request,resource) => {
    if (request.body) {
        return JSON.stringify(request.body)
    }
})
app.use(morgan((tokens,request, resource)=>{
    return [
        tokens.method(request,resource),
        tokens.url(request,resource),
        tokens.status(request,resource),
        tokens.res(request,resource, 'content-length'), '-',
        tokens['response-time'](request, resource), 'ms',
        tokens.body(request,resource)
    ].join(' ')
}))

app.get('/api/persons', (request, response) => {
    mongoose.connect(url, { useNewUrlParser: true })
    Person.find({}).then(result => {
        // console.log('phonebook')
        // result.forEach(person => {
        //     console.log(`${person.name} ${person.number}`)
        // })
        response.json(result.map(person => person.toJSON()))
        mongoose.connection.close()
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    // console.log('got the request for id ' + id)
    mongoose.connect(url, { useNewUrlParser: true })
    Person.findById({_id:id})
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
            mongoose.connection.close()
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error: 'malformatted id'})
            mongoose.connection.close()
        })
})

app.post('/api/persons', (request,response) => {
    let persons = {}
    mongoose.connect(url, { useNewUrlParser: true })
    console.log('adding to this data:',persons)
    if (!request.body.name) {
        response.json({'error': 'no name'})
        mongoose.connection.close()
    } else if (!request.body.number) {
        response.json({'error': 'no phone number'})
        mongoose.connection.close()
    } else {
        const person = new Person({...request.body})
        person.save().then(response => {
            console.log('person saved!', response)
            mongoose.connection.close()
        })
        response.json(person)
    }
})

app.delete('/api/persons/:id', (request,response) => {
    mongoose.connect(url, { useNewUrlParser: true })
    Person
        .findByIdAndDelete(request.params.id)
        .then(()=>{
            mongoose.connection.close();
            response.status(204).end()
        })
        .catch(error => next(error))
})

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({error: 'unknown endpoint'})
// }
//
// app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

mongoose.connect(url, { useNewUrlParser: true })
    Person.find({}).then(result => {
        console.log('phonebook')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
