import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/adminService";
import UsersTable from "../components/admin/UsersTable";
import DeleteConfirmModal from "../components/admin/DeleteConfirmModal";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();

        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      const data = await deleteUser(selectedUserId);

      if (data.success) {
        setUsers((prev) => prev.filter((user) => user._id !== selectedUserId));

        setShowDeleteModal(false);
        setSelectedUserId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <div className="text-white">Loading users...</div>;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Users Management</h1>

        <p className="mt-2 text-zinc-400">
          Showing {filteredUsers.length} users
        </p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search users by name or email..."
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

      <UsersTable users={filteredUsers} onDelete={handleDeleteClick} />
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUserId(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default AdminUsers;
