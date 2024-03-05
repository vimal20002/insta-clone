import { userModal } from "./models/UserModel";
import {  Request, Response }  from "express"
import bcrypt from "bcryptjs"
import { chatIO } from "./index";
import { ChatHandler } from "./chat";
import { userNameModal } from "./models/UserNameModel";
import { postModel } from "./models/PostSchema";

export const Login = async (req:Request, res:Response) => {
    console.log(req.body)
    try {
        const user = await userModal.findOne({ email: req.body.email });
        if(user){
        const pass:string = user?.password as string;
        if (await bcrypt.compare(req.body.password, pass)) {
            console.log(user)
            res.status(200).json(user)
        }
        else{
            res.json({ message: "Wrong Credentials!" })
 
        }
    }
        else{ 
            res.json({ message: "Sign Up First !" })
        }

    }
    catch (error) {
        console.log(error)
    }
}
export const register =async(req:Request,res:Response)=>{
    try {
        const user = await userModal.findOne({email:req.body.email})
        if(user)
        {
            res.json({message:"User already exist"})
        }
        else{
            var salt = await bcrypt.genSalt(10);

            const hpass=await bcrypt.hash(req.body.password,salt)
            const user = new userModal({...req.body,password:hpass });
            user.socketIdd='jdjff';
            await user.save()
            if(user){
                const val = user?.username;
                const usn = new userNameModal({username:val})
                await usn.save();
            }
            res.json({message:"Registered Successfully", status:200})
        }
    } catch (error) {
        console.log(error)
    }
}
export const getUsers =async(req:Request,res:Response)=>{
    try {
        const users = await userModal.find({})
        res.json({users})
    } catch (error) {
        console.log(error)
    }
}
export const getUsersName =async(req:Request,res:Response)=>{
    try {
        const obj = await userNameModal.find({})
        obj.sort()
        res.json(obj)
    } catch (error) {
        console.log(error)
    }
}
export const addPost = async(req:Request,res:Response)=>{
    try {
        const {username} = req.body;

        console.log(username)
        const post = new postModel(req.body)
        await post.save();
        const user:any = await userModal.findOne({username});
        // console.log(user)
        const arr = user?.posts;
        arr.push(post);
        user.posts = arr;
        await user.save();
        // console.log(post)
        res.json({message:"Posted!", status:200})
    } catch (error) {
        
    }
}
export const getUserData = async(req:Request,res:Response)=>{
    try {
        const {username} = req.body;
        console.log(username)
        const user = await userModal.findOne({username});
        console.log( user)
        res.json(user)
    } catch (error) {
        console.log(error);
    }
}
