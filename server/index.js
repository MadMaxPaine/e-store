require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2/promise');
const sequelize = require('./db');
const model = require('./models/models');
const { parse } = require('dotenv');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandlingMiddleware');

const app = express();
const PORT = process.env.PORT || 7000;


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(cors({
 credentials: true,
 origin: process.env.CLIENT_URL
}));
app.use('/api', router);


app.get('/', (req, res) => {
 res.status(200).json({ message: 'Server is online!' });
});

//Err handler. Must be in the end because have no next inside
app.use(errorHandler);

const start = async () => {
 try {
  //Try if db exists and addnew one if it doesn't
  const connection = await mysql.createConnection(
   {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
   });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`e-store\`;`);
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Server is starting on port: ${PORT}`));
 }
 catch (e) {
  console.log(e);

 }
}

start();

