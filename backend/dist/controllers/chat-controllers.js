import User from "../models/User.js";
import Groq from "groq-sdk";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    const defaultSytemMessage = "As an interviewer, your task is to conduct an interview on a given topic and specialization. The interview should consist of 10 questions of given difficulty. For each question, ask the interviewee to provide their answer. Additionally, provide feedback on the interviewee's answers after each question with the next question.To determine the next question, consider the interviewee's performance on previous questions. Based on their answers, choose a question that is appropriate in terms of difficulty and relevance. Make sure to refrain from asking and answering any questions that are not related to the interview topic.At the end of the interview, evaluate the performance of the interviewee as a whole. Provide a comprehensive assessment of their strengths and areas for improvement. After completing the interview, do not reply to the interviewee.Please ensure that the questions are in the same language as the original prompt and maintain the same level of formality and do not say anything other than the question and feedback. Avoid asking coding-related questions.";
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or Token malfunctioned" });
        }
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.unshift({ role: "system", content: defaultSytemMessage });
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const groq = new Groq({
            apiKey: process.env.GORQ_SECRET
        });
        const chatResponse = await groq.chat.completions.create({
            "messages": chats,
            "model": "llama3-8b-8192",
            "temperature": 1,
            "max_tokens": 1024,
            "top_p": 1,
            "stream": true,
            "stop": null
        });
        let accumulatedContent = '';
        for await (const chunk of chatResponse) {
            accumulatedContent += chunk.choices[0]?.delta?.content || '';
        }
        user.chats.push({ content: accumulatedContent, role: "assistant" });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didnt match");
        }
        return res.status(200).json({ message: "Ok", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didnt match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "Ok" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map