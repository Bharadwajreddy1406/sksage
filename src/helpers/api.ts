import axios from "axios";


export const loginUser = async (username:string, password:string)=>{
    
    const res = await axios.post('/v1/user/login', {username, password});
    console.log("request sent")
    if(res.status != 200){
        throw new Error("unable to login")
    }
    const data = await res.data;
    // console.log(data);
    return data;
}