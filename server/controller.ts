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
        const user:any = await userModal.findOne({username});
        const data = await postModel.find({});
        const obj = data?.filter((e)=>{
            console.log(e)
            return e?.username == username;
        })
        console.log(obj)
        // console.log( user)
        if(user)
        user.posts = obj;
        res.json(user)
    } catch (error) {
        console.log(error);
    }
}
export const getFeed = async(req:Request, res:Response)=>{
    try {
        const feed = await postModel.find({})
        for (var i = feed.length - 1; i > 0; i--) { 
            var j = Math.floor(Math.random() * (i + 1));              
            var temp = feed[i];
            feed[i] = feed[j];
            feed[j] = temp;
        }
        res.json(feed)
    } catch (error) {
        console.log(error)
    }
}
export const likePost = async(req:Request, res:Response)=>{
    try {
        const {pid, username} = req.body;
        console.log(pid)
        const post = await postModel.findById(pid)
        let cnt = post?.likeCount || 0;
        const arr = post?.likedBy;
        arr?.push(username)
        const up = await postModel.findByIdAndUpdate(pid, {likeCount:cnt+1, likedBy:arr})
    res.json({message:"Likedd"});
    // await up?.save()
    // console.log(up)
    } catch (error) {
        console.log(error)
    }
}
export const disLikePost = async(req:Request, res:Response)=>{
    try {
        const {pid, username} = req.body;
        console.log(pid)
        const post = await postModel.findById(pid)
        let cnt = post?.likeCount || 0;
        const arr = post?.likedBy?.filter((e)=>{return e !== username});
        const up = await postModel.findByIdAndUpdate(pid, {likeCount:cnt - 1, likedBy:arr})
    res.json({message:"DisLikedd"});
    // await up?.save()
    // console.log(up)
    } catch (error) {
        console.log(error)
    }
}

export const getPost = async(req:Request, res:Response)=>{
    try {
       const {pid} = req.body 
       const post = await postModel.findById(pid)
       res.json(post)
    } catch (error) {
        console.log(error)
    }
}
export const addComment = async(req:Request, res:Response)=>{
    try {
        const {pid, username, val} = req.body;
        console.log(pid)
        const post = await postModel.findById(pid)
        const arr = post?.comments;
        arr?.push({username, val})
        const up = await postModel.findByIdAndUpdate(pid, {comments:arr})
    res.json({message:"Added"});
    // await up?.save()
    // console.log(up)
    } catch (error) {
        console.log(error)
    }
}
export const removeComment = async(req:Request, res:Response)=>{
    try {
        const {pid, username} = req.body;
        console.log(pid)
        const post = await postModel.findById(pid)
        const arr = post?.comments?.filter((e:any)=>{return e?.username !== username});
        const up = await postModel.findByIdAndUpdate(pid, { comments:arr})
    res.json({message:"Removed"});
    // await up?.save()
    // console.log(up)
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (req : Request, res:Response)=>
{
    try {
        const {uid} = req.body;
        const user = await userModal.findById(uid)
        const data = await postModel.find({});
        const obj = data?.map((e)=>{
            return e?.username === uid;
        })
        res.json({...user, posts:obj})
    } catch (error) {
        console.log(error)
    }
} 
export const getNotification = async (req : Request, res:Response)=>
{
    try {
        const {uid} = req.body;
        const user = await userModal.findById(uid)
        res.json(user?.notification)
    } catch (error) {
        console.log(error)
    }
} 
export const sendMessage = async(req:Request, res:Response)=>{
try {
    const {email, targetmail, message}:any = req.body;
    const user = await userModal.findOne({email:email});
              let friend :any = user?.friends.filter((e)=>{
                return e.fEmail == targetmail
              })[0];
              const arr:Array<Object> = friend?.messages;
              arr.push({message, senderId:email}) 
              friend.messages = arr;  
              await user?.save()



              const frnd = await userModal.findOne({email:targetmail});
            let friend1 :any = frnd?.friends.filter((e)=>{
              return e.fEmail == email
            })[0];
            const arr1:Array<Object> = friend1?.messages;
            arr1.push({message, senderId:email}) 
            friend1.messages = arr1;  
            await frnd?.save()
            res.send("Sent!")

} catch (error) {
    console.log(error)
}
}
export const searchUsers = async(req:Request, res:Response)=>{
try {
    const {username} = req.body;
    const users = await userModal.find({})
    const resp = users.filter((e)=>{
        return e.username?.includes(username)
    })
    res.json(resp)
} catch (error) {
    console.log(error)
}
}
export const follow = async(req:Request, res:Response)=>
{
    try {
       const {username, myname} = req.body;
       const me = await userModal.findOne({username:myname})
       const user = await userModal.findOne({username:username}) 
       if(user)
       me?.friends?.push({fEmail:user?.email, fUsername:user?.username});
       if(me)
       user?.following?.push({fEmail:me?.email, fUsername:me?.username});
    const noti = `${myname} started following you`;
       user?.notification?.push({val:noti}) 
       await user?.save();
       await me?.save();
       res.send("Followed")

    } catch (error) {
        console.log(error)
    }
}
export const unFollow = async(req:Request, res:Response)=>
{
    try {
       const {username, myname} = req.body;
       const me = await userModal.findOne({username:myname})
       const user = await userModal.findOne({username:username}) 
       
        const arr1 = me?.friends?.filter((e)=>{
            return e?.fUsername !== username
        })
        await userModal.findOneAndUpdate({username:myname}, {friends:arr1})
       
       
        const arr2 = user?.following?.filter((e)=>{
            return e?.fUsername !== username
        })
        await userModal.findOneAndUpdate({username:username}, {following:arr2})
       res.send("UnFollowed")

    } catch (error) {
        console.log(error)
    }
}
export const getFriends = async(req:Request, res:Response)=>{
    try {
        const {username} = req.body;
        const user = await userModal.findOne({username})
        res.json(user?.friends)
    } catch (error) {
        console.log(error)
    }
}