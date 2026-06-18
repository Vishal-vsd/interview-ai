import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { logoutUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await logoutUser();

      if (data.success) {
        setUser(null);
        setIsOpen(false);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/dashboard" className="text-xl font-bold text-white">
          InterviewAI
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/dashboard"
            className="text-zinc-400 transition hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className="text-zinc-400 transition hover:text-white"
          >
            History
          </Link>
          <Link
            to="/analytics"
            className="text-zinc-400 transition hover:text-white"
          >
            Analytics
          </Link>

          <button
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:border-zinc-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-4 p-6">
            <Link to="/dashboard" className="text-zinc-300">
              Dashboard
            </Link>

            <Link to="/history" className="text-zinc-300">
              History
            </Link>

            <Link to="/analytics" className="text-zinc-300">
              Analytics
            </Link>

            <button
              className="rounded-lg border border-zinc-700 px-4 py-2 text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
