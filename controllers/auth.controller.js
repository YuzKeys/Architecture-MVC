import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import express from 'express'


const authController = {
    register: async (req, res) => {
        try {
            const { username, firstname, lastname, email, password, role } = req.body
            const newUser = new User({
                username,
                firstname,
                lastname,
                email,
                password,
                role
            })
            await newUser.save()
            res.json({ message: 'Utilisateur Enregistré avec succes !' })
        } catch (err) {
            res.json({ error: 'Username or email already exist !' })
        }

    },
    login: async (req, res) => {
        // on recupere les information du client
        const { username, email, password, isActive } = req.body

        // on verifie si il existe en base (avec l'email par exemple)
        const user = await User.findOne({ username })
        if (!user) {
            res.status(400).json({ error: "Invalid Email !" })
        }

        // on verifie si le password match
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            res.status(400).json({ error: "Invalid password !" })
        }


        // Si c'est le bon password on lui donne un token
        // Ce token est signé avec l'id, le role, et la clé secrete.
        // Ce token expire dans 1 jour
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        // On retourne le token au client
        res.status(200).json({ token })
    }
}

export default authController