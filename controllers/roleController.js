const Role =require( "../models/roleModel.js");

const roleController = {
    getRoles: async (req, res) => {
        try{
            const roles = await Role.findAll({attributes : {exclude : ["createdAt", "updatedAt"]}})
            if(roles) {
                return res.status(200).json(roles);
            } else {
                return res.status(500).json({ message: "Roles non retournés"});
            }
        } catch (error) {
            res.status(500).json({message : 'default in Roles route', error: error});
        }
    },
    
    getRoleById: async (req, res) => {
        const roleId = parseInt(req.params.id, 10);
        try {
            const role = await Role.findByPk(roleId);
            if(role) {
                return res.status(200).json(role);
            } else {
                return res.status(404).json('Role not found');Role
            }
        } catch (error) {
            return res.status(500).json({message : 'default in Role route', error: error});
        }
    },

    createRole: async (req, res) => {
        const { body } = req;
        try {
            const role = await Role.create({ ...body })
            return res.status(201).json({message : "Role créé", role});
        } catch (error) {
            return res.status(500).json({message : 'default in Role Creation route', error: error});
        }
    },

    updateRole: async(req, res) => {
        const roleId = parseInt(req.params.id, 10);
        try {
            const roleToUpdate = await Role.findByPk(roleId);
            const { body } = req;
            await roleToUpdate.update({...body});
            res.status(201).json({message : "Role modifié", role: roleToUpdate});

        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteRole: async (req, res) => {
        try {
            const roleId = parseInt(req.params.id, 10);
            const roleToDelete = await Role.findByPk(roleId);
            await roleToDelete.destroy({ where: { role_id: roleToDelete } })
            res.status(201).json({message : "Role supprimé", role: roleToDelete});

        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = roleController;