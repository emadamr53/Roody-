"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

type Reply = {
  id: string;
  name: string;
  text: string;
  accepted: boolean;
  at: string;
};

export default function DashboardPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/replies", {
        headers: { "x-dashboard-password": pwd },
      });
      if (!res.ok) {
        setError("Wrong password");
        setLoggedIn(false);
        return;
      }
      const data = await res.json();
      setReplies(data);
      setLoggedIn(true);
      sessionStorage.setItem("dashboard_pwd", pwd);
    } catch {
      setError("Could not load replies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("dashboard_pwd");
    if (saved) {
      setPassword(saved);
      load(saved);
    }
  }, [load]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    load(password);
  };

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f8ff] px-4 py-10">
      <div className="mx-auto max-w-lg">
        <h1
          className="mb-2 text-center text-2xl font-semibold text-[#2c4a5e]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Replies
        </h1>
        <p className="mb-8 text-center text-sm text-[#5a7a8c]">
          What Roody writes on the invite page
        </p>

        {!loggedIn ? (
          <form
            onSubmit={handleLogin}
            className="rounded-2xl border border-white bg-white/80 p-6 shadow-lg shadow-[#89cff0]/15"
          >
            <label className="mb-2 block text-sm font-medium text-[#5a7a8c]">
              Dashboard password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mb-4 w-full rounded-xl border border-[#d4eef9] bg-white px-4 py-3 text-[#2c4a5e] outline-none focus:border-[#89cff0] focus:ring-2 focus:ring-[#89cff0]/20"
            />
            {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-xl bg-[#89cff0] py-3 font-medium text-white transition hover:bg-[#6bb3d9] disabled:opacity-50"
            >
              {loading ? "Loading..." : "Open dashboard"}
            </button>
          </form>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => load(password)}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#6bb3d9] hover:bg-white/60"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem("dashboard_pwd");
                  setLoggedIn(false);
                  setReplies([]);
                }}
                className="text-sm text-[#89cff0]"
              >
                Log out
              </button>
            </div>

            {replies.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#b8e0f5] bg-white/50 p-10 text-center text-[#5a7a8c]">
                No replies yet. Waiting for Roody…
              </div>
            ) : (
              <ul className="space-y-3">
                {replies.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-2xl border border-white bg-white/90 p-5 shadow-sm"
                  >
                    <p className="text-xl font-medium text-[#2c4a5e]">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#89cff0]">
                      <span>{r.name}</span>
                      <span>·</span>
                      <span>{formatTime(r.at)}</span>
                      {r.accepted && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">
                          accepted
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
}
