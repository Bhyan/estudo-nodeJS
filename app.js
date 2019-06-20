const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/blogapp').then(() => {
    console.log('Conectado ao mongo.')
}).catch((err) => {
    console.log('Error ao conectar no banco: ' + err)
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', admin)

const PORT = 8081
app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:8081/')
})