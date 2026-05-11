import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useState } from "react";

const ROLES = [
  { id: "user", label: "Personal", desc: "Track my habits & oral health" },
  { id: "dentist", label: "Dentist", desc: "Monitor patients & insights" },
  { id: "coach", label: "Health Coach", desc: "Guide users on quitting" },
] as const;

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({ meta: [{ title: "Sign up — Smyle" }] }),
});

function SignupPage() {
  const [role, setRole] = useState<string>("user");
  return (
    <AppShell hideNav>
      <Link to="/login" className="text-sm font-semibold text-muted-foreground">
        ← Back
      </Link>
      <h1 className="mt-6 text-3xl font-extrabold">Create account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Personalized oral care, powered by AI.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = "/";
        }}
        className="mt-7 space-y-3"
      >
        {["Full name", "Phone", "Email", "Password"].map((p) => (
          <input
            key={p}
            placeholder={p}
            type={p === "Password" ? "password" : "text"}
            className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm shadow-soft outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
          />
        ))}

        <p className="pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">I am a</p>
        <div className="space-y-2">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition ${
                role === r.id
                  ? "border-primary bg-mint-soft shadow-soft"
                  : "border-border bg-card"
              }`}
            >
              <div>
                <div className="text-sm font-semibold">{r.label}</div>
                <div className="text-xs text-muted-foreground">{r.desc}</div>
              </div>
              <span
                className={`h-4 w-4 rounded-full border-2 ${
                  role === r.id ? "border-primary bg-primary" : "border-border"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft active:scale-[0.98]"
        >
          Create account
        </button>
      </form>
    </AppShell>
  );
}
