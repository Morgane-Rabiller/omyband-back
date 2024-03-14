const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sanitizeHtml = require("sanitize-html");

const defaultOptionsSanitize = {
    allowedTags: [],
    allowedAttributes: {},
};

const authController = {
    login: async (req, res) => {
        req.body.email = sanitizeHtml(req.body.email, defaultOptionsSanitize);
        req.body.password = sanitizeHtml(
            req.body.password,
            defaultOptionsSanitize
        );

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res
                .status(401)
                .json({ message: "email ou mot de passe incorrect" });
        }
        if (await bcrypt.compare(password, user.password)) {
            return authController.sendToken(res, user);
        }
        return res
            .status(401)
            .json({ message: "email ou mot de passe incorrect" });
    },

    async sendToken(res, user) {
        const accessToken = await authController.generateAccessToken(user);
        return res
            .status(200)
            .json({ message: "Connexion réussie", accessToken });
    },

    async generateAccessToken(user) {
        return jwt.sign(
            {
                data: {
                    user_id: user.user_id,
                    email: user.email,
                    // role: user.role,
                    pseudo: user.pseudo,
                    location: user.location,
                    avatar: user.avatar,
                    description: user.description,
                },
            },
            process.env.JWT_SECRET
            // { expiresIn: '3h'}
        );
    },

    // Middleware d'authorisation pour les routes protégées.
    // Hearder necessaire : authorization
    // Format : "bearer + ' ' + accessToken"
    authorize: async (req, res, next) => {
        try {
            const header = req.headers["authorization"];

            const accessToken = header.split(" ")[1];

            const decodedAccessToken = jwt.verify(
                accessToken,
                process.env.JWT_SECRET
            );
            req.user = decodedAccessToken.data;
            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "Aucun Token d'authorisation fourni" });
        }
    },

    addTokenUser: (req) => {
        const header = req.headers["authorization"];
        if (!header) {
            return (req.user = "");
        }
        const accessToken = header.split(" ")[1];
        if (!accessToken) {
            return (req.user = "");
        }
        try {
            const decodedAccessToken = jwt.verify(
                accessToken,
                process.env.JWT_SECRET
            );
            req.user = decodedAccessToken.data;
            return (req.user = decodedAccessToken.data);
        } catch (error) {
            return (req.user = "");
        }
    },
};

module.exports = authController;
