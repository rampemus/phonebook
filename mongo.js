require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const Person = require('./models/person.js')

//***mongoose setup***
const url = process.env.MONGODB_URI

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
    Person.find({}).then(result => {
        // console.log('phonebook')
        // result.forEach(person => {
        //     console.log(`${person.name} ${person.number}`)
        // })
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    // console.log('got the request for id ' + id)
    // mongoose.connect(url, { useNewUrlParser: true })
    Person.findById({_id:id})
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
            // mongoose.connection.close()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request,response,next) => {
    let persons = {}
    // console.log('adding to this data:',persons)
    // if (!request.body.name) {
    //     response.status(400).json({'error': 'no name'})
    // } else if (!request.body.number) {
    //     response.status(400).json({'error': 'no phone number'})
    // } else {
        const person = new Person({...request.body})
        Person
            .find({name:person.name})
            .then(result => {
                if (result.length != 0) {
                    // Person.findByIdAndUpdate(result.id, {number:person.number})
                    response.status(405).json({error: "name already exists in phonebook"})
                } else {
                    person
                        .save()
                        .then(result => {
                            response.json(person)
                        })
                        .catch(error => next(error))

                }

            })

    // }
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person
        .findByIdAndUpdate(id, {number:request.body.number}, {useFindAndModify:false})
        .then((unknownResult, anotherResult) => {
            Person.findById({_id:id})
            .then(result => response.json(result))
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request,response,next) => {
    // mongoose.connect(url, { useNewUrlParser: true })

    Person
        .findByIdAndDelete(request.params.id)
        .then(()=>{
            // mongoose.connection.close();
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    // console.error(error.message)

    console.log('error handler working')

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError' ) {
        console.log('found validation error',error.name)
        return response.status(400).send({error: error.message})
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
        // mongoose.connection.close()
    })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
