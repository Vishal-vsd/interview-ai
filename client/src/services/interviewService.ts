import API from "./api";

export const generateInterview = async (role: string, difficulty: string) => {
  const { data } = await API.post("/interview/generate", {
    role,
    difficulty,
  });

  return data;
};

interface SubmittedQuestions {
  question: string;
  answer: string;
}

export const evaluateInterview = async (questions: SubmittedQuestions[]) => {
  const { data } = await API.post("/interview/evaluate-complete", {
    questions,
  });

  return data;
};
