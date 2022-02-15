const nodemailer = require('nodemailer');

// crear conexión con los datos SMTP
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

transporter.verify().then( () => {
    console.log('Listo para mandar emails');
});

module.exports = transporter;