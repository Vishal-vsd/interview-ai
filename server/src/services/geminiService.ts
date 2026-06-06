import { GoogleGenAI } from "@google/genai";

export const generateQuestions = async (
  role: string,
  difficulty: string,
): Promise<string[]> => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
    const prompt = `Generate 5 interview questions.
        Role: ${role}
        Difficulty: ${difficulty}
        
        Rules:
        - Questions must match the selected role.
        - Questions should be suitable for a real technical interview.
        - Keep each question under 20 words.
        - Do not number questions.
        - Do not provide answers.
        - Return ONLY a valid JSON array.

        Example:
        [
            "What is JWT?",
            "What is Event Loop?"
        ]`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text?.trim() || "[]";

    return JSON.parse(text);
  } catch (error) {
    console.error("Question Generation Error:", error);
    throw new Error("Failed to generate questions");
  }
};
