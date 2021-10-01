require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');

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
 res.status(200).json({ message: 'Working!!!' });
});

//Err handler. Must be in the end because have no next inside
app.use(errorHandler);

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

