"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        const errorMessage =
          error.status === 500
            ? "Our authentication service is currently experiencing issues. Please try again later."
            : error.message;

        setMessage({ type: "error", text: errorMessage });

        console.error("Auth error:", error);
      } else {
        setMessage({
          type: "success",
          text: "Check your email for the login link!",
        });
        setEmail("");
        handleLoginSuccess();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage({
        type: "error",
        text: "Unable to connect to the authentication service. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    // Redirect to the originally requested URL or default to home
    const redirectTo = searchParams.get("redirectTo") || "/";
    router.push(redirectTo);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md ${
                message.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Sending magic link..." : "Send magic link"}
          </button>
        </form>
      </div>
    </div>
  );
}
