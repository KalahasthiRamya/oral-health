import { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children, hideNav }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-cream via-background to-mint-soft/40">
      <div className="app-shell flex flex-col">
        <main className="flex-1 px-5 pt-6 pb-4">{children}</main>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}
