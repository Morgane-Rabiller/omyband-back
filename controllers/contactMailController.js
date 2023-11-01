const sendMail = require('../services/contactMail.js');
const createHtmlResponseAnnouncement = require('../services/templatesHtml/ResponseAnouncement.js');
const createHtmlResponseConfirmation = require('../services/templatesHtml/ConfirmationSendedMail.js');
const createHtmlContactAdmin = require('../services/templatesHtml/ContactAdmins.js');
require('dotenv').config();
const announcementController = require('./announcementController.js');

const contactController = {

    contactAdmin: async (req, res) => {
        //! Pour l'instant me manque l'info de savoir si j'ai un user ou nous ... 
        //! me faut une fonction de check du accessToken ... 
        //! sans qu'elle bloque la progression.
        const to = process.env.EMAIL;
        const { subject, text } = req.body;
        if (req.user) {
            const htmlToAdmin = createHtmlContactAdmin(req.user, text);
            await sendMail(to, subject, htmlToAdmin);
        } else {
            const htmlToAdmin = createHtmlContactAdmin( "" ,text);
            await sendMail(to, subject, htmlToAdmin);
        }
            
        if (req.user) {
            const htmlConfirmation = createHtmlResponseConfirmation( "", req.user, text);
            const subjectConfirmation = "Ton message a bien été envoyé !"
            const toUser = req.user.email;
            await sendMail(toUser, subjectConfirmation, htmlConfirmation);
        }
        res.status(200).send({success: true, message: 'Email envoyé !'});
    },
    
    contactAnnouncement: async (req, res) => {
        
        const announcementId = parseInt(req.body.announcement_id, 10);
        const announcement = await announcementController.findAnnouncementById(announcementId);

        //const to = announcement.user.email;
        const to = "mathgiraud33@gmail.com";
        const { subject, text } = req.body;
        const htmlAnnoucementResponse = createHtmlResponseAnnouncement(announcement, req.user, text);
        await sendMail(to, subject, htmlAnnoucementResponse);
        const htmlConfirmation = createHtmlResponseConfirmation(announcement, req.user, text);
        const subjectConfirmation = "Ton message a bien été envoyé !"
        await sendMail(to, subjectConfirmation, htmlConfirmation);
        return res.status(200).send({success: true, message: 'Email envoyé !'});
    },
};

module.exports = contactController;
