import express from "express";
import { createUserTable, resetPassword, signin, signup } from "./user_controllers.js";
export const router = express.Router()


router.get('/createusers', createUserTable)
router.post('/signup', signup)
router.post('/signin', signin)
router.post('/resetPassword',resetPassword)



