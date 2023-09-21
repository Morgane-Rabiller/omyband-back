import User from "../models/userModel.js";

const userController = {
    
    getUsers: (req, res) => {
        console.log('test');
        User.findAll({
            attributes : {exclude : ["createdAt", "updatedAt"]}
        })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => res.status(500).json(error))
    },
    
    getUserById: async (req, res) => {}
};



export { userController };