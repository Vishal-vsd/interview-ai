import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Interviews",
      path: "/admin/interviews",
      icon: FileText,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-xl
      "
    >
      {/* Logo */}
      <div className="border-b border-zinc-800 p-6">
        <h1 className="text-2xl font-bold tracking-tight">
          InterviewAI
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Navigation
        </p>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  px-4
                  py-3
                  transition-all
                  ${
                    isActive
                      ? "bg-white text-black shadow-lg"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }
                `
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Card */}
      <div className="border-t border-zinc-800 p-4">
        <div
          className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white
                font-bold
                text-black
              "
            >
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <p className="font-semibold">
                {user?.name}
              </p>

              <p className="text-sm text-zinc-500">
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="
              mt-4
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-zinc-800
              py-2.5
              transition
              hover:bg-zinc-800
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;