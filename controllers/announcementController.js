const { Announcement, User } = require("../models/associations.js");

const sanitizeHtml = require("sanitize-html");

const defaultOptionsSanitize = {
    allowedTags: [],
    allowedAttributes: {},
};

const announcementController = {
    getAnnouncement: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const filters = {
            instruments: req.query.instruments
                ? req.query.instruments.split(",")
                : null,
            styles: req.query.styles ? req.query.styles.split(",") : null,
            userType: req.query.userType || null,
            researchType: req.query.researchType || null,
            userLocation: req.query.userLocation || null,
        };

        const announcements = await Announcement.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: {
                        exclude: ["updated_at", "password"],
                    },
                    include: ["role", "instruments"],
                },
                "instruments",
                "styles",
                "userType",
                "researchType",
            ],
            order: [["created_at", "DESC"]],
        });
        if (announcements) {
            filteredAnnouncements = announcements.filter((announcement) => {
                return (
                    (!filters.instruments ||
                        filters.instruments.some((filterInstrument) =>
                            announcement.instruments.some(
                                (announcementInstrument) =>
                                    parseInt(filterInstrument) ===
                                    announcementInstrument.instrument_id
                            )
                        )) &&
                    (!filters.styles ||
                        filters.styles.some((filterStyle) =>
                            announcement.styles.some(
                                (announcementStyle) =>
                                    parseInt(filterStyle) ===
                                    announcementStyle.style_id
                            )
                        )) &&
                    (!filters.userType ||
                        announcement.user_type ===
                            parseInt(filters.userType)) &&
                    (!filters.researchType ||
                        announcement.research_type ===
                            parseInt(filters.researchType)) &&
                    (!filters.userLocation ||
                        announcement.user.location === filters.userLocation)
                );
            });
            paginatedAnnouncements = filteredAnnouncements.slice(
                startIndex,
                endIndex
            );
            formatedResponse = {
                page,
                limit,
                total: filteredAnnouncements.length,
                data: paginatedAnnouncements,
            };

            return res.status(200).json(formatedResponse);
        } else {
            return res
                .status(500)
                .json({ message: "Announcements not return" });
        }
    },
    getAnnouncementById: async (req, res) => {
        const announcementId = parseInt(req.params.id, 10);
        const announcement = await announcementController.findAnnouncementById(
            announcementId
        );
        if (announcement) {
            return res.status(200).json(announcement);
        } else {
            return res.status(404).json("Announcement not found");
        }
    },
    createAnnouncement: async (req, res) => {
        const { body } = req;
        for (const key in body) {
            if (typeof body[key] === "string") {
                req.body[key] = sanitizeHtml(
                    req.body[key],
                    defaultOptionsSanitize
                );
            }
        }
        try {
            body.user_id = parseInt(req.user.user_id, 10);
            const { user_type, research_type, instruments, styles, description } = body;

            if(!user_type) {
                return res.status(401).json({ message: "Tu dois sélectionner ton rôle !" });
            }
            if(user_type === 1 && research_type === 0) {
                return res.status(401).json({ message: "Tu dois sélectionner quel type de rôle tu recherche !" });
            }
            if((user_type === 2 && instruments.length === 0) && (user_type === 2 && description === '')) {
                return res.status(401).json({ message: "Si tu ne trouves pas l'instrument que tu recherche dans la liste, précise le au moins dans ta description !" });
            }
            if((user_type === 2 && styles.length === 0) && (user_type === 2 && description.length === 0)) {
                return res.status(401).json({ message: "Si le style que tu recherche dans la liste, précise le au moins dans ta description !" });
            }

            const announcement = await Announcement.create({ ...body });
            announcement.setUser(body.user_id);
            if (body.instruments) {
                body.instruments.forEach((instrument) => {
                    announcement.setInstruments(instrument.instrument_id);
                });
            }
            if (body.styles) {
                body.styles.forEach((style) => {
                    announcement.setStyles(style.style_id);
                });
            }
            return res
                .status(201)
                .json({ message: "Annonce créée ✔", announcement });
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Annonce non créée"})
        }
    },
    updateAnnouncement: async (req, res) => {
        const announcementId = parseInt(req.params.id, 10);
        const announcementToUpdate = await Announcement.findByPk(
            announcementId
        );

        try {
            const { body } = req;

            for (const key in body) {
                if (typeof body[key] === "string") {
                    req.body[key] = sanitizeHtml(
                        req.body[key],
                        defaultOptionsSanitize
                    );
                }
            }
            const { instruments, styles } = body;
            await announcementToUpdate.setInstruments(
                instruments.map((instrument) => instrument.instrument_id)
            );
            
            await announcementToUpdate.setStyles(
                styles.map((style) => style.style_id)
            );
    
            await announcementToUpdate.update({ ...body });
            res.status(201).json({
                message: "Annonce modifié",
                announcement: announcementToUpdate,
            });
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "L'annonce n'a pas été modifiée" });
        }
    },
    deleteAnnouncement: async (req, res) => {
        const announcementId = parseInt(req.params.id, 10);
        const announcementToDelete = await Announcement.findByPk(
            announcementId
        );
        await announcementToDelete.destroy({
            where: { announcement_id: announcementToDelete },
        });
        res.status(201).json({
            message: "Annonce supprimé",
            announcement: announcementToDelete,
        });
    },

    findAnnouncementById: async (announcementId) => {
        const announcement = await Announcement.findByPk(announcementId, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: {
                        exclude: ["updated_at", "password"],
                    },
                    include: ["role", "instruments"],
                },
                "instruments",
                "styles",
                "userType",
                "researchType",
            ],
        });
        return announcement;
    },
};

module.exports = announcementController;
