import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  MapPin,
  ClipboardList,
  FileImage,
  GraduationCap,
  Bot,
  BarChart3,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "~/lib/cn";
import { useConfigurables } from "~/modules/configurables";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Locations", icon: MapPin, href: "/locations" },
  { label: "Checklists", icon: ClipboardList, href: "/checklists" },
  { label: "Evidence Review", icon: FileImage, href: "/evidence-review" },
  { label: "Staff Training", icon: GraduationCap, href: "/staff-training" },
  { label: "AI Assistant", icon: Bot, href: "/ai-assistant" },
  { label: "Reports", icon: BarChart3, href: "/reports" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const { config, loading } = useConfigurables();

  const appName = !loading ? (config.appName ?? "OpsPilot AI") : "OpsPilot AI";
  const appTagline = !loading ? (config.appTagline ?? "AI Ops Platform") : "AI Ops Platform";
  const userProfile = !loading ? config.userProfile : undefined;
  const companyName = !loading ? (config.companyName ?? "BloomFit Studios") : "BloomFit Studios";

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-white border-r border-slate-200 flex flex-col z-40">
      {/* Wordmark */}
      <div className="px-5 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-slate-900 leading-tight truncate">
              {appName}
            </span>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full leading-tight mt-0.5 w-fit">
              {appTagline}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 h-9 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive ? "text-blue-600" : "text-slate-400"
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="px-3 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">
              {userProfile?.initials ?? "SM"}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-900 truncate leading-tight">
              {userProfile?.name ?? "Sarah Mitchell"}
            </span>
            <span className="text-[10px] text-slate-400 truncate leading-tight">
              {userProfile?.role ?? "VP of Operations"}
            </span>
            <span className="text-[10px] text-slate-400 truncate leading-tight">
              {companyName}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
