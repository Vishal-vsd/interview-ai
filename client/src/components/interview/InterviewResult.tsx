interface InterviewResultProps {
  result: any;
}

const InterviewResult = ({
  result,
}: InterviewResultProps) => {
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900
          p-8
          text-center
        "
      >
        <p className="text-zinc-400">
          Overall Score
        </p>

        <h1 className="mt-2 text-6xl font-bold">
          {result.overallScore}/10
        </h1>

        <p className="mt-3 text-zinc-500">
          AI Interview Evaluation Complete
        </p>
      </div>

      {/* Questions */}
      {result.results.map(
        (item: any, index: number) => (
          <div
            key={index}
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
            "
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Question {index + 1}
              </h2>

              <span
                className="
                  rounded-full
                  bg-white
                  px-4
                  py-1
                  text-sm
                  font-semibold
                  text-black
                "
              >
                {item.score}/10
              </span>
            </div>

            <p className="mb-5 text-zinc-300">
              {item.question}
            </p>

            <div
              className="
                rounded-2xl
                bg-zinc-950
                p-4
              "
            >
              <h3 className="mb-2 font-medium">
                Feedback
              </h3>

              <p className="text-zinc-400">
                {item.feedback}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default InterviewResult;