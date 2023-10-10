import { User} from "../models/associations.js";
//import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

const userController = {
    
    getUsers: async (req, res) => {
        try{
            const users = await User.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include:['role','instrument']
            })
            if(users) {
                return res.status(200).json(users);
            } else {
                return res.status(500).json({ message: "Users non retournés"});
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({message : 'default in Users route', error: error});
        }
    },
    
    getUserById: async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        try {
            const user = await User.findByPk(userId, {
                attributes : {exclude : ["createdAt", "updatedAt"]},
                include:['role','instrument']
            });
            if(user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json('User not found');
            }
        } catch (error) {
            return res.status(500).json({message : 'default in User route', error: error});
        }
    },

    createUser: async (req, res) => {
        const { body } = req;
        try {
            const hashedPassword = await bcrypt.hash(body.password, 10);
            const user = await User.create({ ...body, password: hashedPassword })
            return res.status(201).json({message : "Utilisateur créé", user});
        } catch (error) {
            return res.status(500).json({message : 'default in User Creation route', error: error});
        }
    },

    updateUser: async(req, res) => {
        const userId = parseInt(req.params.id, 10);
        try {
            const userToUpdate = await User.findByPk(userId);
            const { body } = req;
            await userToUpdate.update({...body});
            res.status(201).json({message : "Utilisateur modifié", user: userToUpdate});

        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const userToDelete = await User.findByPk(userId);
            await userToDelete.destroy({ where: { user_id: userToDelete } })
            res.status(201).json({message : "Utilisateur supprimé", user: userToDelete});

        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export { userController };