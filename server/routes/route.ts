import { Login, addPost, getUserData, getUsers, getUsersName, register } from "../controller.js";
import express from "express"
const router = express.Router();
router.post('/login', Login);
router.post('/register',register)
router.get('/getUsers',getUsers)
router.get('/getUsersName',getUsersName)
router.post('/addpost',addPost)
router.post('/getuserdata',getUserData)




export default router
