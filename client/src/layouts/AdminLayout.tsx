import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <AdminSidebar />

      <main className="ml-72 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;