import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StatsCards from "../components/dashboard/StatsCards";
import StartInterviewCard from "../components/dashboard/StartInterviewCard";
import RecentInterviews from "../components/dashboard/RecentInterviews";
import { getInterviewStats } from "../services/dashboardService";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
  })

  useEffect(()=> {
    const fetchStats = async() => {
        try {
            const data = await getInterviewStats();

            if(data.success){
                setStats(data.stats);
            }
        } catch (error) {
            console.error(error);
        }
    }

    fetchStats()
  }, [])

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
       {stats && <StatsCards stats={stats}/>}
        <RecentInterviews/>
        </main>

    </div>
  );
};

export default Dashboard;