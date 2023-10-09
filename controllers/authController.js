import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

const authController = {
login: async (req, res) => {
    const  {email, password } = req.body;
    try {
        const user = await User.findOne({where: { email }});
        if (!user) {
            return res.status(401).json({message: "email ou mot de passe incorrect"});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({message: "email ou mot de passe incorrect"});
        }
        res.status(200).json({ message: "Connexion réussie", user});
    } catch (error) {
        res.status(500).render('error');
    }
},
}

export {authController};