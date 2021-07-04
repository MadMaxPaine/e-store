require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const model = require('./models/models');
const { parse } = require('dotenv');
const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
 res.status(200).json({message:'Working!!!'});
});

const start = async () => {
 try {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(PORT, () => console.log(`Server is starting on port: ${PORT}`));
 }
 catch (e) {
  console.log(e);

 }
}

start();

