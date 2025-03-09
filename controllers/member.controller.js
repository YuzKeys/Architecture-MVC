import { MemberDetailDTO, MemberDTO } from '../DTO/member.dto.js'
import User from '../models/user.model.js'

const memberController = {


    // Obtenir la liste des membres
    getMember: async (req, res) => {
        const userList = await User.find()
        const user = userList.map(u => new MemberDTO(u))
        res.json(user)
    },


    // Obtenir un membre en particulier (avec _id par exemple)
    getMemberById: async (req, res) => {
        // recupere l'id dans les params
        const id = req.params.id

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid member Id !' });
        }

        try {
            const member = await User.findById(id);

            if (!member) {
                return res.status(404).json({ error: 'Member not found !' });
            }

            return res.status(200).json(new MemberDetailDTO(member));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error !' });
        }

    },

    // Ajouter un utisateur (Si ton role est "Admin")
    addMember: async (req, res) => {
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
            res.status(400).json({ error: 'Bad Request !' })
        }
    },

    // Mettre a jour les information du profile recupéré (avec _id par exemple)
    updateMember: async (req, res) => {
        try {
            const id = req.params.id; // Récupération de l'ID du membre
            const updates = req.body; // Les nouvelles données envoyées

            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'Invalid member ID !' });
            }

            // Mise à jour du membre
            const updatedMember = await User.findByIdAndUpdate(id, updates, {
                new: true, // Renvoie l'utilisateur mis à jour
                runValidators: true // Vérifie les règles du schéma
            });

            if (!updatedMember) {
                return res.status(404).json({ error: 'Member not found !' });
            }

            return res.status(200).json(updatedMember);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error !' });
        }
    },
    deactivateMember: async (req, res) => {
        //recuperer le membre avec id
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ error: "Member not found !" })
        }

        user.isActive = false
        await user.save()
        res.status(200).json({ message: "Member deactivated successfully", user });

    },
}

export default memberController