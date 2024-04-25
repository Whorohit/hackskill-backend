const mongoose = require('mongoose')
const DoctorInfoSchema = mongoose.Schema({
   
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    Hospital: {
        type: String,
        require: true,
        
    },
    mobile: {
        type: Number,
        max: 10,
        min:10
    },
    email: {
        type: String,
        required: true,
    
    },
    profilephoto: {
    
        type: String
    }, 
    Speciality:{
        type:String
    }
    
    


    
    
    
})
const DoctorInfo = mongoose.model('DoctorInfo', DoctorInfoSchema)
module.exports = DoctorInfo




