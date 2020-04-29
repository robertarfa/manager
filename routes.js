const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')

routes.get('/', function(req, res){
    return res.redirect('/teachers')
})

routes.get('/teachers', teachers.indexTeachers)
routes.get('/teachers/create', teachers.createTeachers)
routes.get('/teachers/:id', teachers.findTeachers)
routes.get('/teachers/:id/edit', teachers.editTeachers)
routes.post('/teachers', teachers.postTeachers)
routes.put('/teachers', teachers.putTeachers)
routes.delete('/teachers', teachers.deleteTeachers)

//student

routes.get('/students', students.indexStudents)
routes.get('/students/create', students.createStudents)
routes.get('/students/:id', students.findStudents)
routes.get('/students/:id/edit', students.editStudents)
routes.post('/students', students.postStudents)
routes.put('/students', students.putStudents)
routes.delete('/students', students.deleteStudents)


module.exports = routes

