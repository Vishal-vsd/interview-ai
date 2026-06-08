import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const History = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        History Page
    </div>
  );
};

export default History;