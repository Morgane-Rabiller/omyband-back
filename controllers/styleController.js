const Style =require( "../models/styleModel.js");

const styleController = {
    getStyles: async (req, res) => {
            const styles = await Style.findAll()
            if(styles) {
                return res.status(200).json(styles);
            } else {
                return res.status(500).json({ message: "Styles non retournés"});
            }
    },
    
    getStyleById: async (req, res) => {
        const styleId = parseInt(req.params.id, 10);
            const style = await Style.findByPk(styleId);
            if(style) {
                return res.status(200).json(style);
            } else {
                return res.status(404).json('Style not found');
            }
    },

    createStyle: async (req, res) => {
        const { body } = req;
            const style = await Style.create({ ...body})
            return res.status(201).json({message : "Style créé", style});
    },

    updateStyle: async(req, res) => {
        const styleId = parseInt(req.params.id, 10);

            const styleToUpdate = await Style.findByPk(styleId);
            const { body } = req;
            await styleToUpdate.update({...body});
            res.status(201).json({message : "Style modifié", sytle: styleToUpdate});

    },
    deleteStyle: async (req, res) => {

            const styleId = parseInt(req.params.id, 10);
            const styleToDelete = await Style.findByPk(styleId);
            await styleToDelete.destroy({ where: { style_id: styleToDelete } })
            res.status(201).json({message : "Style supprimé", style: styleToDelete});
    }
};

module.exports = styleController;