import Instrument from "../models/instrumentModel.js";

const instrumentController = {
    getInstruments: async (req, res) => {
        try{
            const instruments = await Instrument.findAll()
            if(instruments) {
                return res.status(200).json(instruments);
            } else {
                return res.status(500).json({ message: "Instruments non retournés"});
            }
        } catch (error) {
            res.status(500).json({message : 'default in Instruments route', error: error});
        }
    },
    
    getInstrumentById: async (req, res) => {
        const instrumentId = parseInt(req.params.id, 10);
        try {
            const instrument = await Instrument.findByPk(instrumentId);
            if(instrument) {
                return res.status(200).json(instrument);
            } else {
                return res.status(404).json('instrument not found');
            }
        } catch (error) {
            return res.status(500).json({message : 'default in instrument route', error: error});
        }
    },

    createInstrument: async (req, res) => {
        const { body } = req;
        try {
            const instrument = await Instrument.create({ ...body})
            return res.status(201).json({message : "Instrument créé", instrument});
        } catch (error) {
            return res.status(500).json({message : 'default in Instrument Creation route', error: error});
        }
    },

    updateInstrument: async(req, res) => {
        const instrumentId = parseInt(req.params.id, 10);
        try {
            const instrumentToUpdate = await Instrument.findByPk(instrumentId);
            const { body } = req;
            await instrumentToUpdate.update({...body});
            res.status(201).json({message : "Instrument modifié", instrument: instrumentToUpdate});

        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteInstrument: async (req, res) => {
        try {
            const instrumentId = parseInt(req.params.id, 10);
            const instrumentToDelete = await Instrument.findByPk(instrumentId);
            await instrumentToDelete.destroy({ where: { instrument_id: instrumentToDelete } })
            res.status(201).json({message : "Instrument supprimé", instrument: instrumentToDelete});

        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export { instrumentController };