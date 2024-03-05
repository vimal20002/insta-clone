"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.addPost = exports.getUsersName = exports.getUsers = exports.register = exports.Login = void 0;
const UserModel_1 = require("./models/UserModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserNameModel_1 = require("./models/UserNameModel");
const PostSchema_1 = require("./models/PostSchema");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const user = yield UserModel_1.userModal.findOne({ email: req.body.email });
        if (user) {
            const pass = user === null || user === void 0 ? void 0 : user.password;
            if (yield bcryptjs_1.default.compare(req.body.password, pass)) {
                console.log(user);
                res.status(200).json(user);
            }
            else {
                res.json({ message: "Wrong Credentials!" });
            }
        }
        else {
            res.json({ message: "Sign Up First !" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.Login = Login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.userModal.findOne({ email: req.body.email });
        if (user) {
            res.json({ message: "User already exist" });
        }
        else {
            var salt = yield bcryptjs_1.default.genSalt(10);
            const hpass = yield bcryptjs_1.default.hash(req.body.password, salt);
            const user = new UserModel_1.userModal(Object.assign(Object.assign({}, req.body), { password: hpass }));
            user.socketIdd = 'jdjff';
            yield user.save();
            if (user) {
                const val = user === null || user === void 0 ? void 0 : user.username;
                const usn = new UserNameModel_1.userNameModal({ username: val });
                yield usn.save();
            }
            res.json({ message: "Registered Successfully", status: 200 });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.register = register;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.userModal.find({});
        res.json({ users });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsers = getUsers;
const getUsersName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = yield UserNameModel_1.userNameModal.find({});
        obj.sort();
        res.json(obj);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsersName = getUsersName;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        console.log(username);
        const post = new PostSchema_1.postModel(req.body);
        yield post.save();
        const user = yield UserModel_1.userModal.findOne({ username });
        // console.log(user)
        const arr = user === null || user === void 0 ? void 0 : user.posts;
        arr.push(post);
        user.posts = arr;
        yield user.save();
        // console.log(post)
        res.json({ message: "Posted!", status: 200 });
    }
    catch (error) {
    }
});
exports.addPost = addPost;
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        console.log(username);
        const user = yield UserModel_1.userModal.findOne({ username });
        console.log(user);
        res.json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserData = getUserData;
