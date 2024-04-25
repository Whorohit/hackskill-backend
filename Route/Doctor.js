const express = require('express')
const router = express.Router();
const fetchuser = require('../Middleware/index')
const Patient = require("../Modals/Patientinfo")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');
const DoctorInfo = require('../Modals/DoctorModal');

router.post('/api/createdoctor',
fetchuser, [
    body('firstname', 'enter the   name').isLength({ min: 2}),
    body('lastname', 'enter the last name').isLength({ min: 3 }),
    body('Hospital', ' enter the Hosptial name').isLength({ min: 3 }),
    body('email', 'Enter vaild email').isEmail({ min: 10,max:10  }),
    body('Speciality', 'Enter vaild Speciality ').isLength({ min: 3 }),
    body('mobile', 'Enter vaild number').isLength({ min: 10,max:10  }),
    
   
], async (req, res) => {
    try {
        
        const {
            firstname,lastname,Hospital,email,mobile, profilephoto,Speciality
        } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            console.log(errorMessages);
            return res.status(400).json({ errors: errorMessages, success: false });

        }       
        const newDoctor = new DoctorInfo({
            firstname,lastname,Hospital,email,mobile, profilephoto,Speciality
        })
        saveinfo = await newDoctor.save();
    
console.log(saveinfo);

     return  res.json({ saveinfo, success: true, message: "created successfully" })
        
        

       
      


    } catch (error) {
        console.error(error.message);
       return  res.status(500).send({ errors: "Internal Server error", success: false });
    }
})

router.get('/api/doctorsinfo',fetchuser, async (req, res) => {
    try {
      
  
      const doctor = await DoctorInfo.find({
       
      }) 
      // const notes = await ledger.find({ user: req.user, })
   console.log(ni);
      res.json({ doctorinfolist: doctor, success: true })
    } catch (error) {
      console.error(error.message);
     return  res.status(500).send({ errors: "Internal Server error", success: false });
    }
  
  }
  )

  module.exports = router