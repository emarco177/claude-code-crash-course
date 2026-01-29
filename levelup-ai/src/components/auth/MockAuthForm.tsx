"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function MockAuthForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/mock-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-300">Username</label>
        <input
          className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900/80 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
          placeholder="e.g. ai-warrior"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-300">
          Email (optional)
        </label>
        <input
          className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900/80 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
          placeholder="you@levelup.ai"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
      </div>
      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Creating profile..." : "Enter Battle Arena"}
      </Button>
      <p className="text-xs text-center text-gray-500">
        We store your mock profile locally so you can keep XP and progress on
        this device.
      </p>
    </form>
  );
}
