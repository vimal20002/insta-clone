"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_js_1 = require("../controller.js");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/login', controller_js_1.Login);
router.post('/register', controller_js_1.register);
router.get('/getUsers', controller_js_1.getUsers);
router.get('/getUsersName', controller_js_1.getUsersName);
router.post('/addpost', controller_js_1.addPost);
router.post('/getuserdata', controller_js_1.getUserData);
exports.default = router;
