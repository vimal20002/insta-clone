import { LoggedInUser } from "@Interfaces";

export const GiveData = ():LoggedInUser => {
    if (typeof window !== "undefined" && window?.localStorage && localStorage?.getItem('user')!==undefined ) {
        const data: string |null = localStorage?.getItem('user')
        if(data){
        const res = JSON.parse(data)
        return res;
        }
    }
        return {
            _id:'',
            _v:0,
            email:"",
            following:[""],
            friends:[{fUsername:"", fEmail:"", _id:"", messages:[{email:"", message:""}]}],
            name:"",
            notification:[{email:"", message:""}],
            posts:[{caption:"", comments:[{comment:"",username:""}], imageUri:"",likeCount:0, likedBy:[""], username:""}],
            socketIdd:"",
            username:""
        }
    
}