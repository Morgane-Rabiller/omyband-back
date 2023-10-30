const Type =require( "../models/typeModel.js");

const typeController = {
    getTypes: async (req, res) => {
            const types = await Type.findAll({attributes : {exclude : ["createdAt", "updatedAt"]}})
            if(types) {
                return res.status(200).json(types);
            } else {
                return res.status(500).json({ message: "Types non retournés"});
            }
    },
    
    getTypeById: async (req, res) => {
        const typeId = parseInt(req.params.id, 10);

            const type = await Type.findByPk(typeId);
            if(type) {
                return res.status(200).json(type);
            } else {
                return res.status(404).json('Type not found');
            }
    },

    createType: async (req, res) => {
        const { body } = req;
            const type = await Type.create({ ...body })
            return res.status(201).json({message : "Type créé", type});
    },

    updateType: async(req, res) => {
        const typeId = parseInt(req.params.id, 10);
            const typeToUpdate = await Type.findByPk(typeId);
            const { body } = req;
            await typeToUpdate.update({...body});
            res.status(201).json({message : "Utilisateur modifié", type: typeToUpdate});
    },
    deleteType: async (req, res) => {
            const typeId = parseInt(req.params.id, 10);
            const typeToDelete = await Type.findByPk(typeId);
            await typeToDelete.destroy({ where: { type_id: typeToDelete } })
            res.status(201).json({message : "Type supprimé", type: typeToDelete});
    }
};

module.exports = typeController;