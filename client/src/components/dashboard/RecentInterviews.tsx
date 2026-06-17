import { useNavigate } from "react-router-dom";

interface RecentInterviewsProps {
  interviews: any[];
}

const RecentInterviews = ({
  interviews,
}: RecentInterviewsProps) => {
  const navigate = useNavigate();

  if (interviews.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          Recent Interviews
        </h2>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-400">
            No interviews yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        Recent Interviews
      </h2>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900">
        {interviews.map(
          (interview, index) => (
            <div
              key={interview._id}
              onClick={() =>
                navigate(
                  `/history/${interview._id}`
                )
              }
              className={`
                flex
                cursor-pointer
                items-center
                justify-between
                p-5
                transition
                hover:bg-zinc-800/40
                ${
                  index !==
                  interviews.length - 1
                    ? "border-b border-zinc-800"
                    : ""
                }
              `}
            >
              <div>
                <h3 className="font-medium">
                  {interview.role}
                </h3>

                <p className="text-sm text-zinc-400">
                  {
                    interview.difficulty
                  }
                </p>
              </div>

              <span className="font-bold">
                {
                  interview.overallScore
                }
                /10
              </span>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default RecentInterviews;