import { handleLogin } from "@app/api/api";
import NextAuth, { Profile, NextAuthOptions,User } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
    
export const authOptions:NextAuthOptions={
    providers :[
       CredentialsProvider({
        name:"Credentials",
        credentials:{
  },
        async authorize(credentials){
            const formData={
                ...credentials
            }
            const user =await handleLogin(formData);
            console.log(user)
            if(user){
                 return Promise.resolve(user);
             }
            else{
                return null;
            }
        }
       })
       
    ],
    callbacks:{
        async jwt({ token, user }) {
            // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)
            return { ...token, ...user }
           },
            async session({ session, token }) {
            // user param present in the session(function) does not recive all the data from DB call -> fetchUserInfo(credentials.opt) 
            return {...session,...token} 
           },
    },
    pages:{
        
    }
   
}
const handler = NextAuth(authOptions);
export {handler as GET,handler as POST };