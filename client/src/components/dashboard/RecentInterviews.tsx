const RecentInterviews = () => {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Recent Interviews</h2>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <div>
            <h3 className="font-medium">MERN Stack</h3>

            <p className="text-sm text-zinc-400">Intermediate</p>
          </div>

          <span className="font-bold">8/10</span>
        </div>

        <div className="flex items-center justify-between p-5">
          <div>
            <h3 className="font-medium">React</h3>

            <p className="text-sm text-zinc-400">Beginner</p>
          </div>

          <span className="font-bold">7/10</span>
        </div>
      </div>
    </section>
  );
};

export default RecentInterviews;
