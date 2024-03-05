import { Server, Socket } from "socket.io";
import { userModal } from "./models/UserModel";
const users: { [key:string]:string} = {}
const conn: { [key:string]:boolean} = {}
export const ChatHandler = async(io:Server)=>{
    console.log('dghs')
    io.on("connection", (socket:Socket) => {
        console.log("User Connected to socket socket id : ",socket?.id); 
        conn[socket?.id] = true;
        socket.on('privateMessage',async({ targetmail, email, message }:any)=>{
            console.log( email, targetmail, "line 9")
            const user = await userModal.findOne({email:email});
              let friend :any = user?.friends.filter((e)=>{
                return e.fEmail == targetmail
              })[0];
              const arr:Array<Object> = friend?.messages;
              arr.push({message, senderId:email}) 
              friend.messages = arr;  
              await user?.save()
              const frnd = await userModal.findOne({email:targetmail});
            let friend1 :any = frnd?.friends.filter((e)=>{
              return e.fEmail == email
            })[0];
            const arr1:Array<Object> = friend1?.messages;
            arr1.push({message, senderId:email}) 
            friend1.messages = arr1;  
            await frnd?.save()

            io.to(users[targetmail]).emit('incomingPrivateMessage', { senderId: email, message })
          })
          
          socket.on('addMe',async(email:string)=>{
            users[email] = socket?.id
          })
          socket.on('friendsData',async(email:string)=>{
            const user = await userModal.findOne({email:email});
            io.to(users[email]).emit('incomingdata', user?.friends)
          })
          socket.on('disconnect', () => {
            conn[socket?.id] = false;
            console.log(`User disconnected: ${socket.id}`);
          });
      });
     
      
}