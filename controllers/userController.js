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
    passwordRegex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    emailRegex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,

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
        try {
            
            for (const key in body) {
                if (typeof body[key] === "string") {
                    req.body[key] = sanitizeHtml(
                        req.body[key],
                        defaultOptionsSanitize
                        );
                    }
                }
                const { pseudo, email, password, passwordRepeat } = req.body;
                
                const emailInBDD = await User.findOne({ where: { email } });
                
                if(emailInBDD) {
                    return res.status(401).json({ message: "Adresse mail déjà existante." });
                }
                
                if (pseudo.length < 4) {
                    return res.status(401).json({ message: "Ton pseudo doit comporter plus de 3 caractères" });
                }
                
                if (!userController.emailRegex.test(email)) {
                    return res.status(401).json({ message: "Le format de l'adresse mail n'est pas correct" });
                }
                
                if (!userController.passwordRegex.test(password) || password.length < 8) {
                    return res.status(401).json({ message: "Ton mot de passe doit comporter minimum 8 caractères dont une minuscule, une majuscule et un chiffre." });
                }
                
                if (password !== passwordRepeat) {
                    return res.status(401).json({ message: "Les mots de passe de correspondent pas." });
                }
                
                const hashedPassword = await bcrypt.hash(body.password, 10);
                const user = await User.create({
                    ...body,
                    password: hashedPassword,
                });
                if (body.instruments) {
                    body.instruments.forEach((instrument) => {
                        user.setInstruments(instrument.instrument_id);
                    });
                }
                return res.status(201).json({ message: "Compte créé ✔", user });
            } catch (error) {
            return res.status(401).json({ message: "Utilisateur non créé" });
        }
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
        const { instruments } = body;
        await userToUpdate.setInstruments(
            instruments.map((instrument) => instrument.instrument_id)
        );

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

            const sanitizePassword = sanitizeHtml(
                password,
                defaultOptionsSanitize
            );
            const sanitizeNewPassword = sanitizeHtml(
                newPassword,
                defaultOptionsSanitize
            );
            const sanitizeNewPasswordRepeat = sanitizeHtml(
                newPasswordRepeat,
                defaultOptionsSanitize
            );

            if (!(await bcrypt.compare(sanitizePassword, oldPassword))) {
                return res
                    .status(401)
                    .json({
                        message: "L'ancien mot de passe n'est pas correct.",
                    });
            }

            // const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
            if (!userController.passwordRegex.test(sanitizeNewPassword)) {
                return res
                    .status(401)
                    .json({
                        message:
                            "Ton mot de passe doit comporter minimum 8 caractères dont une minuscule, une majuscule et un chiffre.",
                    });
            }

            if (sanitizeNewPassword !== sanitizeNewPasswordRepeat) {
                return res
                    .status(401)
                    .json({
                        message:
                            "Les nouveaux mots de passe ne correspondent pas.",
                    });
            }

            if (sanitizePassword === sanitizeNewPassword) {
                return res
                    .status(401)
                    .json({
                        message:
                            "L'ancien mot de passe et le nouveau sont les mêmes.",
                    });
            }

            const hashedPassword = await bcrypt.hash(
                sanitizeNewPasswordRepeat,
                10
            );
            await userToUpdate.update({ password: hashedPassword });
            res.status(201).json({
                message: "Ton mot de passe a bien été modifié. ✔",
                user: userToUpdate,
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({
                message: "Echec du changement de mot de passe !",
            });
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
            // Si le token unique ne se trouve pas dans la table, on retourne un message d'erreur
            if (!idToken) {
                return res.status(401).json({
                    message:
                        "Le lien n'est pas valide, refait une demande de changement de mot de passe pour que celui-ci fonctionne.",
                });
            }
            // Si la date d'expiration est passé, on supprime le token et on retourne un message d'erreur
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
            // Si tout se passe bien, on enregistre le nouveau mot de passe en base de données
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
