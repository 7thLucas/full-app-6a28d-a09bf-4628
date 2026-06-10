import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/cn";

function getProgressColor(value: number): string {
  if (value >= 85) return "bg-green-500";
  if (value >= 65) return "bg-blue-500";
  if (value >= 50) return "bg-amber-500";
  return "bg-red-500";
}

interface ProgressBarProps {
  value: number;
  className?: string;
  barClassName?: string;
  height?: "h-1" | "h-1.5" | "h-2" | "h-2.5" | "h-3";
  animated?: boolean;
  delay?: number;
  colorOverride?: string;
}

export function ProgressBar({
  value,
  className,
  barClassName,
  height = "h-1.5",
  animated = true,
  delay = 0,
  colorOverride,
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    if (!animated) {
      setWidth(value);
      return;
    }
    const timeout = setTimeout(() => {
      setWidth(value);
      mounted.current = true;
    }, delay + 100);
    return () => clearTimeout(timeout);
  }, [value, animated, delay]);

  const color = colorOverride ?? getProgressColor(value);

  return (
    <div className={cn("w-full rounded-full bg-slate-100 overflow-hidden", height, className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700 ease-out", color, barClassName)}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
