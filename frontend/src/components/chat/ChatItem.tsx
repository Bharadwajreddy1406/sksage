import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

  return (
    role == "assistant"
      ? (
        <Box sx={{ display: 'flex', p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
          <Avatar sx={{ ml: "0" }}>
            <img src="kmitlogo.png" alt="kmit" width={"30px"} />
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