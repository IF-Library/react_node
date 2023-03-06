const path = require("path")
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
require('dotenv').config();
// const { host, port, user, pass } = require("../config/mail.json")

// config para enviar o email (gmail neste caso)
const transport = nodemailer.createTransport({
  service: 'gmail', 
  host: "smtp.gamil.com",
  auth: { 
     user: process.env.EMAIL, 
     pass: process.env.EMAIL_APP_PASSWORD
   } 
});

// config para mandar email através de um arquivo com layout pronto
transport.use('compile', hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./resources/mail/'),
    extName: '.html',
  }));

module.exports = transport;