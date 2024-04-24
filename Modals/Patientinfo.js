const mongoose = require('mongoose')
const PatientInfoSchema = mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'LoginSchema'
    },
    Disease:{
        type:String
    },
    Documentname:{
        type:String
    },
    DocumentPhoto:{
        type:Array
    },
    IssuedDate:{
        type:String
    },
    Hosptial:{
     type:String
    },
    lab:{
        type:String
    },
    remarks:{
        type:String
    }



    
    
    
})
const  PatientInfo = mongoose.model('PatientInfo',PatientInfoSchema)
module.exports =PatientInfo




