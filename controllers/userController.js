const {User} =require( "../models/associations.js");
const bcrypt =require( 'bcrypt');

const userController = {
    
    getUsers: async (req, res) => {
        try{
            const users = await User.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", 'password']
                },
                include:['role','instruments']
            })
            if(users) {
                return res.status(200).json(users);
            } else {
                return res.status(404).json({ message: "Users non retournés"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message : 'default in Users route', error: error});
        }
    },
    
    //!! TODO géré l'id user avec le Token -> la route deviendra /profil
    //!! Voir pour la consultation du profil d'un autre depuis une annonce 
    getUserById: async (req, res) => {
        console.log(req.user)
        const userId = parseInt(req.user.user_id, 10);
        try {
            const user = await User.findByPk(userId, {
                attributes : {exclude : ['createdAt', 'updatedAt', 'password']},
                include:['role','instruments', 'announcements']
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
            const user = await User.create({ ...body, password: hashedPassword });
            if (body.instruments) {
                body.instruments.forEach(instrument => {
                    user.setInstruments(instrument.instrument_id);
                });
            }
            return res.status(201).json({message : "Utilisateur créé", user});
        } catch (error) {
            
            console.log(error);
            return res.status(500).json({message : 'default in User Creation route', error: error});
        }
    },

    updateUser: async(req, res) => {
        const userId = parseInt(req.params.id, 10);
        try {
            const userToUpdate = await User.findByPk(userId);
            if (!userToUpdate) {
                return res.status(404).json('User not found');
            }
            const { body } = req;
            await userToUpdate.update({...body});
            res.status(201).json({message : "Utilisateur modifié", user: userToUpdate});

        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteUser: async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        try {
            const userToDelete = await User.findByPk(userId);
            if(!userToDelete) {
                return res.status(404).json('User not found');
            }
            await userToDelete.destroy({ where: { user_id: userToDelete } })
            res.status(201).json({message : "Utilisateur supprimé", user: userToDelete});

        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = userController;