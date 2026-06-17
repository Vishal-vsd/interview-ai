const DashboardHeader = () => {
  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold">
          Admin Dashboard 👨‍💻
        </h1>

        <p className="mt-2 text-zinc-400">
          Monitor users and platform activity.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3">
        <p className="text-sm text-zinc-400">
          Platform Status
        </p>

        <p className="font-semibold text-green-400">
          ● Operational
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;