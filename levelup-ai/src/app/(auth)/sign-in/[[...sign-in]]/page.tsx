import { MockAuthForm } from "@/components/auth/MockAuthForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/60 border border-gray-800 rounded-2xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-wide text-cyan-400">
            LevelUp AI
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Sign in to start battling
          </h1>
          <p className="text-sm text-gray-400">
            Create a mock account in seconds — no passwords, no emails.
          </p>
        </div>
        <MockAuthForm />
      </div>
    </div>
  );
}
