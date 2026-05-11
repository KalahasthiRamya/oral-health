import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Flame, Award, Settings, ChevronRight, Trophy, Sparkles, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Profile — Smyle" }] }),
});

const BADGES = [
  { icon: <Flame className="h-5 w-5" />, label: "10-Day Streak", earned: true },
  { icon: <ShieldCheck className="h-5 w-5" />, label: "Smoke -50%", earned: true },
  { icon: <Sparkles className="h-5 w-5" />, label: "Bright Smile", earned: true },
  { icon: <Trophy className="h-5 w-5" />, label: "30 Days Clean", earned: false },
  { icon: <Award className="h-5 w-5" />, label: "Habit Hero", earned: false },
  { icon: <Award className="h-5 w-5" />, label: "Mentor", earned: false },
];

function ProfilePage() {
  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Profile</h1>
        <button className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft">
          <Settings className="h-5 w-5" strokeWidth={1.8} />
        </button>
      </header>

      <div className="mt-5 flex items-center gap-4 rounded-3xl bg-card p-5 shadow-soft">
        <div className="grid h-16 w-16 place-items-center rounded-3xl bg-mint text-2xl font-extrabold text-primary-foreground">
          A
        </div>
        <div className="flex-1">
          <div className="text-lg font-extrabold">Aarav Mehta</div>
          <div className="text-xs text-muted-foreground">Personal · Joined Apr 2026</div>
          <div className="mt-2 flex items-center gap-2">
            <span className="chip bg-mint-soft text-primary">
              <Flame className="h-3 w-3" /> 12 day streak
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <Stat label="Cigs avoided" value="34" />
        <Stat label="Drinks skipped" value="18" />
        <Stat label="Brush sessions" value="48" />
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-bold">Badges</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className={`rounded-2xl p-3 text-center shadow-soft ${
                b.earned ? "bg-gradient-to-br from-mint to-mint-soft" : "bg-card opacity-60"
              }`}
            >
              <div
                className={`mx-auto grid h-10 w-10 place-items-center rounded-xl ${
                  b.earned ? "bg-white/70 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {b.icon}
              </div>
              <div className="mt-2 text-[11px] font-semibold leading-tight">{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-2">
        {["My dental profile", "Notifications", "Connected devices", "Privacy", "Log out"].map((item) => (
          <button
            key={item}
            className="flex w-full items-center justify-between rounded-2xl bg-card px-4 py-3.5 text-sm font-semibold shadow-soft"
          >
            {item}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </section>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card p-3 text-center shadow-soft">
      <div className="text-xl font-extrabold">{value}</div>
      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
