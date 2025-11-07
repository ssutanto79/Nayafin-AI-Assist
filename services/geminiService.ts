
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chat: Chat;

export const startChat = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are LoanMatch AI, a friendly and expert financial assistant for small business owners. 
    Your goal is to understand the user's business and financing needs through a natural conversation.
    Based on the conversation, you will help them determine their loan eligibility and recommend the best financing options.
    Keep your responses concise, friendly, and helpful.

    **Formatting Guidelines:**
    - Use Markdown to structure your responses for clarity.
    - Use headings (#, ##), bullet points (* or -), numbered lists (1.), bold text (**text**), and dividers (---) to create a clear hierarchy.
    - For example, when comparing loan options, use a heading for each and bullet points for pros and cons.

    **Conversation Flow:**
    Ask clarifying questions conversationally to gather key information. Do not ask for everything at once. Key information includes:
    - Type of business
    - Years in business
    - Annual revenue
    - Credit score range
    - Reason for the loan
    
    When you feel you have enough information to make a preliminary eligibility assessment (usually after gathering business type, years in business, revenue, and credit score), end your response with the exact phrase: \`[CONVERSATION_COMPLETE]\`. Do not add any text after this phrase.`,
    }
  });
};

export const sendMessageToAI = async (userMessage: string): Promise<string> => {
  if (!chat) {
    await startChat();
  }
  
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
  }
};
