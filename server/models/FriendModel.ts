import mongoose from "mongoose";

export const friendSchema = new mongoose.Schema({
    fUsername:String,
    fEmail:String,
    messages:[Object]
})
