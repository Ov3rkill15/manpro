import { ReactNode } from "react";
import {
  BarChart3,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import { useStore } from "../../store/store";

export type HrPage = "dashboard" | "pegawai" | "laporan";

const nav: { key: HrPage; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "pegawai", label: "Data Pegawai", icon: Users },
  { key: "laporan", label: "Laporan Monitoring", icon: FileText },
];

export function HrLayout({
  page,
  onNavigate,
  onLogout,
  children,
}: {
  page: HrPage;
  onNavigate: (p: HrPage) => void;
  onLogout: () => void;
  children: ReactNode;
}) {
  const { currentUser } = useStore();

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex items-center gap-2 px-6 py-5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-white/15">
            <HeartPulse className="size-5" />
          </div>
          <span className="font-semibold">BurnoutWatch</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                page === item.key
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/90 hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-sidebar-accent"
          >
            <LogOut className="size-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b bg-background px-6 py-4">
          <div className="flex items-center gap-2 md:hidden">
            <BarChart3 className="size-5 text-primary" />
            <span className="font-semibold">BurnoutWatch</span>
          </div>
          <h2 className="hidden md:block">
            {nav.find((n) => n.key === page)?.label}
          </h2>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium">{currentUser?.name}</div>
              <div className="text-xs text-muted-foreground">HR / Admin</div>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
              {currentUser?.name?.charAt(0) ?? "H"}
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b bg-background px-3 py-2 md:hidden">
          {nav.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm ${
                page === item.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </div>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
