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
  } catch (error: any) {
    console.error("FULL ERROR:", error);

    if (error.status === 503) {
      throw new Error(
        "Gemini is currently busy. Please try again in a few seconds.",
      );
    }

    throw error;
  }
};

export const evaluateAnswer = async (question: string, answer: string) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const prompt = `
        Evaluate the following interview answer.
        Question: ${question}
        Answer: ${answer}
        
        Rules:
        - Give score out of 10
        - Give short constructive feedback
        - Return ONLY valid JSON
        
        Example:
        {
            "score": 8,
            "feedback": "Good answer but explain token expiry"
        }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text?.trim() || "{}";

    const cleanedText = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();
    console.log(cleanedText);
    return JSON.parse(cleanedText);
  } catch (error: any) {
    console.error("FULL ERROR:", error);

    if (error.status === 503) {
      throw new Error(
        "Gemini is currently busy. Please try again in a few seconds.",
      );
    }

    throw error;
  }
};
