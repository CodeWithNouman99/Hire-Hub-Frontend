import { useMemo } from "react";
import {
  LayoutGrid,
  Code2,
  Palette,
  Megaphone,
  Coins,
  Briefcase,
  Headphones,
  X,
} from "lucide-react";

const CATEGORY_ICONS = {
  Development: Code2,
  Design: Palette,
  Marketing: Megaphone,
  Finance: Coins,
  Business: Briefcase,
  Support: Headphones,
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODES = ["Remote", "Hybrid", "On-site"];

/**
 * Controlled filter sidebar.
 * filters: { category: "all" | string, type: string, mode: string, location: string }
 * onChange(key, value) updates a single filter
 * onReset() clears all filters
 */
const FilterSection = ({ jobs = [], filters, onChange, onReset }) => {
  const categories = useMemo(() => {
    const counts = {};
    jobs.forEach((j) => {
      if (j.cat) counts[j.cat] = (counts[j.cat] || 0) + 1;
    });
    return Object.keys(counts).map((name) => ({ name, count: counts[name] }));
  }, [jobs]);

  const locations = useMemo(() => {
    return Array.from(new Set(jobs.map((j) => j.location).filter(Boolean)));
  }, [jobs]);

  const hasActiveFilters =
    filters.category !== "all" || filters.type || filters.mode || filters.location;

  const toggleType = (t) => onChange("type", filters.type === t ? "" : t);
  const toggleMode = (m) => onChange("mode", filters.mode === m ? "" : m);

  return (
    <aside className="w-full lg:w-1/4 lg:sticky lg:top-6 self-start">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-[12px] text-gray-400 hover:text-gray-700"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        {/* Category */}
        <div>
          <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wide mb-2.5">
            Category
          </p>
          <div className="space-y-1">
            <button
              onClick={() => onChange("category", "all")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] transition-colors ${
                filters.category === "all"
                  ? "bg-teal-50 text-teal-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutGrid size={14} /> All categories
              </span>
              <span className="text-[11px] text-gray-400">{jobs.length}</span>
            </button>

            {categories.map(({ name, count }) => {
              const Icon = CATEGORY_ICONS[name] || Briefcase;
              return (
                <button
                  key={name}
                  onClick={() => onChange("category", name)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] transition-colors ${
                    filters.category === name
                      ? "bg-teal-50 text-teal-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} /> {name}
                  </span>
                  <span className="text-[11px] text-gray-400">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Job type */}
        <div>
          <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wide mb-2.5">
            Job type
          </p>
          <div className="space-y-1.5">
            {JOB_TYPES.map((t) => (
              <label key={t} className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.type === t}
                  onChange={() => toggleType(t)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        {/* Work mode */}
        <div>
          <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wide mb-2.5">
            Work mode
          </p>
          <div className="space-y-1.5">
            {WORK_MODES.map((m) => (
              <label key={m} className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.mode === m}
                  onChange={() => toggleMode(m)}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                {m}
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wide mb-2.5">
            Location
          </p>
          <select
            value={filters.location}
            onChange={(e) => onChange("location", e.target.value)}
            className="w-full text-[13px] border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-gray-400"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
};

export default FilterSection;
