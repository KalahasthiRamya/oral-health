import { Link, useLocation } from "@tanstack/react-router";
import { Home, Activity, Sparkles, Lightbulb, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/habits", label: "Habits", icon: Activity },
  { to: "/insights", label: "Insights", icon: Sparkles },
  { to: "/tips", label: "Tips", icon: Lightbulb },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const loc = useLocation();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-30 mt-6 border-t border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="flex items-center justify-between px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? loc.pathname === "/" : loc.pathname.startsWith(to);
          return (
            <Link key={to} to={to} className="nav-item flex-1" data-status={active ? "active" : undefined}>
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
