import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { HiSpeakerWave } from "react-icons/hi2";
import { useState } from "react";


function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}


function determineLanguage(message: string) {
  if (message.includes("function") || message.includes("=>")) {
    return "javascript";
  } else if (message.includes("class") || message.includes("import") || message.includes("export")) {
    return "javascript";
  } else if (message.includes("def") || message.includes("end") || message.includes("class")) {
    return "ruby";
  } else if (message.includes("print") || message.includes("if") || message.includes("for")) {
    return "python";
  } else {
    // Default to a language
    return "plaintext";
  }
}

const ChatItem = ({ content, role }: { content: string, role: "user" | "assistant" }) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);
  
  const [isClicked, setIsClicked] = useState(false);
    
  const handleClick = () => {
      setIsClicked(!isClicked);
  };
  return (
    role == "assistant"
      ? (
        <Box sx={{ display: 'flex', p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      <div
        style={{
          margin: 5,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Avatar sx={{ ml: "0" }}>
          <img src="kmitlogo.png" alt="kmit" width={"30px"} />
        </Avatar>
        <div onClick={handleClick} style={{ padding: "5px" , backgroundColor: "rgba(150, 100, 200, 0.2)", outline: "transparent white 1px", borderRadius: "10px" }}>
          {isClicked ? (
            <HiSpeakerWave style={{ margin: 5, color: "blue", scale: 1.25 }} />
          ) : (
            <HiSpeakerWave style={{ margin: 5, color: "#004d56" }} />
          )}
        </div>
      </div>

          <Box>
              {!messageBlocks && (
                <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
              )}
              {messageBlocks &&
                messageBlocks.map((block, index) => 
                  index % 2 === 0 ? (
                    <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                  ) : (
                    <SyntaxHighlighter style={coldarkDark} language={determineLanguage(block)}>
                      {block}
                    </SyntaxHighlighter>
                  )
              )}
          </Box>
        </Box>
      )
      : (
        <Box sx={{ display: 'flex', p: 2, bgcolor: "#004d56", gap: 2 , my:2}}>
          <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
            {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Box>
              {!messageBlocks && (
                <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
              )}
              {messageBlocks &&
                messageBlocks.map((block, index) => 
                  index % 2 === 0 ? (
                    <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
                  ) : (
                    <SyntaxHighlighter style={coldarkDark} language={determineLanguage(block)}>
                      {block}
                    </SyntaxHighlighter>
                  )
              )}
          </Box>
        </Box>
      ))
};

export default ChatItem;
