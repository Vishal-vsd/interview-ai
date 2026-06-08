import { Link } from "react-router-dom";

const StartInterviewCard = () => {
  return (
    <section className="my-8">
      <div
        className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-8
      "
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              Start New Interview 🚀
            </h2>

            <p className="mt-3 max-w-xl text-zinc-400">
              Practice with AI-generated interview
              questions and receive instant feedback
              on your answers.
            </p>
          </div>

          <Link
            to="/interview"
            className="
            rounded-xl
            bg-white
            px-6
            py-3
            font-medium
            text-black
            transition
            hover:opacity-90
          "
          >
            Start Interview
          </Link>

        </div>
      </div>
    </section>
  );
};

export default StartInterviewCard;