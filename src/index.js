require('./db/mongoose');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express')
const app = express();
// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
//to get data json from postman
app.use(express.json())


const port = process.env.PORT || 8080

var cors = require('cors');
app.use(cors())
app.use(cors({ credentials: true, origin: 'https://juv-khaled.herokuapp.com' }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));


//Routes
const authRoutes = require('./routes/user')
app.use("/api", authRoutes);

const pathupload = path.join(__dirname, '../uploads')
app.use('../uploads', express.static(pathupload));
console.log(pathupload);


app.use('/imgs', express.static(path.join(__dirname, '../uploads')));







//for deployment 
app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
 app.listen(port, () => {
  console.log('ok')
})

module.exports = app