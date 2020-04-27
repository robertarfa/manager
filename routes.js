const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function(req, res){
    return res.redirect('/teachers')
})

routes.get('/teachers', teachers.indexTeachers)

routes.get('/teachers/create', function(req, res){
    return res.render('teachers/create')
})

routes.get('/teachers/:id', teachers.findTeachers)

routes.get('/teachers/:id/edit', teachers.editTeachers)

routes.get('/members', function(req, res){
    return res.render('members')
})

routes.post('/teachers', teachers.postTeachers)

routes.put('/teachers', teachers.putTeachers)

routes.delete('/teachers', teachers.deleteTeachers)

// HTTP

module.exports = routes

