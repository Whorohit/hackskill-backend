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
const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.log(222);
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}
const mongodbsend = () => {
    mongoose.connect(ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 100000,
    })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err));
}
mongodbsend();
LoginSchema();
PatientInfo();
//  login route
app.post('/auth/login',loginroute)
app.post('/auth/signup',loginroute)
app.post('/api/updateuser/:loginid',loginroute)
app.get('/api/getinfo',loginroute)
// user  opertion route

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})
// app.post('/api/signup',routes)