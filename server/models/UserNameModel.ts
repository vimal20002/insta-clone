import mongoose from "mongoose";

export const usernameSchema = new mongoose.Schema({
    username:String
})
export const userNameModal = mongoose.model("username",usernameSchema)
