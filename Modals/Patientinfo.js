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
        type:String,
        default: Date.now
    },
    Hosptial:{
     type:String
    },
    lab:{
        type:String
    },
    Remarks:{
        type:String
    }



    
    
    
})
const  PatientInfo = mongoose.model('PatientInfo',PatientInfoSchema)
module.exports =PatientInfo




