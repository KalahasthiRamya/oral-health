import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Sparkles, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Login — Smyle" },
      { name: "description", content: "Sign in to track habits and oral health." },
    ],
  }),
});

function LoginPage() {
  return (
    <AppShell hideNav>
      <div className="flex min-h-[80vh] flex-col">
        <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-mint shadow-soft">
          <Sparkles className="h-7 w-7 text-primary-foreground" strokeWidth={2.2} />
        </div>
        <h1 className="mt-5 text-center text-4xl font-extrabold text-foreground">Smyle</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Welcome back</p>

        <form
          className="mt-10 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/";
          }}
        >
          <Field icon={<Mail className="h-4 w-4" />} placeholder="Email or phone" type="text" />
          <Field icon={<Lock className="h-4 w-4" />} placeholder="Password" type="password" />

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-soft transition active:scale-[0.98]"
          >
            Login
          </button>

          <p className="pt-3 text-center text-xs text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-primary">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </AppShell>
  );
}

function Field({ icon, ...props }: { icon: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-soft focus-within:ring-2 focus-within:ring-primary/40">
      <span className="text-muted-foreground">{icon}</span>
      <input
        {...props}
        className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}
