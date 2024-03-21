const { Announcement, User } = require("../models/associations.js");

const sanitizeHtml = require('sanitize-html');

const defaultOptionsSanitize = {
    allowedTags: [],
    allowedAttributes: {}
}


const announcementController = {
    getAnnouncement: async (req, res) => {
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = (page * limit);

        const filters = {
            instruments: req.query.instruments ? req.query.instruments.split(',') : null,
            styles: req.query.styles ? req.query.styles.split(',') : null,
            userType: req.query.userType || null,
            researchType: req.query.researchType || null,
            userLocation: req.query.userLocation || null,
        };

            const announcements = await Announcement.findAll({
                include : [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: ["updated_at", 'password']
                        },
                        include:['role','instruments']
                    },
                    'instruments',
                    'styles',
                    'userType',
                    'researchType'
                ],
                order: [['created_at', 'DESC']],
            });
            if (announcements) {
                filteredAnnouncements = announcements.filter((announcement) => {
                    return (
                        (!filters.instruments || filters.instruments.some(filterInstrument => announcement.instruments.some(announcementInstrument => parseInt(filterInstrument) === announcementInstrument.instrument_id))) &&
                        (!filters.styles || filters.styles.some(filterStyle => announcement.styles.some(announcementStyle => parseInt(filterStyle) === announcementStyle.style_id))) &&
                        (!filters.userType || announcement.user_type === parseInt(filters.userType)) &&
                        (!filters.researchType || announcement.research_type  === parseInt(filters.researchType)) &&
                        (!filters.userLocation || announcement.user.location === filters.userLocation)
                    );
                });
                paginatedAnnouncements = filteredAnnouncements.slice(startIndex, endIndex);
                formatedResponse = {
                    page,
                    limit,
                    total: filteredAnnouncements.length,
                    data: paginatedAnnouncements,
                };
                
                return res.status(200).json(formatedResponse);
            } else {
                return res.status(500).json({ message: "Announcements not return"});
            }
        
    },
    getAnnouncementById : async (req, res) => {
            const announcementId = parseInt(req.params.id, 10);
                const announcement = await announcementController.findAnnouncementById(announcementId);
                if(announcement) {
                    return res.status(200).json(announcement);
                } else {
                    return res.status(404).json('Announcement not found');
                }
    },
    createAnnouncement: async (req, res) => {
        const { body } = req;
        for (const key in body) {
            if (typeof body[key] === 'string') {
                req.body[key] = sanitizeHtml(req.body[key], defaultOptionsSanitize);
            }
        }

        body.user_id = parseInt(req.user.user_id, 10);
    

    
        const announcement = await Announcement.create({ ...body });
                announcement.setUser(body.user_id);
                if (body.instruments) {
                    body.instruments.forEach(instrument => {
                        announcement.setInstruments(instrument.instrument_id);
                    });
                }
                if (body.styles) {
                    body.styles.forEach(style => {
                        announcement.setStyles(style.style_id);
                    });
                }
            return res.status(201).json({ message: "Announcement created", announcement })
    },
    updateAnnouncement: async (req, res) => {
        const announcementId = parseInt(req.params.id, 10);
            const announcementToUpdate = await Announcement.findByPk(announcementId);
        const { body } = req;
        for (const key in body) {
            req.body[key] = sanitizeHtml(req.body[key], defaultOptionsSanitize);
    }  
            await announcementToUpdate.update({...body});
            res.status(201).json({message : "Annonce modifié", announcement: announcementToUpdate});

    },
    deleteAnnouncement: async (req, res) => {

            const announcementId = parseInt(req.params.id, 10);
            const announcementToDelete = await Announcement.findByPk(announcementId);
            await announcementToDelete.destroy({ where: { announcement_id: announcementToDelete } })
            res.status(201).json({message : "Annonce supprimé", announcement: announcementToDelete});
    },

    findAnnouncementById: async (announcementId) => {
            const announcement = await Announcement.findByPk(announcementId, {
                    attributes : {exclude : ["createdAt", "updatedAt"]},
                    include : [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: ["updated_at", 'password']
                        },
                        include:['role','instruments']
                    },
                    'instruments',
                    'styles', 
                    'userType', 
                    'researchType'
                ]
            });
            return announcement;
    },
}

module.exports = announcementController;
