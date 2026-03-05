import { GoogleGenAI } from '@google/genai';

let aiInstance = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const getAIRecommendation = async ({ game, playerCount, modLevel, pluginLevel }) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As a hosting expert, recommend a hosting plan for:
      Game: ${game}
      Player Count: ${playerCount}
      Mod Level: ${modLevel}
      Plugin Level: ${pluginLevel}
      
      Provide a concise recommendation including RAM, CPU, and Disk requirements.`,
    });
    
    return response.text;
  } catch (error) {
    console.error('AI Recommendation failed:', error);
    return 'We recommend our standard VPS plan for your needs.';
  }
};
