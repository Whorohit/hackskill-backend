const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const login = require('../Modals/Loginmodal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/index')
const nodemailer = require("nodemailer");
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const tokenkey = "mynamrisrohit"

router.post('/auth/signup', [
    body('firstname', 'should  be greater than 5 character').isLength({ min: 3 }),
    body('lastname', 'should  be greater than 5 character').isLength({ min: 3 }),
    body('email', 'enter the vaild email').isEmail(),
    body('password', 'enter the strong password').isLength(
        { min: 7 },
    ).matches(/^[a-zA-Z0-9]+$/),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success:false, errors: errors });
    }
    const { email, password,lastname,firstname } = req.body
    try {
        let usr = await login.findOne({ email: req.body.email })
        if (usr) {
            return res.status(400).json({ success:false, errors: "email id already Exists use differnent id" });
        }
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, salt);
        const user = await login.create({
            firstname: firstname,
            lastname:lastname,
            password: pass,
            email: email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        // console.log(data);
        var token = await jwt.sign(data, tokenkey, {
            expiresIn: '30m'
        });
        success = true
        res.json({ success:true, token, id: user.id,firstname:user.firstname, })
        console.log(user)

    }
    catch (error) {
        res.status(200).send({success:false,errors:"techincal error bro"})

    }
})
router.post('/auth/login', [
    body('email', 'email should  be proper ').isEmail(),
    body('password', 'password should be greater  than   7 characters').isLength({ min: 7 })
],
    async (req, res) => {
        const errors = validationResult(req);
        let success = false
        if (!errors.isEmpty) {
            return res.status(400).json({ errors: errors.array(), success: false });
        }
        const { email, password } = req.body
        try {
            let user = await login.findOne({ email })
            if (!user) {
                return res.status(400).json({ success, errors: "enter with correct user name and  password" });

            }
            const pascomapre = await bcrypt.compare(password, user.password);
            if (!pascomapre) {
                return res.status(400).json({ success: false, errors: "enter with ddd correct user name and  password" });

            }
            const data = {
                user: {
                    id: user.id
                }
            }
            var token = await jwt.sign(data, tokenkey, {
                expiresIn: '30m'
            });
            success = true
            let userinfo = await login.findOne({ email }).select("-password")
            res.status(200).json({ success: true, token, id: user._id, userinfo: userinfo })
            console.log(user, token, 'ttt')

        } catch (error) {
            res.status(500).send({ errors: "techincal error", success: false })
        }
    })

router.get('/auth/getuser', fetchuser, async (req, res) => {

    try {
        const userid = req.user;
        const user = await login.findById(userid).select("-password")
        res.json({user:user,success:true})
    } catch (error) {
        console.error(error.message);
        res.status(500).send({errors:"Internal Server Error",success:false});
    }
})
router.post('/auth/updateuserinfo', [
    // body('firstname', 'title cannot be smaller than 2 characters').isLength({ min: 2 }),
    // body('lastname', 'enter the  correct amount').isLength({ min: 1 }),
    // body('dob', 'enter the vaild time!').isLength({ min: 5 }),
    // body('mobile', 'enter the vaild  price').isLength({ min: 10, max: 10 }),
    // body('pincode', 'enter the vaild   pincode').isLength({ min: 6, max: 6 }),
    // body('business', 'enter the vaild   pincode').isLength({ min: 6, max: 6 }),
    // body('address', 'enter the vaild   address').isLength({ min: 5, max: 40 }),
    // body('email', 'enter the vaild   Email id').isEmail({ max: 40 }),

], fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array(),success:false });
    }
    const { firstname, lastname, pincode, mobile, email, dob,address,userprofile } = req.body
    try {
        const userid = req.user._id;
        let updateuserinfo = {}
        
      if (firstname) { updateuserinfo.firstname = firstname }
      if (dob) { updateuserinfo.dob =dob }
      if (lastname) { updateuserinfo.lastname = lastname }
      if (pincode) { updateuserinfo.pincode = pincode }
      if (mobile) { updateuserinfo.mobile =mobile }
      
      if (email) { updateuserinfo.email = email }
      if (address) { updateuserinfo.address = address }
      if(userprofile){
        updateuserinfo.userprofile =userprofile 
      }
        const user = await login.findByIdAndUpdate(req.user._id, { $set: updateuserinfo }, { new: true })
        console.log(user);
        console.log("helllll");
        res.json({message:"Changed info successfully",success:true})
    } catch (error) {
        console.error(error.message);
        res.status(500).send({error:"Internal Server Error",success:false});
    }
})





module.exports = router