const { User } = require("../models/associations.js");
const bcrypt = require("bcrypt");

const sanitizeHtml = require("sanitize-html");

const defaultOptionsSanitize = {
    allowedTags: [],
    allowedAttributes: {},
};

const userController = {
    getUsers: async (req, res) => {
        const users = await User.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
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
            req.body[key] = sanitizeHtml(req.body[key], defaultOptionsSanitize);
        }
        await userToUpdate.update({ ...body });
        res.status(201).json({
            message: "Utilisateur modifié",
            user: userToUpdate,
        });
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
        console.log(req.params.userId);
        try {
            const userId = parseInt(req.params.userId);
            const currentUser = await User.findByPk(userId);
            const { password } = req.body;
            const newPasword = sanitizeHtml(password, defaultOptionsSanitize);
            const hashedPassword = await bcrypt.hash(newPasword, 10);
            currentUser.update({ password: hashedPassword });
            res.status(201).json({
                message: `Vous avez changé votre mot de passe par ${hashedPassword}`,
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({message: "Non autorisé"});
        }
    },
};

module.exports = userController;
