require('dotenv').config();
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
const logoAttachment = {
    filename: 'Omy_band-Logo.png',
    path: '/assets/imgs/Omy_band-Logo.png',
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
const createHTML = (announcement, user, text) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            .h1 {
                color: #CBE4DE;
                font-family: "Vampiro One", sans-serif; 
                margin: 0;
            }
            .h2 {
                color: black;
            }
            .p {
                color: black;
            }
        </style>
    </head>
        <body style="font-family: "Montserrat", sans-serif; background-color: #fff; margin: 0; padding: 0;">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fff;">
                <tr>
                <td align="center" style="padding: 20px;">
                    <table width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #CBE4DE; border-radius: 10px;">
                    <tr>
                        <td>
            
                        <!-- En-tête avec logo et nom -->
                        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0E8388; border-radius: 10px 10px 0 0;">
                            <tr>
                            <td style="padding: 20px; display: flex; align-items: center;">
                                <img src="cid:logo" width="65" height="65" alt="Logo O'my band" style="margin-right: 10px;" />
                                <h1 style="font-size: 1.5rem; color: #CBE4DE; font-family: 'Vampiro One', sans-serif; margin: 0;">O'MY BAND</h1>
                            </td>
                            <td align="right" style="color: #CBE4DE; padding: 20px;">
                                <h3>Bonjour ${announcement.user.pseudo} !</h3>
                            </td>
                            </tr>
                        </table>
            
                        <!-- Contenu du corps de l'e-mail -->
                        <table width="100%" cellspacing="0" cellpadding="20" border="0">
                            <tr style="background-color: #fff; width: 100%;">
                                <td colspan="3">
                                    <h4>Tu as reçu une réponse concernant l'annonce suivante :</h4>
                                </td>
                            </tr>
                            <tr style="border-top: 10px solid #CBE4DE; border-bottom: 10px solid #CBE4DE;">
                                <td style="background-color: #fff; width: 10%;"></td>
                                <td>
                                    <h2 style="color: #0E8388; margin-top: 0;">${announcement.title}</h2>
                                    <p style="margin: 0;">Description de l'annonce : ${announcement.description}</p>
                                </td>
                                <td style="background-color: #fff; width: 10%;"></td>
                            </tr>
                            <tr style="background-color: #fff; width: 100%;">
                                <td colspan="3">
                                    <h4>${user.pseudo} t'as envoyé ce message :</h4>
                                    <p style="margin: 0;">${text}</p>
                                    <p style="border-bottom: 1px solid black;"></p>
                                    <p>${user.pseudo} vient de ${user.location} et se décrit comme ceci : </p>
                                    <p>${user.description}</p>  
                                </td>
                            </tr>
                        </table>
            
                        <!-- Pied de page avec liens -->
                        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0e8388; border-radius: 0 0 10px 10px;">
                            <tr>
                            <td align="center" style="padding: 10px;">
                                <a href="mailto:${user.email}" style="color: #CBE4DE; text-decoration: none; font-size: 16px; font-weight: bold;">Répondre</a>
                            </td>
                            <td align="center" style="padding: 10px;">
                                <a href="mailto:${process.env.EMAIL}" style="color: #CBE4DE; text-decoration: none; font-size: 14px;">Contactez l'administrateur</a>
                            </td>
                            </tr>
                        </table>
            
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
        </body>
    </html>
    `;
    return htmlContent;
}

module.exports =  { sendMail, createHTML };