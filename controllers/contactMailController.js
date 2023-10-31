const {sendMailAnnouncement, createHTML} = require('../services/contactMail.js');
require('dotenv').config();
const announcementController = require('./announcementController.js');

const contactController = {

    contactAdmin: async (req, res) => {
        try{
            const to = process.env.EMAIL;
            const { subject, text } = req.body;
            await sendMail(to, subject, text);
            
            res.status(200).send({success: true, message: 'Email envoyé !'});

        } catch (error) {
            res.status(500).send({ success: false, message: 'Error !', error: error.message });
        }
    },

    //! NEED :
    // Annoucement User (pour récupérer son mail),
    // Je le récupère avec l'id Annoucement pour donc à envoyer par le front
    // -> j'ai mon user_id
    // -> j'ai mon Subject a contruire avec le nom de l'annonce et autre ... 
    
    // Le Text : Je récupère le message 
    // -> je construit mon message en inscrivant le mais du user qui répond à l'annonce. 
    
    contactAnnouncement: async (req, res) => {
        
        const announcementId = parseInt(req.body.announcement_id, 10);
        const announcement = await announcementController.findAnnouncementById(announcementId);
        // console.log("MonUserMail", req.user.email);
        // console.log("Mon Annonce", announcement.user);

        const to = "mathgiraud33@gmail.com";
        const { subject, text } = req.body;
        const html = createHTML(announcement, req.user, text);
        await sendMailAnnouncement(to, subject, html);

        return res.status(200).send({success: true, message: 'Email envoyé !'});
//         try{
//             const to = process.env.EMAIL;
//             const { subject, text } = req.body;
//             await sendMail(to, subject, text);
            
//             res.status(200).send({success: true, message: 'Email envoyé !'});

//         } catch (error) {
//             res.status(500).send({ success: false, message: 'Error !', error: error.message });
//         }
    },
};

module.exports = contactController;
