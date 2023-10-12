import Announcement from "../models/announcementModel.js";

const announcementController = {
    getAnnouncement: async (req, res) => {
        try {
            const announcements = await Announcement.findAll()
            if (announcements) {
                return res.status(200).json(announcements);
            } else {
                return res.status(500).json({ message: "Announcements not return"});
            }
        } catch(error) {
            res.status(500).json({message : 'default in Announcement route', error: error});
        }
    },
    getAnnouncementById : async (req, res) => {
            const announcementId = parseInt(req.params.id, 10);
            try {
                const announcement = await announcementController.findAnnouncementById(announcementId);

                if(announcement) {
                    return res.status(200).json(announcement);
                } else {
                    return res.status(404).json('Announcement not found');
                }
            } catch (error) {
                return res.status(500).json({message : 'default in Announcement route', error: error});
            }
    },
    createAnnouncement: async (req, res) => {
        const { body } = req;
        try {
            const announcement = await Announcement.create({...body})
            return res.status(201).json({ message: "Announcement created", announcement })
        } catch (error) {
            return res.status(500).json({ message: 'default in Announcement Creation route', error: error });
            
        }
    },
    updateAnnouncement: async (req, res) => {
        const announcementId = parseInt(req.params.id, 10);
        try {
            const announcementToUpdate = await Announcement.findByPk(announcementId);
            const { body } = req;
            await announcementToUpdate.update({...body});
            res.status(201).json({message : "Annonce modifié", announcement: announcementToUpdate});

        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteAnnouncement: async (req, res) => {
    
        try {
            const announcementId = parseInt(req.params.id, 10);
            const announcementToDelete = await Announcement.findByPk(announcementId);
            await announcementToDelete.destroy({ where: { announcement_id: announcementToDelete } })
            res.status(201).json({message : "Annonce supprimé", announcement: announcementToDelete});

        } catch (error) {
            res.status(500).json(error);
        }
    },

    findAnnouncementById: async (announcementId) => {
        console.log(announcementId);
        try {
            const announcement = await Announcement.findByPk(announcementId, {
                attributes : {exclude : ["createdAt", "updatedAt"]},
                include: ['user']
            });
            return announcement;
        } catch (error) {
            return res.status(500).json({message : 'default in Announcement route', error: error});
        }
    },
}

export {announcementController};
