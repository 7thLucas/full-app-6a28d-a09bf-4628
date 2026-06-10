import { Award, Clock, XCircle, BarChart2, Target } from "lucide-react";
import { cn } from "~/lib/cn";

interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  valueColor?: string;
  badge?: string;
  badgeColor?: string;
}

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
  iconColor,
  valueColor = "text-slate-900",
  badge,
  badgeColor,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">{label}</span>
        <Icon className={cn("h-4 w-4", iconColor)} />
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className={cn("text-3xl font-bold tabular-nums leading-none", valueColor)}>
          {value}
        </span>
        {badge && (
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border mb-0.5", badgeColor)}>
            {badge}
          </span>
        )}
      </div>
      <span className="text-xs text-slate-500">{sub}</span>
    </div>
  );
}

export function CertificationMetrics() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
      <MetricCard
        label="Certification Readiness"
        value="63%"
        sub="3 of 8 instructors cleared"
        icon={Award}
        iconColor="text-blue-500"
        valueColor="text-blue-700"
      />
      <MetricCard
        label="Awaiting AI Review"
        value="2"
        sub="Submitted, waiting for scoring"
        icon={Clock}
        iconColor="text-amber-500"
        valueColor="text-amber-700"
        badge="Pending"
        badgeColor="bg-amber-50 text-amber-700 border-amber-200"
      />
      <MetricCard
        label="Not Cleared"
        value="3"
        sub="Cannot be scheduled yet"
        icon={XCircle}
        iconColor="text-red-500"
        valueColor="text-red-700"
        badge="Blocked"
        badgeColor="bg-red-50 text-red-700 border-red-200"
      />
      <MetricCard
        label="Average Readiness Score"
        value="7.2"
        sub="Below 8.0 threshold"
        icon={BarChart2}
        iconColor="text-amber-500"
        valueColor="text-amber-700"
        badge="Below threshold"
        badgeColor="bg-amber-50 text-amber-700 border-amber-200"
      />
      <MetricCard
        label="Certification Threshold"
        value="8.0"
        sub="No criterion below 7.5"
        icon={Target}
        iconColor="text-blue-400"
        valueColor="text-slate-700"
        badge="Standard"
        badgeColor="bg-blue-50 text-blue-700 border-blue-200"
      />
    </div>
  );
}
