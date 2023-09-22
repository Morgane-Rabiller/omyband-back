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
                const announcement = await Announcement.findByPk(announcementId, {
                    attributes : {exclude : ["createdAt", "updatedAt"]},
                    include: ['user']
                });
                if(announcement) {
                    return res.status(200).json(announcement);
                } else {
                    return res.status(404).json('Announcement not found');
                }
            } catch (error) {
                console.error('Error:', error);
                return res.status(500).json({message : 'default in Announcement route', error: error});
            }
        },
}

export {announcementController}
