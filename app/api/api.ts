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