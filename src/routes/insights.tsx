import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TrendingUp, AlertTriangle, ShieldCheck, Activity } from "lucide-react";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({ meta: [{ title: "Insights — Smyle" }] }),
});

const RISKS = [
  { label: "Gum disease", value: 62, tone: "danger" },
  { label: "Tooth staining", value: 78, tone: "warning" },
  { label: "Bad breath", value: 45, tone: "warning" },
  { label: "Cavities", value: 28, tone: "success" },
] as const;

const INSIGHTS = [
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "Smoking · gum risk +14%",
    body: "5 cigarettes/day this week is doubling your risk of early gingivitis.",
    tone: "coral",
  },
  {
    icon: <Activity className="h-5 w-5" />,
    title: "Alcohol · enamel erosion",
    body: "Wine after meals lowers mouth pH. Rinse with water within 5 mins.",
    tone: "accent",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Brushing streak protecting you",
    body: "12 days of 2x brushing reduced plaque score by 22%.",
    tone: "mint",
  },
];

function InsightsPage() {
  return (
    <AppShell>
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          AI analysis
        </p>
        <h1 className="mt-0.5 text-2xl font-extrabold">Your oral health</h1>
      </header>

      <div className="mt-5 rounded-3xl bg-gradient-to-br from-coral-soft to-cream p-5 shadow-card">
        <div className="flex items-center gap-2 text-xs font-semibold text-coral">
          <TrendingUp className="h-4 w-4" /> Personalized risk score
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-5xl font-extrabold">Moderate</div>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-foreground/70">
          Based on 14 days of habit data and your dental profile.
        </p>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-bold">Risk breakdown</h2>
        <div className="mt-3 space-y-3 rounded-3xl bg-card p-5 shadow-soft">
          {RISKS.map((r) => (
            <RiskBar key={r.label} {...r} />
          ))}
        </div>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-bold">What AI noticed</h2>
        {INSIGHTS.map((it) => {
          const tone =
            it.tone === "coral"
              ? "bg-coral-soft text-coral"
              : it.tone === "mint"
              ? "bg-mint-soft text-primary"
              : "bg-sand text-accent-foreground";
          return (
            <div key={it.title} className="flex items-start gap-3 rounded-3xl bg-card p-4 shadow-soft">
              <div className={`grid h-10 w-10 place-items-center rounded-2xl ${tone}`}>{it.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-bold">{it.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.body}</p>
              </div>
            </div>
          );
        })}
      </section>
    </AppShell>
  );
}

function RiskBar({ label, value, tone }: { label: string; value: number; tone: string }) {
  const color =
    tone === "danger"
      ? "bg-danger"
      : tone === "warning"
      ? "bg-warning"
      : "bg-success";
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
