const yup = require('yup');

// Middleware de validation pour une résidence
async function validateResidence(req, res, next) {
    try {
        // Schéma de validation pour les propriétés de la résidence
        const schema = yup.object().shape({
            name: yup
                .string()
                .min(3, "The name must be at least 3 characters long.")
                .required("The name is required."),
            surface: yup
                .number()
                .positive("The surface must be a positive number.")
                .required("The surface is required."),
            status: yup
                .boolean()
                .required("The status is required.")
        });

        // Valide le corps de la requête
        await schema.validate(req.body);

        // Passe au middleware ou contrôleur suivant
        next();
    } catch (err) {
        // Retourne un message d'erreur si la validation échoue
        res.status(400).json({ error: err.message });
    }
}

module.exports = validateResidence;
