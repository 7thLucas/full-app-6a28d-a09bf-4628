import { useState } from "react";
import { Link } from "react-router";
import { Search, ChevronRight, ArrowUpDown } from "lucide-react";
import { cn } from "~/lib/cn";
import { StatusChip } from "~/components/ui/StatusChip";
import { ProgressBar } from "~/components/ui/ProgressBar";
import { locations, type Location, type LocationStatus } from "~/data/mock-data";

type TabFilter = "All" | "New Openings" | "Existing" | "At Risk" | "Delayed" | "Needs Review";

const tabs: TabFilter[] = ["All", "New Openings", "Existing", "At Risk", "Delayed", "Needs Review"];

function filterLocations(locs: Location[], tab: TabFilter, search: string): Location[] {
  let filtered = locs;
  if (tab === "New Openings") filtered = filtered.filter((l) => l.type === "New Opening");
  else if (tab === "Existing") filtered = filtered.filter((l) => l.type === "Existing");
  else if (tab === "At Risk") filtered = filtered.filter((l) => l.status === "At Risk");
  else if (tab === "Delayed") filtered = filtered.filter((l) => l.status === "Delayed");
  else if (tab === "Needs Review") filtered = filtered.filter((l) => l.status === "Ready for Review" || l.auditRisk === "High");

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.managerName.toLowerCase().includes(q)
    );
  }
  return filtered;
}

export function LocationReadinessTable() {
  const [activeTab, setActiveTab] = useState<TabFilter>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"risk" | "readiness">("risk");

  const filtered = filterLocations(locations, activeTab, search);
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "risk") {
      const riskOrder = { High: 0, Medium: 1, Low: 2 };
      return (riskOrder[a.auditRisk] ?? 3) - (riskOrder[b.auditRisk] ?? 3);
    }
    return a.readinessScore - b.readinessScore;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-0">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="text-sm font-semibold text-slate-800">Location Readiness</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 h-8 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-44"
              />
            </div>
            <button
              onClick={() => setSort(sort === "risk" ? "readiness" : "risk")}
              className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <ArrowUpDown className="h-3 w-3" />
              Sort by {sort === "risk" ? "Risk" : "Readiness"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === tab
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
                Location
              </th>
              <th className="text-left px-3 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
                Type
              </th>
              <th className="text-left px-3 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
                Readiness
              </th>
              <th className="text-left px-3 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
                Status
              </th>
              <th className="text-left px-3 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
                Audit Risk
              </th>
              <th className="text-center px-3 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
                Blockers
              </th>
              <th className="text-center px-3 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
                Missing
              </th>
              <th className="text-left px-3 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
                Training
              </th>
              <th className="text-left px-3 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide whitespace-nowrap">
                Updated
              </th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((loc, i) => (
              <TableRow key={loc.id} location={loc} index={i} />
            ))}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <div className="flex items-center justify-center py-12 text-sm text-slate-400">
            No locations match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

function TableRow({ location: loc, index }: { location: Location; index: number }) {
  return (
    <tr
      className="border-b border-slate-50 hover:bg-slate-50 transition-colors duration-100 group"
      style={{
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* Location */}
      <td className="px-5 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-slate-900 whitespace-nowrap">
            {loc.name.replace("BloomFit ", "")}
          </span>
          <span className="text-[10px] text-slate-400">
            {loc.city}, {loc.state} · {loc.managerName}
          </span>
        </div>
      </td>

      {/* Type */}
      <td className="px-3 py-3">
        <StatusChip label={loc.type} />
      </td>

      {/* Readiness */}
      <td className="px-3 py-3">
        <div className="flex flex-col gap-1 w-24">
          <span className="text-xs font-semibold text-slate-700">{loc.readinessScore}%</span>
          <ProgressBar value={loc.readinessScore} height="h-1.5" animated delay={index * 30} />
        </div>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <StatusChip label={loc.status} />
      </td>

      {/* Audit Risk */}
      <td className="px-3 py-3">
        <StatusChip label={loc.auditRisk} />
      </td>

      {/* Blockers */}
      <td className="px-3 py-3 text-center">
        <span
          className={cn(
            "text-xs font-bold",
            loc.openBlockers > 7 ? "text-red-700" : loc.openBlockers > 3 ? "text-amber-600" : "text-slate-700"
          )}
        >
          {loc.openBlockers}
        </span>
      </td>

      {/* Missing Evidence */}
      <td className="px-3 py-3 text-center">
        <span
          className={cn(
            "text-xs font-bold",
            loc.missingEvidence > 10 ? "text-red-700" : loc.missingEvidence > 4 ? "text-amber-600" : "text-slate-700"
          )}
        >
          {loc.missingEvidence}
        </span>
      </td>

      {/* Training */}
      <td className="px-3 py-3">
        <div className="flex flex-col gap-1 w-20">
          <span className="text-xs font-semibold text-slate-700">{loc.staffTraining}%</span>
          <ProgressBar value={loc.staffTraining} height="h-1" animated delay={index * 30} />
        </div>
      </td>

      {/* Updated */}
      <td className="px-3 py-3">
        <span className="text-[10px] text-slate-400 whitespace-nowrap">{loc.lastUpdate}</span>
      </td>

      {/* Action */}
      <td className="px-3 py-3">
        <Link
          to={`/locations/${loc.id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        >
          View
          <ChevronRight className="h-3 w-3" />
        </Link>
      </td>
    </tr>
  );
}
