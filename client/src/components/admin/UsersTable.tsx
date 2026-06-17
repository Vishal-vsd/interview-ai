import { useNavigate } from "react-router-dom";

interface UsersTableProps {
  users: any[];
  onDelete: (id: string) => void;
}

const UsersTable = ({ users, onDelete }: UsersTableProps) => {
  const navigate = useNavigate();

  if (users.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        <h2 className="text-xl font-semibold">No Matching Users Found</h2>

        <p className="mt-2 text-zinc-400">Try another search keyword.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-left">
              <th className="p-5">Name</th>
              <th className="p-5">Email</th>
              <th className="p-5">Role</th>
              <th className="p-5">Joined</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="
                  border-b
                  border-zinc-800
                  transition
                  hover:bg-zinc-800/30
                "
              >
                <td className="p-5 font-medium">{user.name}</td>

                <td className="p-5 text-zinc-400">{user.email}</td>

                <td className="p-5">
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${
                        user.role === "admin"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }
                    `}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-5 text-zinc-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="p-5">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/users/${user._id}`)}
                      className="
        rounded-xl
        bg-white
        px-4
        py-2
        text-black
      "
                    >
                      View
                    </button>

                    <button
                      onClick={() => onDelete(user._id)}
                      className="
        rounded-xl
        bg-red-500/20
        px-4
        py-2
        text-red-400
      "
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-5
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>

                <p className="mt-1 break-all text-sm text-zinc-400">
                  {user.email}
                </p>
              </div>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  whitespace-nowrap
                  ${
                    user.role === "admin"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }
                `}
              >
                {user.role}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
              <div>
                <p className="text-xs text-zinc-500">Joined</p>

                <p className="text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              {user.role !== "admin" && (
                <button
                  onClick={() => onDelete(user._id)}
                  className="
                    rounded-xl
                    bg-red-500/20
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-red-400
                    transition
                    hover:bg-red-500/30
                  "
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersTable;
