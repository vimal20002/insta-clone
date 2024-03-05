import { Login, addComment, addPost, disLikePost, follow, getFeed, getFriends, getNotification, getPost, getUser, getUserData, getUsers, getUsersName, likePost, register, removeComment, searchUsers, sendMessage, unFollow } from "../controller.js";
import express from "express"
const router = express.Router();
router.post('/login', Login);
router.post('/register',register)
router.get('/getUsers',getUsers)
router.get('/getUsersName',getUsersName)
router.post('/addpost',addPost)
router.post('/getuserdata',getUserData)
router.get('/getfeed', getFeed)
router.post('/likepost', likePost)
router.post('/dislikepost', disLikePost)
router.post('/getpost', getPost)
router.post('/addcomment', addComment)
router.post('/removecomment', removeComment)
router.post('/getuser', getUser)
router.post('/getnotification', getNotification)
router.post('/sendmess', sendMessage)
router.post('/searchusers', searchUsers)
router.post('/follow', follow)
router.post('/unfollow', unFollow)
router.post('/getfriends', getFriends)










export default router
