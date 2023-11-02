const sendMail = require('../services/contactMail.js');
const {addTokenUser} = require('./authController.js');
const createHtmlResponseAnnouncement = require('../services/templatesHtml/ResponseAnouncement.js');
const createHtmlResponseConfirmation = require('../services/templatesHtml/ConfirmationSendedMail.js');
const createHtmlContactAdmin = require('../services/templatesHtml/ContactAdmins.js');
require('dotenv').config();
const announcementController = require('./announcementController.js');

const sanitizeHtml = require('sanitize-html');

const defaultOptionsSanitize = {
    allowedTags: [],
    allowedAttributes: {}
}


const contactController = {

    contactAdmin: async (req, res) => {
        //Vérification de la présence ou non d'un token
        //Si présent, nous retour le user qui envoie le message pour qu'il ait une confirmation d'envoie.
        //Sinon envoie le message seulement aux admin.
        const user = addTokenUser(req)
        const to = process.env.EMAIL;
        const { subject, text } = req.body;
        if (user == "") {
            const htmlToAdmin = createHtmlContactAdmin( "" ,text);
            await sendMail(to, subject, htmlToAdmin);
        } else {
            const htmlToAdmin = createHtmlContactAdmin(user, text);
            await sendMail(to, subject, htmlToAdmin);
        }

        if (user) {
            const htmlConfirmation = createHtmlResponseConfirmation( "", user, text);
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
