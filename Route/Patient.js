const express = require('express')
const router = express.Router();
const fetchuser = require('../Middleware/index')
const Patient = require("../Modals/Patientinfo")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');
router.post('/api/addinfo', fetchuser, [
    body('Disease', 'enter the  Disease name').isLength({ min: 2}),
    body('Documentname', 'enter the ').isLength({ min: 3 }),
    // body('IssuedDate', 'enter the firstname').isLength({ min: 10, max:10 }),
    body('Hosptial', ' enter the Hosptial name').isLength({ min: 3 }),
    body('Remarks', 'Enter vaild Remarks').isLength({ min: 0,  }),
   
], async (req, res) => {
    try {
       
        const {
            Hosptial,Remarks,Documentname,IssuedDate,Disease, lab, DocumentPhoto
        } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({ errors: errorMessages, success: false });

        }
    
            const newPatient = new Patient({
                Hosptial,Remarks,DocumentPhoto,Documentname,Disease,IssuedDate,id:req.user.id,
                lab
            })
            saveinfo = await newPatient.save();
        


        res.json({ saveinfo, success: true, message: "created successfully" })


    } catch (error) {
        console.error(error.message);
        res.status(500).send({ errors: "Internal Server error", success: false });
    }
});

router.get('/api/patientinfo',fetchuser, async (req, res) => {
    try {
      
  
      const notes = await Patient.find({
        id: req.user.id, 
      }) 
      // const notes = await ledger.find({ user: req.user, })
  
      res.json({ pateintinfolist: notes, success: true })
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ errors: "Internal Server error", success: false });
    }
  
  }
  )

module.exports = router