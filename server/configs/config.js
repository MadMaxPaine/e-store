const { config } = require("dotenv");
require("dotenv").config();

module.exports = {
  jwt: {
    secret: process.env.SECRET_KEY || "your_secret_key", // Use env variable for security
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m", // Секрет для токенів доступу
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d", // Секрет для refresh токенів    
  },
  database: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    name: process.env.DB_NAME || "e_store",
    dialect: "mysql", // Вказуємо тип БД, в даному випадку MySQL
    port: process.env.DB_PORT || 3306, // Порт для MySQL
  },
  server: {
    port: process.env.PORT || 5000,
    apiUrl: process.env.API_URL || "http://localhost:5000",
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  },
  mail: {
    host: process.env.SMTP_HOST || "smtp.gmail.com", // SMTP сервер
    port: process.env.SMTP_PORT || 587, // Порт для відправки пошти
    user: process.env.SMTP_USER, // Пошта для відправки листів
    pass: process.env.SMTP_PASSWORD, // Пароль або app-specific password
    secure: process.env.SMTP_SECURE === 'true', // Якщо secure=true, використовуємо TLS
    from: process.env.SMTP_USER, // Від кого листи будуть надсилатися
  },
  get: (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), config);
  },
};
