const validationModule = {
    validateBody(schema) {
        return (req, res, next) => {
            const { error } = schema.validate(req.body);
            if (error) {
                const errorMessage = error.details[0].message;
                res.status(400).json({ error: "Requête non conforme", errorMessage });
                return; 
            }
            next();
        };
    }
};


module.exports = validationModule;