"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatIO = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const route_1 = __importDefault(require("./routes/route"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const chat_1 = require("./chat");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
exports.chatIO = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000", // Adjust this to the origin of your frontend
        methods: ["GET", "POST"],
    },
});
(0, chat_1.ChatHandler)(exports.chatIO);
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ limit: "30000mb", extended: true }));
app.use(express_1.default.urlencoded({ limit: "3000mb", extended: true }));
app.use((0, cors_1.default)());
const uri = process.env.MONGO_URI || "";
mongoose_1.default.connect(uri).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log(err);
});
app.get('/', (req, res) => {
    res.send("hello i am your base of data called database");
});
app.use(route_1.default);
httpServer.listen(7000, () => {
    console.log("Running at 7000");
});
