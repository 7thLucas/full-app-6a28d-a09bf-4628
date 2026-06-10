import {
  AlertTriangle,
  Upload,
  CheckCircle,
  BookOpen,
  FileText,
  XCircle,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";
import { cn } from "~/lib/cn";
import { recentActivities, type ActivityType } from "~/data/mock-data";

const activityConfig: Record<ActivityType, { Icon: LucideIcon; color: string; bg: string }> = {
  ai_flag: { Icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
  evidence_upload: { Icon: Upload, color: "text-blue-600", bg: "bg-blue-100" },
  approval: { Icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  training: { Icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100" },
  submission: { Icon: ClipboardCheck, color: "text-blue-600", bg: "bg-blue-100" },
  missed_deadline: { Icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  review: { Icon: FileText, color: "text-amber-600", bg: "bg-amber-100" },
};

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Activity</h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-slate-100" />

        <div className="space-y-3">
          {recentActivities.map((activity) => {
            const config = activityConfig[activity.type];
            const { Icon } = config;

            return (
              <div key={activity.id} className="flex items-start gap-3 relative">
                <div
                  className={cn(
                    "h-[30px] w-[30px] rounded-full flex items-center justify-center shrink-0 z-10",
                    config.bg
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", config.color)} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-xs text-slate-700 leading-snug">{activity.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-slate-400">{activity.timestamp}</span>
                    <span className="text-[10px] text-slate-300">·</span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {activity.locationName.replace("BloomFit ", "")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
