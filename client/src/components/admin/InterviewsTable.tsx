import { useNavigate } from "react-router-dom";

interface InterviewsTableProps {
  interviews: any[];
}

const InterviewsTable = ({
  interviews,
}: InterviewsTableProps) => {
  const navigate = useNavigate();

  if (interviews.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        <h2 className="text-xl font-semibold">
          No Interviews Found
        </h2>

        <p className="mt-2 text-zinc-400">
          No interviews match your search.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-left">
              <th className="p-5">Role</th>
              <th className="p-5">Candidate</th>
              <th className="p-5">Difficulty</th>
              <th className="p-5">Score</th>
              <th className="p-5">Date</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((interview) => (
              <tr
                key={interview._id}
                className="
                  border-b
                  border-zinc-800
                  transition
                  hover:bg-zinc-800/30
                "
              >
                <td className="p-5 font-medium">
                  {interview.role}
                </td>

                <td className="p-5">
                  <div>
                    <p className="font-medium">
                      {interview.user?.name}
                    </p>

                    <p className="text-sm text-zinc-500">
                      {interview.user?.email}
                    </p>
                  </div>
                </td>

                <td className="p-5">
                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                    {interview.difficulty}
                  </span>
                </td>

                <td className="p-5">
                  <span className="font-semibold">
                    {interview.overallScore}/10
                  </span>
                </td>

                <td className="p-5 text-zinc-500">
                  {new Date(
                    interview.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-5">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/interviews/${interview._id}`
                      )
                    }
                    className="
                      rounded-xl
                      bg-white
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-black
                      transition
                      hover:opacity-90
                    "
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {interviews.map((interview) => (
          <div
            key={interview._id}
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-5
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {interview.role}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {interview.user?.name}
                </p>

                <p className="text-xs text-zinc-500">
                  {interview.user?.email}
                </p>
              </div>

              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                {interview.difficulty}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
              <div>
                <p className="text-xs text-zinc-500">
                  Score
                </p>

                <p className="font-semibold">
                  {interview.overallScore}/10
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/admin/interviews/${interview._id}`
                  )
                }
                className="
                  rounded-xl
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-black
                "
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InterviewsTable;