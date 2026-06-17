interface RecentInterviewsProps {
  interviews: any[];
}

const RecentInterviews = ({
  interviews,
}: RecentInterviewsProps) => {
  return (
    <div
      className="
        mt-8
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
      "
    >
      <h2 className="text-2xl font-bold">
        Recent Interviews
      </h2>

      <div className="mt-6 space-y-3">
        {interviews?.map((interview) => (
          <div
            key={interview._id}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-950
              p-4
            "
          >
            <div>
              <h3 className="font-semibold">
                {interview.role}
              </h3>

              <p className="text-sm text-zinc-500">
                {interview.difficulty}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">
                {interview.overallScore}/10
              </p>

              <p className="text-xs text-zinc-500">
                {new Date(
                  interview.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentInterviews;