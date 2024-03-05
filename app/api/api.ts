import axios from 'axios';
const handler = axios.create({
    baseURL: 'http://127.0.0.1:7000',
})
export const handleLogin = async(formdata:Object)=>{
    const res:any =  await handler.post('/login',formdata)
    // console.log(obj)
    // const res = JSON.parse(obj)
    console.log(res)
    return res.data;
}
export const handleRegisterAPI = async(formdata:Object)=>{
    const res =  await handler.post('/register',formdata)
    return res.data;
}
export const getAllUsers = async()=>{
    const res =  await handler.get('/getUsers')
    console.log(res)
    return res.data.users;
}
export const getAllUsersName = async()=>{
    const res =  await handler.get('/getUsersName')
    console.log(res)
    return res.data;
}
export const addPost = async(formdata:Object)=>{
    const res =  await handler.post('/addpost',formdata)
    return res.data;
}
export const getUserData = async(formdata:Object)=>{
    const res =  await handler.post('/getuserdata',formdata)
    return res.data;
}
export const likePost = async(formdata:Object)=>{
    const res =  await handler.post('/likepost',formdata)
    return res.data;
}
export const disLikePost = async(formdata:Object)=>{
    const res =  await handler.post('/dislikepost',formdata)
    return res.data;
}
export const getPost = async(formdata:Object)=>{
    const res =  await handler.post('/getpost',formdata)
    return res.data;
}
export const addComment = async(formdata:Object)=>{
    const res =  await handler.post('/addcomment',formdata)
    return res.data;
}
export const sendMess = async(formdata:Object)=>{
    const res =  await handler.post('/sendmess',formdata)
    return res.data;
}
export const searchUsers = async(formdata:Object)=>{
    const res =  await handler.post('/searchusers',formdata)
    return res.data;
}
export const removeComment = async()=>{
    const res =  await handler.get('/removecomment')
    return res.data;
}
export const getFeed = async()=>{
    const res =  await handler.get('/getfeed')
    return res.data;
}
export const follow = async(formdata:Object)=>{
    const res =  await handler.post('/follow',formdata)
    return res.data;
}
export const unfollow = async(formdata:Object)=>{
    const res =  await handler.post('/unfollow',formdata)
    return res.data;
}
export const getFriends = async(formdata:Object)=>{
    const res =  await handler.post('/getfriends',formdata)
    return res.data;
}