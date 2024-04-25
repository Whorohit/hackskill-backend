const express = require('express')
const router = express.Router();
const fetchuser = require('../Middleware/index')
const Patient = require("../Modals/Patientinfo")
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');
router.post('/api/addinfo', fetchuser, [
    body('Disease', 'enter the  Disease name').isLength({ min: 2}),
    body('Documentname', 'enter the  Documentname').isLength({ min: 3 }),
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
                Hosptial,Remarks,DocumentPhoto,Documentname,Disease,IssuedDate,Pat_id:req.user.id,
                lab
            })
            saveinfo = await newPatient.save();
        


        return res.json({ saveinfo, success: true, message: "created successfully" })


    } catch (error) {
        console.error(error.message);
     return    res.status(500).send({ errors: "Internal Server error", success: false });
    }
});

router.get('/api/patientinfo',fetchuser, async (req, res) => {
    try {
      
  
      const notes = await Patient.find({
        Pat_id: req.user.id, 
      }) 
      // const notes = await ledger.find({ user: req.user, })
  
      res.json({ pateintinfolist: notes, success: true })
    } catch (error) {
      console.error(error.message);
     return  res.status(500).send({ errors: "Internal Server error", success: false });
    }
  
  }
  )

  router.post('/api/updateinfo/:id', fetchuser, [
    body('Disease', 'enter the  Disease name').isLength({ min: 2}),
    body('Documentname', 'enter the  Documentname').isLength({ min: 3 }),
    body('Hosptial', ' enter the Hosptial name').isLength({ min: 3 }),
    body('Remarks', 'Enter vaild Remarks').isLength({ min: 0,  }),
   
], async (req, res) => {
    try {
        
        const {
            Hosptial,Remarks,DocumentPhoto,Documentname,Disease,IssuedDate,
                    lab  
        } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            console.log(errorMessages);
            return res.status(400).json({ errors: errorMessages, success: false });

        }

        const id= req.params.id
        if(!id){
            res.status(200).send({ errors: "Provide the vaild Id", success: false });
        }        
            let updatepatintinfo = await Patient.findOneAndUpdate({_id: id }, {
                $set: {
                    Hosptial,Remarks,DocumentPhoto,Documentname,Disease,IssuedDate,
                    lab
                }
            }, { new: true });
        
        
        

        console.log(updatepatintinfo);
       return  res.json({ updatepatintinfo, success: true, message: "updated successfully" })


    } catch (error) {
        console.error(error.message);
       return   res.status(500).send({ errors: "Internal Server error", success: false });
    }
});
// router.post('/api/doctorlist',
// fetchuser, [
//     body('Disease', 'enter the  Disease name').isLength({ min: 2}),
//     body('Documentname', 'enter the  Documentname').isLength({ min: 3 }),
//     body('Hosptial', ' enter the Hosptial name').isLength({ min: 3 }),
//     body('Remarks', 'Enter vaild Remarks').isLength({ min: 0,  }),
   
// ], async (req, res) => {
//     try {
        
//         const {
//             Hosptial,Remarks,DocumentPhoto,Documentname,Disease,IssuedDate,
//                     lab  
//         } = req.body
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             const errorMessages = errors.array().map(error => error.msg);
//             console.log(errorMessages);
//             return res.status(400).json({ errors: errorMessages, success: false });

//         }

        
        
            
        
        
        

//         console.log(updatepatintinfo);
//         res.json({ updatepatintinfo, success: true, message: "updated successfully" })


//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send({ errors: "Internal Server error", success: false });
//     }
// })


module.exports = router