const { User } = require("../models/associations.js");
const bcrypt = require("bcrypt");

const sanitizeHtml = require("sanitize-html");
const PasswordResetToken = require("../models/passwordResetToken.js");
const contactController = require("./contactMailController.js");

const defaultOptionsSanitize = {
    allowedTags: [],
    allowedAttributes: {},
};

const userController = {
    getUsers: async (req, res) => {
        const users = await User.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
            include: ["role", "instruments"],
        });
        if (users) {
            return res.status(200).json(users);
        } else {
            return res.status(404).json({ message: "Users non retournés" });
        }
    },

    getUserById: async (req, res) => {
        const userId = parseInt(req.user.user_id, 10);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            include: ["role", "instruments", "announcements"],
        });
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json("User not found");
        }
    },

    createUser: async (req, res) => {
        const { body } = req;

        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = await User.create({ ...body, password: hashedPassword });
        if (body.instruments) {
            body.instruments.forEach((instrument) => {
                user.setInstruments(instrument.instrument_id);
            });
        }
        return res.status(201).json({ message: "Utilisateur créé", user });
    },

    updateUser: async (req, res) => {
        const userId = parseInt(req.params.id, 10);

        const userToUpdate = await User.findByPk(userId);
        if (!userToUpdate) {
            return res.status(404).json("User not found");
        }
        const { body } = req;
        for (const key in body) {
            if (typeof body[key] === "string") {
                req.body[key] = sanitizeHtml(
                    req.body[key],
                    defaultOptionsSanitize
                );
            }
        }
        const { password, ...fieldsToUpdate } = body;
        await userToUpdate.update(fieldsToUpdate);
        res.status(201).json({
            message: "Utilisateur modifié",
            user: userToUpdate,
        });
    },

    updateUserPassword: async (req, res) => {
        try {
            const userId = parseInt(req.params.id, 10);

            const userToUpdate = await User.findByPk(userId);
            const oldPassword = userToUpdate.dataValues.password;
            if (!userToUpdate) {
                return res.status(404).json("Utilisateur non trouvé");
            }

            const { password, newPassword, newPasswordRepeat } = req.body;

            const sanitizePassword = sanitizeHtml(password, defaultOptionsSanitize);
            const sanitizeNewPassword = sanitizeHtml(newPassword, defaultOptionsSanitize);
            const sanitizeNewPasswordRepeat = sanitizeHtml(newPasswordRepeat, defaultOptionsSanitize);

            if(!await bcrypt.compare(sanitizePassword, oldPassword)) {
                return res.status(401).json({ message: "L'ancien mot de passe n'est pas correct."});
            }
            if(sanitizeNewPassword !== sanitizeNewPasswordRepeat) {
                return res.status(401).json({ message: "Les nouveaux mots de passe ne correspondent pas."});
            }

            const hashedPassword = await bcrypt.hash(sanitizeNewPasswordRepeat, 10);
            await userToUpdate.update({ password: hashedPassword });
            res.status(201).json({
                message: "Ton mot de passe a bien été modifié. ✔",
                user: userToUpdate,
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Echec du changement de mot de passe !" })
        }
    },

    deleteUser: async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const userToDelete = await User.findByPk(userId);
        if (!userToDelete) {
            return res.status(404).json("User not found");
        }
        await userToDelete.destroy({ where: { user_id: userToDelete } });
        res.status(201).json({
            message: "Utilisateur supprimé",
            user: userToDelete,
        });
    },

    updatePasswordIfForgot: async (req, res) => {
        try {
            const token = req.params.token;
            const idToken = await PasswordResetToken.findOne({
                where: { token },
            });
            if (!idToken) {
                return res
                    .status(401)
                    .json({
                        message:
                            "Le lien n'est pas valide, refait une demande de changement de mot de passe pour que celui-ci fonctionne.",
                    });
            }
            const expiration = idToken.dataValues.expiration;
            if (expiration < new Date()) {
                await PasswordResetToken.destroy({ where: { token } });
                return res.status(400).json({ message: "Le lien a expiré" });
            }
            const userId = idToken.dataValues.user_id;
            const currentUser = await User.findByPk(userId);
            const { password } = req.body;
            const newPasword = sanitizeHtml(password, defaultOptionsSanitize);
            const hashedPassword = await bcrypt.hash(newPasword, 10);
            currentUser.update({ password: hashedPassword });
            await PasswordResetToken.destroy({ where: { token } });
            res.status(201).json({
                message: `Vous avez changé votre mot de passe par ${hashedPassword}`,
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({
                message:
                    "Une erreur s'est produite, réessai ultérieurement ou contacte nous",
            });
        }
    },
};

module.exports = userController;
