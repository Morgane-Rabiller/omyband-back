const Style =require( "../models/styleModel.js");

const styleController = {
    getStyles: async (req, res) => {
        try{
            const styles = await Style.findAll()
            if(styles) {
                return res.status(200).json(styles);
            } else {
                return res.status(500).json({ message: "Styles non retournés"});
            }
        } catch (error) {
            res.status(500).json({message : 'default in Styles route', error: error});
        }
    },
    
    getStyleById: async (req, res) => {
        const styleId = parseInt(req.params.id, 10);
        try {
            const style = await Style.findByPk(styleId);
            if(style) {
                return res.status(200).json(style);
            } else {
                return res.status(404).json('Style not found');
            }
        } catch (error) {
            return res.status(500).json({message : 'default in style route', error: error});
        }
    },

    createStyle: async (req, res) => {
        const { body } = req;
        try {
            const style = await Style.create({ ...body})
            return res.status(201).json({message : "Style créé", style});
        } catch (error) {
            return res.status(500).json({message : 'default in style creation route', error: error});
        }
    },

    updateStyle: async(req, res) => {
        const styleId = parseInt(req.params.id, 10);
        try {
            const styleToUpdate = await Style.findByPk(styleId);
            const { body } = req;
            await styleToUpdate.update({...body});
            res.status(201).json({message : "Style modifié", sytle: styleToUpdate});

        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteStyle: async (req, res) => {
        try {
            const styleId = parseInt(req.params.id, 10);
            const styleToDelete = await Style.findByPk(styleId);
            await styleToDelete.destroy({ where: { style_id: styleToDelete } })
            res.status(201).json({message : "Style supprimé", style: styleToDelete});

        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = styleController;