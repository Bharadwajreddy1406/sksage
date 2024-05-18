import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import  { useLayoutEffect, useRef, useState, useEffect }  from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useNavigate } from "react-router-dom";
import {IoIosLogIn} from "react-icons/io";

type Message={
    role:"user"|"assistant";
    content:string;
}

const Chat = () =>{
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null)
    const auth = useAuth();
    const [chatMessages,setChatMessages] = useState<Message[]>([])
    const handleChatSubmit = async()=>{
        const content = inputRef.current?.value as string;
        if(inputRef && inputRef.current)
            {
                inputRef.current.value="";
            }
        const newMessage: Message = {role:"user",content}
        setChatMessages((prev)=>[...prev,newMessage]);
        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);

    }
    const handleKeyPress = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleChatSubmit();
        }
      };
    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const Difficulty = formData.get("Difficulty") as string;
        const Specilization = formData.get("Specilization") as string;
        const YearsOfExperience = formData.get("Years of experience") as string;
        const Topic = formData.get("Topic") as string;
        if(!(Topic == "" || Difficulty == "" || Specilization=="" || YearsOfExperience=="")) {
            const content = `Take the interview on ${Topic}, i have ${YearsOfExperience} years of experience in this topic, i specialize in ${Specilization} from this topic, start with first question in ${Difficulty} difficulty.`;
            const newMessage: Message = {role:"user",content}
            setChatMessages((prev)=>[...prev,newMessage]);
            const chatData = await sendChatRequest(content);
            setChatMessages([...chatData.chats]);
        } else {
            toast.error("Fill Form completely",{id: "form"});
            return
        }
    }
    const handleDeleteChats = async()=>{
        if(!(chatMessages.length === 0)){
            try {
                toast.loading("Deleting Current Chat",{id: "deletechats"});
                await deleteUserChats();
                setChatMessages([]);
                toast.success("Deleted current Chat",{id: "deletechats"});
            } catch (error) {
                console.log(error);
                toast.error("Falied to Delet current Chats",{id: "deletechats"});
                return
            }
        }
    }
    useLayoutEffect(()=>{
        if(auth?.isLoggedIn && auth.user)
            {
                getUserChats().then((data)=>{
                    setChatMessages([...data.chats])
                    if(!(chatMessages.length === 0)){
                        toast.success("Succesfully Loaded Old Chats",{id: "loadchats"});
                    }
                }).catch(err=>{
                    console.log(err);
                    toast.error("Failed to load old chats",)
            });

            }
    },[auth]);
    useEffect(() => {
        if (!auth?.user) {
          return navigate("/login");
        }
      }, [auth]);
    return <Box sx={{display:'flex',flex:1,width:'100%',height:'100%',mt:3,gap:3}} >
        <Box sx={{display:{md:'flex',xs:"none",sm:"none"}, flex:0.2,flexDirection:'column'}}>
            <Box sx={{display:"flex",overflow:'scroll',overflowX:"hidden",overflowY:"auto", width:"100%",height:"60vh", bgcolor:"rgb(17,29,39)", borderRadius:5,flexDirection:'column',mx:3}}>
                <Avatar sx={{mx:"auto",my:2,bgcolor:"white",color:"black",fontWeight:"700"}}>{ auth?.user?.name[0] }{auth?.user?.name.split(" ")[1][0]}</Avatar>
                <Typography sx={{mx:'auto',fontFamily:"work sans"}}>You are talking to a chat bot</Typography>
                <Typography sx={{mx:'auto',fontFamily:"work sans", my:"auto",textAlign:"center",padding:0}}>
                    You can experience mock interview with the chat bot,fill in the Form to begin your wonderful experience.
                </Typography>
                <Typography sx={{mx:'auto',fontFamily:"work sans", my:"auto",textAlign:"center",padding:0}}>
                    Mention the word nothing if you dont have any specilization and the difficulty can be any one Easy,Medium,Hard.
                </Typography>
                <Button onClick={handleDeleteChats} sx={{width:"200px",my:'auto',color:"white",fontWeight:"700",borderRadius:3,mx:"auto",bgcolor:red[300],":hover":{bgcolor:red.A400}}}>Start new Interview</Button>
            </Box>
        </Box>

        {chatMessages.length === 0?(
            <Box sx={{display:'flex',flex:{md:0.8,xs:1,sm:1},flexDirection:'column',px:3}}>
                <form
                onSubmit={handleFormSubmit} 
                style = {{
                margin:'auto',
                padding:"30px",
                boxShadow:"10px 10px 20px #000",
                borderRadius:"10px",
                border:"none", 
            }}>
                <Box sx={{display:"flex" , flexDirection:"column", justifyContent:"center"}}>
                    <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>Form</Typography>
                    <CustomizedInput type = "Topic" name = "Topic" label = "Topic"/>
                    <CustomizedInput type = "Years of experience" name = "Years of experience" label = "Years of experience"/>
                    <CustomizedInput type = "Specilization" name = "Specilization" label = "Specilization"/>
                    <CustomizedInput type = "Difficulty" name = "Difficulty" label = "Difficulty"/>
                    <Button type="submit" sx={{px:2,py:1,mt:2,width:"400px",borderRadius:2,bgcolor:"#00fffc",":hover":{bgcolor: "white",color:"black"}}} endIcon={<IoIosLogIn/>}>Submit</Button>
                </Box>
            </form>
            </Box>
        ):(
            <Box sx={{display:'flex',flex:{md:0.8,xs:1,sm:1},flexDirection:'column',px:3}}>
            <Typography sx={{textAlign:"center",fontSize:"40px",color:"white",mb:2,mx:"auto",fontWeight:"600"}}>Model - llama3-8b-8192 </Typography>
            <Box sx={{width:"100%",height:"60vh",borderRadius:3,mx:"auto",display:'flex',flexDirection:'column',overflow:'scroll',overflowX:"hidden",overflowY:"auto",scrollBehavior:"smooth"}} >
                {chatMessages.map((chat,index)=>
                (
                <div><ChatItem content={chat.content} role={chat.role} key={index}/></div>))}
            </Box>
            <div style={{width:"100%",borderRadius:8,backgroundColor:"rgb(17,27,39)",display:"flex",margin:"auto"}}>
            <input onKeyDown={handleKeyPress} ref ={inputRef} type="text" style={{width:"100%",backgroundColor:"transparent", padding:"30px",border:"none",outline:"none",color:"white",fontSize:"20px"}} />
            <IconButton onClick={handleChatSubmit} sx={{ml:"auto",color:"white"}}><IoMdSend/></IconButton>
            </div>
            </Box>
        )}

        
    </Box>
};

export default Chat;