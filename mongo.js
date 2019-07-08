const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

if ( process.argv.length<3 ) {
  console.log('give mongodb password as argument')
  process.exit(1)
}

//***mongoose setup***
const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@cluster0-juhnz.mongodb.net/phonebook-app?retryWrites=true&w=majority`
//create persons
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
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

//***api server setup***
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
        console.log('phonebook')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        response.json(result)
        mongoose.connection.close()
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = parseInt(request.params.id)
    console.log('got the request for id ' + id)
    mongoose.connect(url, { useNewUrlParser: true })
    Person.find({ id: id}).then(result => {
        console.log('searching for id ' + id)
        if (result) {
            response.json(result[0]) //we don't want to return array
        } else {
            response.status(404).end()
        }
        mongoose.connection.close()
    })
})

app.post('/api/persons', (request,response) => {

    mongoose.connect(url, { useNewUrlParser: true })

    let persons = {}

    Person.find({}).then(result => {
        console.log('phonebook')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        persons = result
    }).then(()=>{
        console.log('adding to this data:',persons)

        if ( persons.length >= maxPersons ) {
            response.json({'error': 'database is full'})
        } else if (!request.body.name) {
            response.json({'error': 'no name'})
        } else if (!request.body.number) {
            response.json({'error': 'no phone number'})
        } else if ( persons.find( person => {
            return person.name === request.body.name
        } ) != undefined ) {
            response.json({'error': `person ${request.body.name} exists already in the phonebook`})
        } else {

            console.log('starting to generate new id')

            let id = newRandomId()
            while ( persons.find( person => {
                return person.id === id
            } ) ) {
                id = newRandomId()
            }
            const person = new Person({...request.body, "id":id})

            person.save().then(response => {
                console.log('person saved!', response);
                mongoose.connection.close();
            })

            // data.persons = data.persons.concat(person)

            response.json(person)
        }
    })
})

mongoose.connect(url, { useNewUrlParser: true })

if ( process.argv.length == 3 ) {
    Person.find({}).then(result => {
        console.log('phonebook')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

if ( process.argv.length == 4 ) {
    Person.find({ id: parseInt(process.argv[3])}).then(result => {
        console.log('phonebook')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

//only for single user TODO:real id generation
if ( process.argv.length == 5 ) {

    let newId = 0
    Person.find({}).then(result => {
        result.forEach(person => {
            if (person.id > newId) {
                newId = person.id + 1
            }
        })

        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
            id: newId,
        })

        person.save().then(response => {
            console.log('person saved!');
            mongoose.connection.close();
        })
    })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
