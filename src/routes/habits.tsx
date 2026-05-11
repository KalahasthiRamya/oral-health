import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Cigarette, Wine, Droplet, Plus, Minus, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/habits")({
  component: HabitsPage,
  head: () => ({ meta: [{ title: "Habits — Smyle" }] }),
});

function HabitsPage() {
  return (
    <AppShell>
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Today
        </p>
        <h1 className="mt-0.5 text-2xl font-extrabold">Log your habits</h1>
      </header>

      <div className="mt-6 space-y-3">
        <Counter icon={<Cigarette className="h-5 w-5" />} label="Cigarettes" unit="today" tone="coral" initial={2} />
        <Counter icon={<Wine className="h-5 w-5" />} label="Alcohol" unit="drinks" tone="accent" initial={0} />
        <BrushCard />
      </div>

      <section className="mt-7">
        <h2 className="text-lg font-bold">This week</h2>
        <WeekChart />
      </section>
    </AppShell>
  );
}

function Counter({
  icon,
  label,
  unit,
  tone,
  initial,
}: {
  icon: React.ReactNode;
  label: string;
  unit: string;
  tone: "coral" | "accent";
  initial: number;
}) {
  const [n, setN] = useState(initial);
  const toneBg = tone === "coral" ? "bg-coral-soft text-coral" : "bg-sand text-accent-foreground";
  return (
    <div className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-soft">
      <div className={`grid h-11 w-11 place-items-center rounded-2xl ${toneBg}`}>{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-bold">{label}</div>
        <div className="text-xs text-muted-foreground">
          {n} {unit}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setN(Math.max(0, n - 1))}
          className="grid h-9 w-9 place-items-center rounded-xl bg-muted active:scale-95"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          onClick={() => setN(n + 1)}
          className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground active:scale-95"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function BrushCard() {
  const [m, setM] = useState(true);
  const [n, setN] = useState(false);
  return (
    <div className="rounded-3xl bg-card p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-mint-soft text-primary">
          <Droplet className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold">Brushing</div>
          <div className="text-xs text-muted-foreground">2 min · fluoride toothpaste</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { label: "Morning", v: m, set: setM },
          { label: "Night", v: n, set: setN },
        ].map((it) => (
          <button
            key={it.label}
            onClick={() => it.set(!it.v)}
            className={`flex items-center justify-between rounded-2xl border px-3 py-2.5 text-sm font-semibold transition ${
              it.v
                ? "border-primary bg-mint-soft text-primary"
                : "border-border bg-background text-muted-foreground"
            }`}
          >
            {it.label}
            {it.v ? (
              <Check className="h-4 w-4" />
            ) : (
              <span className="h-4 w-4 rounded-full border border-border" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function WeekChart() {
  const data = [3, 2, 4, 1, 2, 0, 2];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const max = Math.max(...data, 1);
  return (
    <div className="mt-3 rounded-3xl bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">Cigarettes / day</div>
        <div className="chip bg-mint-soft text-primary">↓ 18%</div>
      </div>
      <div className="mt-5 flex items-end justify-between gap-2 h-32">
        {data.map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`w-full rounded-t-xl ${i === 5 ? "bg-mint" : "bg-coral-soft"}`}
              style={{ height: `${(v / max) * 100}%`, minHeight: 6 }}
            />
            <span className="text-[10px] font-semibold text-muted-foreground">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
