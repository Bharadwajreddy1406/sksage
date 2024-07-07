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


export const signUpUser = async (username:string, password:string)=>{
    
    const res = await axios.post("/v1/user/signup", {username, password});

    if(res.status != 201){
        throw new Error("unable to signup")
    }
    return res.data;

}

export const checkAuthStatus = async()=>{

    const res = await axios.get("/v1/user/auth-status");
    if (res.status != 200) {
        throw new Error("unable to check auth status");
    }
    return res.data;

}

export const logOut = async()=>{
    const res = await axios.get("/v1/user/logout");
    if(res.status!=200){
        throw new Error("unable to logout");
    }
    const data = res.data;
    return data;
}