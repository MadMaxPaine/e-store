const cfg= require('./configs/config');
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const mysql = require("mysql2/promise");
const sequelize = require("./db");
const { parse } = require("dotenv");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMiddleware");



const app = express();
const PORT = cfg.server.port || 7000;


app.use(express.json());
app.use(cookieParser());
app.use(
  express.static(path.resolve(__dirname, "static"), {
    setHeaders: (res, path) => {
      console.log(`Requesting file: ${path}`);
    },
  })
);
app.use(fileUpload({}));
app.use(
  cors({
    credentials: true,
    origin: cfg.server.clientUrl,
  })
);
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is online!" });
});

app.use(errorHandler);

const start = async () => {
  try {
    const connection = await mysql.createConnection({
      host: cfg.database.host,
      port: cfg.database.port,
      user: cfg.database.user,
      password: cfg.database.password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`e-store\`;`);
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is starting on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
