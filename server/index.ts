import express,{ Express, Request, Response }  from "express"
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from 'body-parser'
import router from "./routes/route";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { ChatHandler } from "./chat";

const app:Express  = express();
const httpServer = createServer(app);
export const chatIO:Server = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:3000", // Adjust this to the origin of your frontend
        methods: ["GET", "POST"],
      },
 });
 
ChatHandler(chatIO)




dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:"30000mb",extended:true}))
app.use(express.urlencoded({limit:"3000mb" ,extended:true}))


app.use(cors())
const uri:string=process.env.MONGO_URI || "" ;

mongoose.connect(uri).then(()=>{
    console.log("Connected")
}).catch((err)=>{
    console.log(err)
})
app.get('/',(req:Request,res:Response)=>{
    res.send("hello i am your base of data called database");
})
app.use(router)
httpServer.listen(7000,()=>{
    console.log("Running at 7000")
})