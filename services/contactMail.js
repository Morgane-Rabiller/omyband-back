import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAILPASS,
    }
});

const sendMail = async (to, subject, text) => {
    const  mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text,
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

export { sendMail };