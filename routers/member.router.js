import { Router } from "express";
import memberController from "../controllers/member.controller.js";
import authController from "../controllers/auth.controller.js";

//api/meber
const memberRouter = Router()

//TODO Il faut verifier si il est admin sinon acces refusé
memberRouter.post('/add', memberController.addMember) // 1/2 OK

// Se connecter depuis la route member avec authentification JWT
memberRouter.post('/login', authController.login) // 1/2 OK

// Obtenir la liste des membres
memberRouter.get('/', memberController.getMember) // OK

// Obtenir les informations d'un membre (avec son _id par exemple)
memberRouter.get('/:id', memberController.getMemberById) // OK

// Mettre a jour les membres
memberRouter.put('/:id', memberController.updateMember) // OK

// desactiver un membre
memberRouter.patch('/:id', memberController.deactivateMember) // OK

export default memberRouter
