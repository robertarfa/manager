const fs = require('fs')
const data = require('../data.json')
const { date } = require('../functions')
const Intl = require('intl') //npm i intl


exports.indexStudents = function(req, res){
    return res.render('students/index', { students: data.students })
}

//buscar student/show
exports.findStudents = function(req, res){
    //req.params students/id
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found')

    // aqui vai copiar o que está ok e vai arrumar os dados errados.
    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        //selectDegree: graduation(foundStudent.selectDegree),
        
        //Para separar o array Matemática, Ciências
        
    }
    
    return res.render('students/show', { student })
}

//create
exports.createStudents = function(req, res){
    return res.render('students/create')
}

//post
exports.postStudents = function(req, res){
    
    const keys = Object.keys(req.body)
    // Vai retornar um array ["avatar_url","name","birth"]
        
    for(key of keys){
            if (req.body[key] == "")
                return res.send('Please, fill in all the required fields.')
        }

    // let { 
    //     avatar_url,
    //     name,
    //     email,
    //     birth,
    //     selectYear,
    //     hours} 
    //     = req.body
    
        // Vamos transformar o birth para o numérico igual do Date.now
    birth = Date.parse(req.body.birth)
    
    //criar id único sem repetir os números
    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if (lastStudent){
        id = lastStudent.id + 1
    }
        
    // {[vazio]}
    data.students.push({
        id,
        ...req.body,
        birth
    }) //{[preencher o array]}

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("Error writing file!")

            return res.redirect('/students')
    })

    //return res.send(req.body)
    //Vai retornar um objeto {"avatar_url":"","name":"","birth":"","services":""}
}
// edit
exports.editStudents = function(req, res){
    //req.params students/id
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send('Student not found')

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', {student})
}

//PUT
exports.putStudents = function(req, res){
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if ( id == student.id ){
            index = foundIndex
            return true
        }  
    })

    if (!foundStudent) return res.send('Student not found')

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Error writing file!")
        return res.redirect(`students/${id}`)
})

}

//delete
exports.deleteStudents = function(req, res){
    const { id } = req.body

    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Error writing file!")
        return res.redirect("/students")
    })
}