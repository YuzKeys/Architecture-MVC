import { Router } from 'express'
import authRouter from './auth.router.js'
import memberRouter from './member.router.js'
authRouter

const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/member', memberRouter)


export default mainRouter