const fs = require('fs')
const data = require('./data.json')
const { age, date, graduation, classType } = require('./functions')
const Intl = require('intl') //npm i intl

//buscar teacher/show
exports.findTeachers = function(req, res){
    //req.params teachers/id
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found')

    // aqui vai copiar o que está ok e vai arrumar os dados errados.
    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        selectDegree: graduation(foundTeacher.selectDegree),
        classType: classType(foundTeacher.classType),
        //Para separar o array Matemática, Ciências
        services: foundTeacher.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),
    }
    
    return res.render('teachers/show', { teacher })
}

//create
exports.postTeachers = function(req, res){
    
    const keys = Object.keys(req.body)
    // Vai retornar um array ["avatar_url","name","birth","services"]
        
    for(key of keys){
            if (req.body[key] == "")
                return res.send('Please, fill in all the required fields.')
        }

    let { avatar_url, name, birth, selectDegree, classType, services} = req.body
    
        // Vamos transformar o birth para o numérico igual do Date.now
    birth = Date.parse(birth)
    //inserir a data de hoje
    const created_at = Date.now()
    //criar id único
    const id = Number(data.teachers.length + 1)
        
    // {[vazio]}
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        selectDegree,
        classType,
        services,
        created_at
    }) //{[preencher o array]}

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("Error writing file!")

            return res.redirect('/teachers')
    })

    //return res.send(req.body)
    //Vai retornar um objeto {"avatar_url":"","name":"","birth":"","services":""}
}
// edit
exports.editTeachers = function(req, res){
    //req.params teachers/id
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', {teacher})
}

//PUT
exports.putTeachers = function(req, res){
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if ( id == teacher.id ){
            index = foundIndex
            return true
        }  
    })

    if (!foundTeacher) return res.send('Teacher not found')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Error writing file!")
        return res.redirect(`teachers/${id}`)
})

}

//delete
exports.deleteTeachers = function(req, res){
    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Error writing file!")
        return res.redirect("/teachers")
    })
}