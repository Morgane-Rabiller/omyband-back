const Instrument = require( "../models/instrumentModel.js");

const instrumentController = {
    getInstruments: async (req, res) => {
            const instruments = await Instrument.findAll()
            if(instruments) {
                return res.status(200).json(instruments);
            } else {
                return res.status(500).json({ message: "Instruments non retournés"});
            }
    },
    
    getInstrumentById: async (req, res) => {
        const instrumentId = parseInt(req.params.id, 10);

            const instrument = await Instrument.findByPk(instrumentId);
            if(instrument) {
                return res.status(200).json(instrument);
            } else {
                return res.status(404).json('instrument not found');
            }

    },

    createInstrument: async (req, res) => {
        const { body } = req;
        for (const key in body) {
            req.body[key] = sanitizeHtml(req.body[key], defalutOptionsSanitize);
    }  
            const instrument = await Instrument.create({ ...body})
            return res.status(201).json({message : "Instrument créé", instrument});
    },

    updateInstrument: async(req, res) => {
        const instrumentId = parseInt(req.params.id, 10);

            const instrumentToUpdate = await Instrument.findByPk(instrumentId);
        const { body } = req;
        for (const key in body) {
            req.body[key] = sanitizeHtml(req.body[key], defalutOptionsSanitize);
    }  
            await instrumentToUpdate.update({...body});
            res.status(201).json({message : "Instrument modifié", instrument: instrumentToUpdate});

    },
    deleteInstrument: async (req, res) => {
            const instrumentId = parseInt(req.params.id, 10);
            const instrumentToDelete = await Instrument.findByPk(instrumentId);
            await instrumentToDelete.destroy({ where: { instrument_id: instrumentToDelete } })
            res.status(201).json({message : "Instrument supprimé", instrument: instrumentToDelete});
    }
};

module.exports = instrumentController;