import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const authController = {
login: async (req, res) => {
    const  {email, password } = req.body;
    try {
        const user = await User.findOne({where: { email }});
        if (!user) {
            return res.status(401).json({message: "email ou mot de passe incorrect"});
        }
        if(await bcrypt.compare(password, user.password)){
            return authController.sendToken(res, user);
        };
        return res.status(401).json({message: "email ou mot de passe incorrect"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
},

async sendToken (res, user) {
    const accessToken = await authController.generateAccessToken(user);
    return res.status(200).json({ message: "Connexion réussie", accessToken});
},

async generateAccessToken(user) {
        return jwt.sign(
            {
                data: {
                    email: user.email,
                    // role: user.role,
                    pseudo: user.pseudo,
                    location: user.location,
                    avatar: user.avatar,
                    description: user.description,
                },
            },
            process.env.JWT_SECRET,
        );
    },

    // Middelware d'authorisation pour les routes protégées. 
    // Hearder necessaire : authorization
    // Format : "bearer + ' ' + accessToken"
    authorize: async (req, res, next) => {
        const header = req.headers['authorization'];
        if (!header) {
            return res.status(401).json({message: "Aucun Token d'authorisation fourni"});
        }
    
        const accessToken = header.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({message: "Format d'authorisation invalide"});
        }
    
        try {
            const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);
            req.user = decodedAccessToken.data;
            next()
        } catch (error) {
            res.status(401).json({message: "Token invalide"});
        }
    },
};


export {authController};