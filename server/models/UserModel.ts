import mongoose from "mongoose";
import { friendSchema } from "./FriendModel";
import { postSchema } from "./PostSchema";
const userSchema = new mongoose.Schema({
    name:String,
    profileImage:String,
    username:String,
    email:String,
    password:String,
    socketIdd:String,
    friends:[friendSchema],
    following:[friendSchema],
    posts:[postSchema],
    notification:[Object]
})
export const userModal = mongoose.model("user",userSchema)
