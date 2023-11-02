require('dotenv').config();
const fs = require('fs');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAILPASS,
    }
});

const logoBuffer = fs.readFileSync('./services/imgs/Omy_band-Logo.png');
const logoAttachment = {
    filename: 'Omy_band-Logo.png',
    content: logoBuffer,
    cid: 'logo',
};

const sendMail = async (to, subject, html) => {
    const  mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html,
        attachments: [logoAttachment],
    };
    return transporter.sendMail(mailOptions);
}

// const mailOptions = {
//     from: process.env.EMAIL,
//     to: 'mathgiraud33@gmail.com',
//     subject: 'Test de Nodemailer',
//     html: `<h1>Ceci est un test!</h1> Et normalement mon .env passe !<br/> ${process.env.EMAIL}`
// };

// transporter.sendMail(mailOptions, function(error, info){
// if (error) {
//     console.log(error);
// } else {
//     console.log('Email envoyé: ' + info.response);
// }
// });


module.exports = sendMail;