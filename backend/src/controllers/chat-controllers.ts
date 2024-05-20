import { NextFunction,Request,Response } from "express";
import User from "../models/User.js";
import Groq from "groq-sdk";

export const generateChatCompletion = async(req: Request,
    res: Response,
    next: NextFunction)=>{
        const {message} =req.body;
        const defaultSytemMessage = "As an interviewer, your task is to conduct an interview on a given subject and specialization while strictly adhering to the following rules:Rule 1: The interview should consist of 10 questions of given difficulty.Rule 2: For each question, ask the interviewee to provide their answer.Rule 3: Provide feedback on the interviewee's answers after each question, along with the next question.Rule 4: To determine the next question, consider the interviewee's performance on previous questions.Rule 5: Based on their answers, choose a question that is appropriate in terms of difficulty and relevance.Rule 6: If the interviewee does not know the answer, make the questions easier.Rule 7: If the interviewee has not heard about the topic or does not know anything about it, change the topic.Rule 8: If the answer is partially correct, ask further questions on the same topic. If this pattern continues, change the topic.Rule 9: If the answer is correct, ask more difficult questions.Rule 10: Make sure to refrain from asking any questions that are not related to the interview topic.Rule 11: Make sure to refrain from answering any questions from the interviewee.Rule 12: At the end of the interview, evaluate the performance of the interviewee as a whole. Provide a comprehensive assessment of their strengths and areas for improvement.Rule 13: After completing the interview, request the interviewee to start a new interview for any of their questions.Rule 14: Please ensure that the questions are in the same language as the original prompt and maintain the same level of formality and evaluation format.Rule 15: Only ask the question and provide feedback; avoid saying anything else.Rule 16: Avoid asking coding-related questions.Please conduct an interview on the given subject and specialization, following the aforementioned rules strictly.";

        try {
            const user = await User.findById(res.locals.jwtData.id);
            if(!user){
                return res.status(401).json({message:"User not registered or Token malfunctioned"});
            }
            const chats=user.chats.map(({role,content})=>({role, content}));
            chats.unshift({role:"system", content:defaultSytemMessage});

            chats.push({content:message,role:"user"});
            user.chats.push({content:message,role:"user"});
            const groq = new Groq({
                apiKey: process.env.GORQ_SECRET
            });
            const chatResponse = await groq.chat.completions.create({
                "messages":chats,
                "model": "llama3-70b-8192",
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
            user.chats.push({content:accumulatedContent,role:"assistant"});
            await user.save();
            return res.status(200).json({chats:user.chats})
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Something went wrong"});
            
        }
}

export const sendChatToUser = async (req:Request,res: Response,next: NextFunction) =>{
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user)
            {
                return res.status(401).send("User not registered or Token malfunctioned");
            }
        if (user._id.toString()!== res.locals.jwtData.id){
            return res.status(401).send("Permissions didnt match");
        }
        return res.status(200).json({message:"Ok", chats:user.chats});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error",cause: error.message});
    }
};


export const deleteChats = async (req:Request,res: Response,next: NextFunction) =>{
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user)
            {
                return res.status(401).send("User not registered or Token malfunctioned");
            }
        if (user._id.toString()!== res.locals.jwtData.id){
            return res.status(401).send("Permissions didnt match");
        }
        //@ts-ignore
        user.chats=[];
        await user.save();

        return res.status(200).json({message:"Ok"});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Error",cause: error.message});
    }
};


