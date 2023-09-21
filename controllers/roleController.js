import Role from "../models/roleModel.js";

const roleController = {
    
    getRoles: (req, res) => {
        Role.findAll()
        .then(Roles => {
            res.status(200).json(Roles);
        })
        .catch(error => res.status(500).json(error))
    },
    
    getRoleById: async (req, res) => {
        const roleId = parseInt(req.params.id, 10);

        Role.findByPk(roleId)
        .then(Role => {
            res.status(200).json(Role);
        })
        .catch(error => res.status(500).json(error))
    },

    createRole: async (req, res) => {
        const { body } = req;
        
        Role.create({...body})
        .then(() => {
            res.status(201).json({message : "Role créé"});
        })
        .catch(error => res.status(500).json(error))
    },

    updateRole: async(req, res) => {
        const roleId = parseInt(req.params.id, 10);
        const roleToUpdate = await Role.findByPk(roleId);

        const { body } = req;
        roleToUpdate.update({...body})
        .then(() => {
            res.status(201).json({message : "Role modifié"});
        })
        .catch(error => res.status(500).json(error))
    }
};

export { roleController };