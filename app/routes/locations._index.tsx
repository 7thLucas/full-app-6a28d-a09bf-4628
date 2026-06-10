import { useState } from "react";
import { Search, SlidersHorizontal, Plus, Download } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { LocationCard } from "~/components/locations/LocationCard";
import { ToastProvider, useToast } from "~/components/ui/Toast";
import { locations, type LocationStatus, type LocationType } from "~/data/mock-data";
import { useConfigurables } from "~/modules/configurables";

function LocationsContent() {
  const { config, loading } = useConfigurables();
  const { showToast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LocationStatus>("All");
  const [regionFilter, setRegionFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState<"All" | LocationType>("All");

  const pageTitle = !loading ? (config.locationsPageTitle ?? "Locations") : "Locations";
  const pageSubtitle = !loading
    ? (config.locationsPageSubtitle ?? "Monitor readiness across all BloomFit Studios locations.")
    : "Monitor readiness across all BloomFit Studios locations.";

  const allRegions = ["All", ...Array.from(new Set(locations.map((l) => l.region)))];

  const filtered = locations.filter((loc) => {
    const matchesSearch =
      !search ||
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.city.toLowerCase().includes(search.toLowerCase()) ||
      loc.managerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || loc.status === statusFilter;
    const matchesRegion = regionFilter === "All" || loc.region === regionFilter;
    const matchesType = typeFilter === "All" || loc.type === typeFilter;
    return matchesSearch && matchesStatus && matchesRegion && matchesType;
  });

  return (
    <PageLayout>
      <TopHeader
        title={pageTitle}
        subtitle={pageSubtitle}
        statusLine={`${locations.length} locations · ${locations.filter((l) => l.status !== "On Track").length} need attention`}
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 h-9 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <Plus className="h-3.5 w-3.5" />
              Add Location
            </button>
            <button
              onClick={() => showToast("Location export prepared", "info")}
              className="inline-flex items-center gap-1.5 h-9 px-3 text-xs font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
          </>
        }
      />

      <PageContent>
        {/* Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search locations, managers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 h-9 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="h-9 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            <option>All Statuses</option>
            <option>On Track</option>
            <option>At Risk</option>
            <option>Delayed</option>
            <option>Ready for Review</option>
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="h-9 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            {allRegions.map((r) => (
              <option key={r} value={r}>
                {r === "All" ? "All Regions" : r}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="h-9 px-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
          >
            <option value="All">All Types</option>
            <option value="New Opening">New Openings</option>
            <option value="Existing">Existing</option>
          </select>

          <span className="text-xs text-slate-400 ml-auto">
            {filtered.length} of {locations.length} locations
          </span>
        </div>

        {/* Card Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {filtered.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="h-10 w-10 text-slate-200 mb-3" />
            <p className="text-sm font-medium text-slate-500">No locations found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </PageContent>
    </PageLayout>
  );
}

export default function LocationsPage() {
  return (
    <ToastProvider>
      <LocationsContent />
    </ToastProvider>
  );
}
