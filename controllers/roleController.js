const Role =require( "../models/roleModel.js");

const roleController = {
    getRoles: async (req, res) => {

            const roles = await Role.findAll({attributes : {exclude : ["createdAt", "updatedAt"]}})
            if(roles) {
                return res.status(200).json(roles);
            } else {
                return res.status(500).json({ message: "Roles non retournés"});
            }
    },
    
    getRoleById: async (req, res) => {
        const roleId = parseInt(req.params.id, 10);
            const role = await Role.findByPk(roleId);
            if(role) {
                return res.status(200).json(role);
            } else {
                return res.status(404).json('Role not found');
            }
    },

    createRole: async (req, res) => {
        const { body } = req;
        for (const key in body) {
            req.body[key] = sanitizeHtml(req.body[key], defalutOptionsSanitize);
    }  
            const role = await Role.create({ ...body })
            return res.status(201).json({message : "Role créé", role});
    },

    updateRole: async(req, res) => {
        const roleId = parseInt(req.params.id, 10);
            const roleToUpdate = await Role.findByPk(roleId);
        const { body } = req;
        for (const key in body) {
            req.body[key] = sanitizeHtml(req.body[key], defalutOptionsSanitize);
    }  
            await roleToUpdate.update({...body});
            res.status(201).json({message : "Role modifié", role: roleToUpdate});
    },
    deleteRole: async (req, res) => {
            const roleId = parseInt(req.params.id, 10);
            const roleToDelete = await Role.findByPk(roleId);
            await roleToDelete.destroy({ where: { role_id: roleToDelete } })
            res.status(201).json({message : "Role supprimé", role: roleToDelete});
    }
};

module.exports = roleController;