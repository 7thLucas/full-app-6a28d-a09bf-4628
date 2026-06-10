import { Link } from "react-router";
import { Sparkles, ChevronRight } from "lucide-react";
import { PriorityChip } from "~/components/ui/StatusChip";
import { aiPriorityQueue } from "~/data/mock-data";

export function AIPriorityQueue() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-2">
        <div className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">AI Priority Queue</h3>
          <p className="text-xs text-slate-400 mt-0.5">What OpsPilot AI recommends reviewing first</p>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-1">
        {aiPriorityQueue.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group border-l-2 border-transparent hover:border-blue-400"
          >
            {/* Rank */}
            <span className="text-xs font-bold text-slate-300 w-4 shrink-0 mt-0.5">{item.rank}</span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <PriorityChip priority={item.priority} />
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-snug">{item.title}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{item.detail}</p>
            </div>

            {/* Action */}
            {item.locationId && (
              <Link
                to={`/locations/${item.locationId}`}
                className="inline-flex items-center gap-0.5 text-[10px] font-medium text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shrink-0 mt-1"
              >
                {item.action}
                <ChevronRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
