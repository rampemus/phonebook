const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const data = require('./db.json')

app.use(bodyParser.json())

app.get('/api/persons', (req,response) => {
    response.json(data.persons)
    console.log('Data sent',data.persons)
})

app.get('/api/persons/:id', (req,response) => {
    // console.log('get recieved')
    const id = Number(req.params.id)
    // console.log('looking for id',id)7
    const phonenumber = data.persons.find( number => {
        // console.log(number.id)
        return number.id === id
    } )

    if ( phonenumber ) {
        response.json(phonenumber)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (req,response) => {
    const person = req.body

    console.log(person)

    // if(!body.content) {
    //     return response.status(400).json({error: 'content missing'})
    // }
    console.log(person)
    response.json(person)
})

app.delete('/api/persons/:id', (req,response) => {
    const id = Number(req.params.id)

    data.persons = data.persons.filter( person => {
        return person.id !== id
    })

    response.status(204).end()
})

app.get('/info', (req,response) => {
    response.send(`<body><p>Phonebook has info for ${data.persons.length} people</p><p>${new Date()}</p></body>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
