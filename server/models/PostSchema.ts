import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    username:String,    
    imageUri:String,
    likeCount:Number,
    comments:[Object],
    caption:String,
    likedBy:[String]
})
export const postModel = mongoose.model('post', postSchema)