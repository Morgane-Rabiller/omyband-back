require('dotenv').config();


const createHtmlResponseConfirmation = (announcement, user, text) => {
    if (announcement) {
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
                .h3 {
                    color: black;
                }
                .h4 {
                    color: black;
                }
                .h5 {
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
                                    <h1 style="font-size: 1.5rem; color: #CBE4DE; font-family: 'Vampiro One', sans-serif; vertical-align: middle; margin: 0;">O'MY BAND</h1>
                                </td>
                                <td align="right" style="color: #CBE4DE; padding: 20px;">
                                    <h3>Bonjour ${user.pseudo} !</h3>
                                </td>
                                </tr>
                            </table>
                
                            <!-- Contenu du corps de l'e-mail -->
                            <table width="100%" cellspacing="0" cellpadding="20" border="0">
                                <tr style="background-color: #fff; width: 100%;">
                                    <td colspan="3">
                                        <h3>Ton message à ${announcement.user.pseudo} a bien été envoyé !</h3>
                                        <p style="border-bottom: 1px solid black;"></p>
                                        <h5>Tu as écrit : </h5>
                                        <p>${text}</p>
                                        <p style="border-bottom: 1px solid black;"></p>
                                        <p>Si tu n'es pas à l'origine de ce message, n'hésite pas à nous contacter.</p>
                                    </td>
                                </tr>
                            </table>
                
                            <!-- Pied de page avec liens -->
                            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0e8388; border-radius: 0 0 10px 10px;">
                                <tr>
                                    <td align="center" style="padding: 10px 20px;">
                                        <a href="mailto:${process.env.EMAIL}" style="color: #CBE4DE; text-decoration: none; font-size: 14px;">Contacter les administrateurs</a>
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
    } else {
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
                .h3 {
                    color: black;
                }
                .h4 {
                    color: black;
                }
                .h5 {
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
                                    <h1 style="font-size: 1.5rem; color: #CBE4DE; font-family: 'Vampiro One', sans-serif; vertical-align: middle; margin: 0;">O'MY BAND</h1>
                                </td>
                                <td align="right" style="color: #CBE4DE; padding: 20px;">
                                    <h3>Bonjour ${user.pseudo} !</h3>
                                </td>
                                </tr>
                            </table>
                
                            <!-- Contenu du corps de l'e-mail -->
                            <table width="100%" cellspacing="0" cellpadding="20" border="0">
                                <tr style="background-color: #fff; width: 100%;">
                                    <td colspan="3">
                                        <h3>Ton message aux administrateurs a bien été envoyé !</h3>
                                        <p style="border-bottom: 1px solid black;"></p>
                                        <h5>Tu as écrit : </h5>
                                        <p>${text}</p>
                                        <p style="border-bottom: 1px solid black;"></p>
                                        <p>Si tu n'es pas à l'origine de ce message, n'hésite pas à nous contacter.</p>
                                    </td>
                                </tr>
                            </table>
                
                            <!-- Pied de page avec liens -->
                            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0e8388; border-radius: 0 0 10px 10px;">
                                <tr>
                                    <td align="center" style="padding: 10px 20px;">
                                        <a href="mailto:${process.env.EMAIL}" style="color: #CBE4DE; text-decoration: none; font-size: 14px;">Contacter les administrateurs</a>
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
}
module.exports = createHtmlResponseConfirmation ;