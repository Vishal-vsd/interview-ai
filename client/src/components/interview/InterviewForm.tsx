import { useState } from "react";
import { generateInterview } from "../../services/interviewService";

interface InterviewFormProps {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
}

const InterviewForm = ({
  role,
  setRole,
  difficulty,
  setDifficulty,
  setQuestions,
}: InterviewFormProps) => {

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!role.trim()) {
      return;
    }

    try {
      setLoading(true);

      const data = await generateInterview(
        role,
        difficulty
      );

      if (data.success) {
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-8
        shadow-lg
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold">
          Generate Questions
        </h2>

        <p className="mt-2 text-zinc-400">
          Select a role and difficulty level to
          generate AI-powered interview questions.
        </p>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Job Role
        </label>

        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. MERN Stack Developer"
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-950
            px-4
            py-3
            text-white
            placeholder:text-zinc-500
            outline-none
            transition
            focus:border-zinc-500
          "
        />
      </div>

      <div className="mb-8">
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Difficulty
        </label>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-950
            px-4
            py-3
            text-white
            outline-none
            transition
            focus:border-zinc-500
          "
        >
          <option value="Beginner">
            Beginner
          </option>

          <option value="Intermediate">
            Intermediate
          </option>

          <option value="Advanced">
            Advanced
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-white
          py-3
          font-semibold
          text-black
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading
          ? "Generating Questions..."
          : "Generate Questions"}
      </button>
    </form>
  );
};

export default InterviewForm;