import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Sparkles, Bookmark, Clock } from "lucide-react";
import { useState } from "react";

const FILTERS = ["For you", "Smoking", "Alcohol", "Brushing", "Diet"] as const;

const TIPS = [
  {
    cat: "Smoking",
    title: "Rinse after every cigarette",
    body: "Swishing water for 30s reduces tar buildup on enamel by ~30%.",
    time: "1 min",
  },
  {
    cat: "Alcohol",
    title: "Wait 30 min before brushing",
    body: "Acidic drinks soften enamel. Brushing too soon erodes it.",
    time: "—",
  },
  {
    cat: "Brushing",
    title: "Angle bristles at 45°",
    body: "Gentle circles along the gum line cleans plaque without recession.",
    time: "2 min",
  },
  {
    cat: "Diet",
    title: "Crunchy veg = natural cleaner",
    body: "Carrots & apples mechanically clean teeth between brushes.",
    time: "—",
  },
];

export const Route = createFileRoute("/tips")({
  component: TipsPage,
  head: () => ({ meta: [{ title: "Tips — Smyle" }] }),
});

function TipsPage() {
  const [active, setActive] = useState<string>("For you");
  const visible = active === "For you" ? TIPS : TIPS.filter((t) => t.cat === active);
  return (
    <AppShell>
      <header className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Personalized
          </p>
          <h1 className="mt-0.5 text-2xl font-extrabold">Daily tips</h1>
        </div>
        <Sparkles className="h-6 w-6 text-primary" />
      </header>

      <div className="mt-5 -mx-5 overflow-x-auto px-5">
        <div className="flex gap-2 pb-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`chip whitespace-nowrap ${
                active === f
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-muted-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-3xl bg-gradient-to-br from-mint to-mint-soft p-5 shadow-card">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground/70">
          <Sparkles className="h-4 w-4" /> Today&apos;s focus
        </div>
        <p className="mt-2 text-lg font-extrabold leading-snug">
          Cut 1 cigarette today — your gums will thank you in 48 hours.
        </p>
        <button className="mt-4 rounded-xl bg-foreground/90 px-4 py-2 text-xs font-semibold text-background">
          Start challenge
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {visible.map((t) => (
          <article key={t.title} className="rounded-3xl bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="chip bg-mint-soft text-primary">{t.cat}</span>
              <button>
                <Bookmark className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <h3 className="mt-3 text-base font-bold leading-snug">{t.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.body}</p>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {t.time}
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
