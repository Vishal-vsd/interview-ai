import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl md:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center px-12">
          <h1 className="text-5xl font-bold">
            InterviewAI
          </h1>

          <p className="mt-4 max-w-md text-zinc-400">
            Practice real interviews with AI,
            get instant feedback and track
            your improvement.
          </p>

          <div className="mt-10 space-y-4">
            <div className="rounded-xl border border-zinc-800 p-4">
              🤖 AI Generated Questions
            </div>

            <div className="rounded-xl border border-zinc-800 p-4">
              📊 Instant Feedback
            </div>

            <div className="rounded-xl border border-zinc-800 p-4">
              🚀 Track Progress
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;