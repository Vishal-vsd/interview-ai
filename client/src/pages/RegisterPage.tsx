import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

const Register = () => {
  return (
    <AuthLayout>
      <div>
        <h2 className="text-3xl font-bold">
          Create Account
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Start practicing interviews with AI
        </p>

        <form className="mt-8 space-y-4">

          <div>
            <label className="mb-2 block text-sm">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 outline-none transition focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 outline-none transition focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 outline-none transition focus:border-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:opacity-90"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;