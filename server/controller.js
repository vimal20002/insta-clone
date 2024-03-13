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
exports.getFriends = exports.unFollow = exports.follow = exports.searchUsers = exports.sendMessage = exports.getNotification = exports.getUser = exports.removeComment = exports.addComment = exports.getPost = exports.disLikePost = exports.likePost = exports.getFeed = exports.getUserData = exports.addPost = exports.getUsersName = exports.getUsers = exports.register = exports.Login = void 0;
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
        const data = yield PostSchema_1.postModel.find({});
        const obj = data === null || data === void 0 ? void 0 : data.filter((e) => {
            console.log(e);
            return (e === null || e === void 0 ? void 0 : e.username) == username;
        });
        console.log(obj);
        // console.log( user)
        if (user)
            user.posts = obj;
        res.json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUserData = getUserData;
const getFeed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feed = yield PostSchema_1.postModel.find({});
        for (var i = feed.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = feed[i];
            feed[i] = feed[j];
            feed[j] = temp;
        }
        res.json(feed);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getFeed = getFeed;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pid, username } = req.body;
        console.log(pid);
        const post = yield PostSchema_1.postModel.findById(pid);
        let cnt = (post === null || post === void 0 ? void 0 : post.likeCount) || 0;
        const arr = post === null || post === void 0 ? void 0 : post.likedBy;
        arr === null || arr === void 0 ? void 0 : arr.push(username);
        const up = yield PostSchema_1.postModel.findByIdAndUpdate(pid, { likeCount: cnt + 1, likedBy: arr });
        res.json({ message: "Likedd" });
        // await up?.save()
        // console.log(up)
    }
    catch (error) {
        console.log(error);
    }
});
exports.likePost = likePost;
const disLikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { pid, username } = req.body;
        console.log(pid);
        const post = yield PostSchema_1.postModel.findById(pid);
        let cnt = (post === null || post === void 0 ? void 0 : post.likeCount) || 0;
        const arr = (_a = post === null || post === void 0 ? void 0 : post.likedBy) === null || _a === void 0 ? void 0 : _a.filter((e) => { return e !== username; });
        const up = yield PostSchema_1.postModel.findByIdAndUpdate(pid, { likeCount: cnt - 1, likedBy: arr });
        res.json({ message: "DisLikedd" });
        // await up?.save()
        // console.log(up)
    }
    catch (error) {
        console.log(error);
    }
});
exports.disLikePost = disLikePost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pid } = req.body;
        const post = yield PostSchema_1.postModel.findById(pid);
        res.json(post);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPost = getPost;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pid, username, val } = req.body;
        console.log(pid);
        const post = yield PostSchema_1.postModel.findById(pid);
        const arr = post === null || post === void 0 ? void 0 : post.comments;
        arr === null || arr === void 0 ? void 0 : arr.push({ username, val });
        const up = yield PostSchema_1.postModel.findByIdAndUpdate(pid, { comments: arr });
        res.json({ message: "Added" });
        // await up?.save()
        // console.log(up)
    }
    catch (error) {
        console.log(error);
    }
});
exports.addComment = addComment;
const removeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { pid, username } = req.body;
        console.log(pid);
        const post = yield PostSchema_1.postModel.findById(pid);
        const arr = (_b = post === null || post === void 0 ? void 0 : post.comments) === null || _b === void 0 ? void 0 : _b.filter((e) => { return (e === null || e === void 0 ? void 0 : e.username) !== username; });
        const up = yield PostSchema_1.postModel.findByIdAndUpdate(pid, { comments: arr });
        res.json({ message: "Removed" });
        // await up?.save()
        // console.log(up)
    }
    catch (error) {
        console.log(error);
    }
});
exports.removeComment = removeComment;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.body;
        const user = yield UserModel_1.userModal.findById(uid);
        const data = yield PostSchema_1.postModel.find({});
        const obj = data === null || data === void 0 ? void 0 : data.map((e) => {
            return (e === null || e === void 0 ? void 0 : e.username) === uid;
        });
        res.json(Object.assign(Object.assign({}, user), { posts: obj }));
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUser = getUser;
const getNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.body;
        const user = yield UserModel_1.userModal.findById(uid);
        res.json(user === null || user === void 0 ? void 0 : user.notification);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getNotification = getNotification;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, targetmail, message } = req.body;
        const user = yield UserModel_1.userModal.findOne({ email: email });
        let friend = user === null || user === void 0 ? void 0 : user.friends.filter((e) => {
            return e.fEmail == targetmail;
        })[0];
        const arr = friend === null || friend === void 0 ? void 0 : friend.messages;
        arr.push({ message, senderId: email });
        friend.messages = arr;
        yield (user === null || user === void 0 ? void 0 : user.save());
        const frnd = yield UserModel_1.userModal.findOne({ email: targetmail });
        let friend1 = frnd === null || frnd === void 0 ? void 0 : frnd.friends.filter((e) => {
            return e.fEmail == email;
        })[0];
        const arr1 = friend1 === null || friend1 === void 0 ? void 0 : friend1.messages;
        arr1.push({ message, senderId: email });
        friend1.messages = arr1;
        yield (frnd === null || frnd === void 0 ? void 0 : frnd.save());
        res.send("Sent!");
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMessage = sendMessage;
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const users = yield UserModel_1.userModal.find({});
        const resp = users.filter((e) => {
            var _a;
            return (_a = e.username) === null || _a === void 0 ? void 0 : _a.includes(username);
        });
        res.json(resp);
    }
    catch (error) {
        console.log(error);
    }
});
exports.searchUsers = searchUsers;
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    try {
        const { username, myname } = req.body;
        const me = yield UserModel_1.userModal.findOne({ username: myname });
        const user = yield UserModel_1.userModal.findOne({ username: username });
        if (user)
            (_c = me === null || me === void 0 ? void 0 : me.friends) === null || _c === void 0 ? void 0 : _c.push({ fEmail: user === null || user === void 0 ? void 0 : user.email, fUsername: user === null || user === void 0 ? void 0 : user.username });
        if (me)
            (_d = user === null || user === void 0 ? void 0 : user.following) === null || _d === void 0 ? void 0 : _d.push({ fEmail: me === null || me === void 0 ? void 0 : me.email, fUsername: me === null || me === void 0 ? void 0 : me.username });
        const noti = `${myname} started following you`;
        (_e = user === null || user === void 0 ? void 0 : user.notification) === null || _e === void 0 ? void 0 : _e.push({ val: noti });
        yield (user === null || user === void 0 ? void 0 : user.save());
        yield (me === null || me === void 0 ? void 0 : me.save());
        res.send("Followed");
    }
    catch (error) {
        console.log(error);
    }
});
exports.follow = follow;
const unFollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        const { username, myname } = req.body;
        const me = yield UserModel_1.userModal.findOne({ username: myname });
        const user = yield UserModel_1.userModal.findOne({ username: username });
        const arr1 = (_f = me === null || me === void 0 ? void 0 : me.friends) === null || _f === void 0 ? void 0 : _f.filter((e) => {
            return (e === null || e === void 0 ? void 0 : e.fUsername) !== username;
        });
        yield UserModel_1.userModal.findOneAndUpdate({ username: myname }, { friends: arr1 });
        const arr2 = (_g = user === null || user === void 0 ? void 0 : user.following) === null || _g === void 0 ? void 0 : _g.filter((e) => {
            return (e === null || e === void 0 ? void 0 : e.fUsername) !== username;
        });
        yield UserModel_1.userModal.findOneAndUpdate({ username: username }, { following: arr2 });
        res.send("UnFollowed");
    }
    catch (error) {
        console.log(error);
    }
});
exports.unFollow = unFollow;
const getFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const user = yield UserModel_1.userModal.findOne({ username });
        res.json(user === null || user === void 0 ? void 0 : user.friends);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getFriends = getFriends;
