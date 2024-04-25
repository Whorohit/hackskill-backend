const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app=express();
require('dotenv').config()
const port = 5000
app.use(cors());
app.use(express.json())
const LoginSchema = require('./Modals/Loginmodal');
const PatientInfo = require('./Modals/Patientinfo');
const loginroute=require('./Route/LoginAuth')
const patientroute=require('./Route/Patient')
const Doctor=require("./Modals/DoctorModal")
const Doctorroute=require("./Route/Doctor")
const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.log(222);
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}
mongoose.connect(ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 100000,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));
LoginSchema();
PatientInfo();
Doctor();
//  login route
app.post('/auth/login',loginroute)
app.post('/auth/signup',loginroute)
app.post('/api/updateuser/:loginid',loginroute)
app.get('/api/getinfo',loginroute)
// user  opertion route
app.post('/api/addinfo',patientroute)
app.get('/api/patientinfo',patientroute)
app.post('/api/updateinfo/:id',patientroute)
app.post('/api/createdoctor',Doctorroute)
app.post('/api/doctorsinfo',Doctorroute)

app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})
// app.post('/api/signup',routes)