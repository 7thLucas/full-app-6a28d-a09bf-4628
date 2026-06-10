import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { cn } from "~/lib/cn";

interface TopHeaderProps {
  title: string;
  subtitle?: string;
  statusLine?: string;
  actions?: ReactNode;
}

export function TopHeader({ title, subtitle, statusLine, actions }: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h1 className="text-2xl font-semibold text-slate-900 leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          {statusLine && <p className="text-xs text-slate-400 mt-0.5">{statusLine}</p>}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </div>
    </header>
  );
}

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AppSidebar />
      <div className={cn("ml-[240px] flex-1 flex flex-col min-h-screen", className)}>
        {children}
      </div>
    </div>
  );
}

interface PageContentProps {
  children: ReactNode;
  className?: string;
}

export function PageContent({ children, className }: PageContentProps) {
  return (
    <main className={cn("flex-1 px-6 py-6 overflow-y-auto", className)}>
      {children}
    </main>
  );
}
