const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override') // npm install method-override

const server = express()

// São os Middleware

// Esse é para enviar as req.body para a tela
server.use(express.urlencoded({ extended: true }))
// Esse é para ler a pasta public
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

//no render não precisa colocar .html pq essa linha já faz isso
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    noCache: true,
    autoescape: false
})


//porta onde o servidor está rodando
server.listen(5000, function(){
    console.log('server is running')
})