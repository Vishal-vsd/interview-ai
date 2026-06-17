import { useEffect, useState } from "react";
import { getAllInterviews } from "../services/adminService";
import InterviewsTable from "../components/admin/InterviewsTable";

interface Interview {
  _id: string;
  role: string;
  difficulty: string;
  overallScore: number;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

const AdminInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getAllInterviews();

        if (data.success) {
          setInterviews(data.interviews);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  const filteredInterviews = interviews.filter(
    (interview: any) =>
      interview.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  if (loading) {
    return <div className="text-white">Loading Interviews...</div>;
  }
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Interviews Management</h1>

        <p className="mt-2 text-zinc-400">
          Showing {filteredInterviews.length} interviews
        </p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search by role or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
            w-full
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            px-4
            py-3
            outline-none
            transition
            focus:border-zinc-600
          "
          />
        </div>
      </div>

      <InterviewsTable interviews={filteredInterviews} />
    </>
  );
};

export default AdminInterviews;
