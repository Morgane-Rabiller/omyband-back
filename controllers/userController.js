import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

const userController = {
    login: async (req, res) => {
        const  {email, password } = req.body;
        const user = await User.findOne({where: { email }});
        if (!user) {
            return res.status(401).json({message: "email ou mot de passe incorrect"});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({message: "email ou mot de passe incorrect"});
        }
        res.status(200).json({ message: "Connexion réussie", user});
    },

    getUsers: (req, res) => {
        User.findAll({
            attributes : {exclude : ["createdAt", "updatedAt"]}
        })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => res.status(500).json(error))
    },
    
    getUserById: async (req, res) => {
        const userId = parseInt(req.params.id, 10);

        User.findByPk(userId, {
            attributes : {exclude : ["createdAt", "updatedAt"]},
            include: ['role']
        })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => res.status(500).json(error))
    },

    createUser: async (req, res) => {
        const { body } = req;
        const hashedPassword = await bcrypt.hash(body.password, 10);
        User.create({ ...body, password: hashedPassword })
        .then(() => {
            res.status(201).json({message : "Utilisateur créé"});
        })
        .catch(error => res.status(500).json(error))
    },

    updateUser: async(req, res) => {
        const userId = parseInt(req.params.id, 10);
        const userToUpdate = await User.findByPk(userId);
        
        const { body } = req;
        userToUpdate.update({...body})
        .then(() => {
            res.status(201).json({message : "Utilisateur modifié"});
        })
        .catch(error => res.status(500).json(error))
    },
};

export { userController };