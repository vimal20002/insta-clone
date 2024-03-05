"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FriendModel_1 = require("./FriendModel");
const PostSchema_1 = require("./PostSchema");
const userSchema = new mongoose_1.default.Schema({
    name: String,
    profileImage: String,
    username: String,
    email: String,
    password: String,
    socketIdd: String,
    friends: [FriendModel_1.friendSchema],
    following: [FriendModel_1.friendSchema],
    posts: [PostSchema_1.postSchema],
    notification: [Object]
});
exports.userModal = mongoose_1.default.model("user", userSchema);
