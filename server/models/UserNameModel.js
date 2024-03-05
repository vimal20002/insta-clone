"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNameModal = exports.usernameSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.usernameSchema = new mongoose_1.default.Schema({
    username: String
});
exports.userNameModal = mongoose_1.default.model("username", exports.usernameSchema);
