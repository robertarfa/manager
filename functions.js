module.exports= {
    age:    // calcula a idade
    function age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        let month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()){
            age = age - 1
        }

        return age
    },
    date: 
    function date(timestamp){
        const date = new Date(timestamp)

        //yyyy coloca UTC no meio para pegar o dado universal
        const year = date.getUTCFullYear()

        //mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        //dd
        const day = `0${date.getUTCDate()}`.slice(-2)

        //return yyyy-mm-dd
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    graduation:
    function graduation (value){
        switch(value) {
            case 'EMC': return "Ensino Médio Completo"
            case 'ESC': return "Ensino Superior Completo"
            case 'Master': return "Mestrado"
            case 'Doctor': return "Doutorado"  
       }
    },
    classType:
    function classType (value){
        if (value == 'D' ) {
            return "À distância"
        } else {
            return "Presencial"
        }
    }
}