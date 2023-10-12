const Type =require( "../models/typeModel.js");

const typeController = {
    getTypes: async (req, res) => {
        try{
            const types = await Type.findAll({attributes : {exclude : ["createdAt", "updatedAt"]}})
            if(types) {
                return res.status(200).json(types);
            } else {
                return res.status(500).json({ message: "Types non retournés"});
            }
        } catch (error) {
            res.status(500).json({message : 'default in Types route', error: error});
        }
    },
    
    getTypeById: async (req, res) => {
        const typeId = parseInt(req.params.id, 10);
        try {
            const type = await Type.findByPk(typeId);
            if(type) {
                return res.status(200).json(type);
            } else {
                return res.status(404).json('Type not found');
            }
        } catch (error) {
            return res.status(500).json({message : 'default in Type route', error: error});
        }
    },

    createType: async (req, res) => {
        const { body } = req;
        try {
            const type = await Type.create({ ...body })
            return res.status(201).json({message : "Type créé", type});
        } catch (error) {
            return res.status(500).json({message : 'default in Type Creation route', error: error});
        }
    },

    updateType: async(req, res) => {
        const typeId = parseInt(req.params.id, 10);
        try {
            const typeToUpdate = await Type.findByPk(typeId);
            const { body } = req;
            await typeToUpdate.update({...body});
            res.status(201).json({message : "Utilisateur modifié", type: typeToUpdate});

        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteType: async (req, res) => {
        try {
            const typeId = parseInt(req.params.id, 10);
            const typeToDelete = await Type.findByPk(typeId);
            await typeToDelete.destroy({ where: { type_id: typeToDelete } })
            res.status(201).json({message : "Type supprimé", type: typeToDelete});

        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = { typeController };