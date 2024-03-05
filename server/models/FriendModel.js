"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.friendSchema = new mongoose_1.default.Schema({
    fUsername: String,
    fEmail: String,
    messages: [Object]
});
