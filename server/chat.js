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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHandler = void 0;
const UserModel_1 = require("./models/UserModel");
const users = {};
const conn = {};
const ChatHandler = (io) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('dghs');
    io.on("connection", (socket) => {
        console.log("User Connected to socket socket id : ", socket === null || socket === void 0 ? void 0 : socket.id);
        conn[socket === null || socket === void 0 ? void 0 : socket.id] = true;
        socket.on('privateMessage', ({ targetmail, email, message }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(email, targetmail, "line 9");
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
            io.to(users[targetmail]).emit('incomingPrivateMessage', { senderId: email, message });
        }));
        socket.on('addMe', (email) => __awaiter(void 0, void 0, void 0, function* () {
            users[email] = socket === null || socket === void 0 ? void 0 : socket.id;
        }));
        socket.on('friendsData', (email) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield UserModel_1.userModal.findOne({ email: email });
            io.to(users[email]).emit('incomingdata', user === null || user === void 0 ? void 0 : user.friends);
        }));
        socket.on('disconnect', () => {
            conn[socket === null || socket === void 0 ? void 0 : socket.id] = false;
            console.log(`User disconnected: ${socket.id}`);
        });
    });
});
exports.ChatHandler = ChatHandler;
