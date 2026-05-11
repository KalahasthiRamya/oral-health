import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Cigarette, Wine, Droplet, Flame, ChevronRight, Bell } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Smyle — Personalized oral health" },
      { name: "description", content: "AI insights connecting smoking & alcohol habits to your oral health." },
    ],
  }),
});

function Home() {
  const score = 78;
  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Good morning
          </p>
          <h1 className="mt-0.5 text-2xl font-extrabold">Aarav</h1>
        </div>
        <button className="relative grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft">
          <Bell className="h-5 w-5" strokeWidth={1.8} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-coral" />
        </button>
      </header>

      <ScoreCard score={score} />

      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Today&apos;s habits</h2>
          <Link to="/habits" className="text-xs font-semibold text-primary">
            Log all →
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <HabitTile
            icon={<Cigarette className="h-5 w-5" />}
            label="Smoking"
            value="2"
            unit="today"
            tone="coral"
          />
          <HabitTile
            icon={<Wine className="h-5 w-5" />}
            label="Alcohol"
            value="0"
            unit="drinks"
            tone="mint"
          />
          <HabitTile
            icon={<Droplet className="h-5 w-5" />}
            label="Brushing"
            value="2/2"
            unit="done"
            tone="mint"
          />
          <HabitTile
            icon={<Flame className="h-5 w-5" />}
            label="Streak"
            value="12"
            unit="days"
            tone="accent"
          />
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">AI insight</h2>
          <Link to="/insights" className="text-xs font-semibold text-primary">
            See all →
          </Link>
        </div>
        <Link
          to="/insights"
          className="mt-3 flex items-start gap-3 rounded-3xl bg-coral-soft p-4 shadow-soft"
        >
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-coral text-white">⚠️</div>
          <div className="flex-1">
            <p className="text-sm font-bold">Gum risk rose 14% this week</p>
            <p className="mt-0.5 text-xs text-foreground/70">
              Your smoking pattern is correlating with increased plaque indicators.
            </p>
          </div>
          <ChevronRight className="mt-1 h-5 w-5 text-foreground/60" />
        </Link>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold">Quick tip</h2>
        <Link
          to="/tips"
          className="mt-3 flex items-center justify-between rounded-3xl bg-mint p-4 shadow-soft"
        >
          <div>
            <p className="text-sm font-bold text-foreground">Rinse after every cigarette</p>
            <p className="mt-0.5 text-xs text-foreground/70">Cuts tar buildup by ~30%.</p>
          </div>
          <ChevronRight className="h-5 w-5 text-foreground/60" />
        </Link>
      </section>
    </AppShell>
  );
}

function ScoreCard({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="mt-5 rounded-3xl bg-gradient-to-br from-mint via-mint-soft to-cream p-5 shadow-card">
      <div className="flex items-center gap-5">
        <div className="relative grid h-32 w-32 place-items-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={r} stroke="white" strokeOpacity="0.5" strokeWidth="10" fill="none" />
            <circle
              cx="60"
              cy="60"
              r={r}
              stroke="var(--primary)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="text-center">
            <div className="text-3xl font-extrabold leading-none">{score}</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/60">
              Oral score
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
            Status
          </p>
          <p className="mt-0.5 text-base font-bold">Mostly healthy</p>
          <p className="mt-2 text-xs leading-relaxed text-foreground/70">
            Reducing smoking by 1/day could push you to <b>85</b> in 2 weeks.
          </p>
        </div>
      </div>
    </div>
  );
}

function HabitTile({
  icon,
  label,
  value,
  unit,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  tone: "mint" | "coral" | "accent";
}) {
  const toneMap = {
    mint: "bg-mint-soft text-primary",
    coral: "bg-coral-soft text-coral",
    accent: "bg-sand text-accent-foreground",
  };
  return (
    <div className="rounded-3xl bg-card p-4 shadow-soft">
      <div className={`grid h-9 w-9 place-items-center rounded-xl ${toneMap[tone]}`}>{icon}</div>
      <div className="mt-3 text-2xl font-extrabold leading-none">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">
        {label} · {unit}
      </div>
    </div>
  );
}
