import { sendMail } from '../services/contactMail.js';
import 'dotenv/config';
import { announcementController } from './announcementController.js';

const contactController = {

    contactAdmin: async (req, res) => {

            const to = process.env.EMAIL;
            const { subject, text } = req.body;
            await sendMail(to, subject, text);
            
            res.status(200).send({success: true, message: 'Email envoyé !'});
    },

    //! NEED :
    // Annoucement User (pour récupérer son mail),
    // Je le récupère avec l'id Annoucement pour donc à envoyer par le front
    // -> j'ai mon user_id
    // -> j'ai mon Subject a contruire avec le nom de l'annonce et autre ... 
    
    // Le Text : Je récupère le message 
    // -> je construit mon message en inscrivant le mais du user qui répond à l'annonce. 
    
    contactAnnouncement: async (req, res) => {
        console.log("MonUserMail", req.user.email);
        const announcementId = parseInt(req.body.announcement_id, 10);
        const announcement = await announcementController.findAnnouncementById(announcementId);
        console.log("Mon Annonce", announcement.user);

        return "Fini";
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

export { contactController };
