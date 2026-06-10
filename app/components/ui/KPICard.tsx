import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { cn } from "~/lib/cn";

interface KPICardProps {
  label: string;
  value: number;
  suffix?: string;
  sub: string;
  note?: string;
  delta?: string;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
  index?: number;
}

function useCountUp(target: number, duration = 800, delay = 0) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return count;
}

export function KPICard({
  label,
  value,
  suffix = "",
  sub,
  note,
  delta,
  icon: Icon,
  iconColor = "text-slate-400",
  className,
  index = 0,
}: KPICardProps) {
  const displayValue = useCountUp(value, 800, index * 80);
  const isPositiveDelta = delta?.startsWith("+");
  const isNegativeDelta = delta?.startsWith("-") || delta?.toLowerCase().includes("below");

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3",
        "hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        {Icon && <Icon className={cn("h-4 w-4", iconColor)} />}
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="text-3xl font-bold text-slate-900 tabular-nums leading-none">
          {displayValue}{suffix}
        </span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium rounded-full px-2 py-0.5 mb-0.5",
              isPositiveDelta && "bg-green-100 text-green-700",
              isNegativeDelta && !isPositiveDelta && "bg-red-100 text-red-700",
              !isPositiveDelta && !isNegativeDelta && "bg-slate-100 text-slate-500"
            )}
          >
            {isPositiveDelta && <TrendingUp className="h-3 w-3" />}
            {isNegativeDelta && !isPositiveDelta && <TrendingDown className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-slate-500">{sub}</span>
        {note && <span className="text-xs text-slate-400">{note}</span>}
      </div>
    </div>
  );
}
