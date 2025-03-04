const nodemailer = require('nodemailer');
const cfg = require('../configs/config');
class MailService {
 constructor() {
  this.transporter = nodemailer.createTransport({
   host: cfg.mail.host,
   port: cfg.mail.port,
   secure: false,
   auth: {
    user: cfg.mail.user,
    pass: cfg.mail.pass,
   }
  });
 }

 async sendActivationMail(to, link) {
  await this.transporter.sendMail({
   from: cfg.mail.user,
   to,
   subject: "Activation of you're account. " + cfg.server.apiUrl,
   text: "",
   html:
    `<div>
     <h1>Follow this to activate you're account! Thanks</h1>
     <a href="${link}">${link}</a>
    </div>`
  });
 }
}


module.exports = new MailService();