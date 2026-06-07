import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      Dashboard Page
    </div>
  );
};

export default Dashboard;