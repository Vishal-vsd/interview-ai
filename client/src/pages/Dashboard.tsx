import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import StatsCards from "../components/dashboard/StatsCards";
import StartInterviewCard from "../components/dashboard/StartInterviewCard";
import RecentInterviews from "../components/dashboard/RecentInterviews";

const Dashboard = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <main className="mx-auto max-w-7xl p-6"> 
            <h1 className="text-3xl font-bold">
                Welcome Back, {user?.name} 👋
            </h1>
            <p className="mt-2 text-zinc-400">
                Ready to practice your next interview?
            </p>
                    <StartInterviewCard />
        <StatsCards />
        <RecentInterviews/>
        </main>

    </div>
  );
};

export default Dashboard;