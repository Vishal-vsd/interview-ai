import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getUserDetails } from "../services/adminService";

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails(id!);

        if (data.success) {
          setUserData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const { user, stats, recentInterviews } =
    userData;

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() =>
          navigate("/admin/users")
        }
        className="
          mb-6
          flex
          items-center
          gap-2
          text-zinc-400
          transition
          hover:text-white
        "
      >
        <ArrowLeft size={18} />
        Back to Users
      </button>

      {/* User Card */}
      <div
        className="
          rounded-3xl
          border
          border-zinc-800
          bg-zinc-900
          p-8
        "
      >
        <div className="flex items-center gap-5">
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-white
              text-3xl
              font-bold
              text-black
            "
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user.name}
            </h1>

            <p className="mt-1 text-zinc-400">
              {user.email}
            </p>

            <span
              className="
                mt-3
                inline-block
                rounded-full
                bg-zinc-800
                px-4
                py-1
                text-sm
              "
            >
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Total Interviews
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {stats.totalInterviews}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Average Score
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {stats.averageScore}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Highest Score
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {stats.highestScore}
          </h2>
        </div>
      </div>

      {/* Recent Interviews */}
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
          {recentInterviews.map(
            (interview: any) => (
              <div
                key={interview._id}
                onClick={()=> navigate(`/admin/interviews/${interview._id}`)}
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
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;