"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = exports.postSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.postSchema = new mongoose_1.default.Schema({
    username: String,
    imageUri: String,
    likeCount: Number,
    comments: [Object],
    caption: String,
    likedBy: [String]
});
exports.postModel = mongoose_1.default.model('post', exports.postSchema);
