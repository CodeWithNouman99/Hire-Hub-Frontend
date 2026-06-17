import { useState, useMemo } from "react";
import {
  Search, MapPin, Wifi, Building2, Clock,
  Code2, Palette, Megaphone, Coins, Briefcase,
  Headphones, LayoutGrid, ArrowRight,
} from "lucide-react";

const JOBS = [
  { id: 1, title: "Senior Frontend Developer", company: "Nexus Technologies", location: "Lahore", type: "Full-time", mode: "Hybrid", cat: "Development", salary: 180000, posted: 1, featured: true, initials: "NX" },
  { id: 2, title: "UI/UX Product Designer", company: "Skyline Studio", location: "Islamabad", type: "Full-time", mode: "Remote", cat: "Design", salary: 140000, posted: 2, featured: false, initials: "SS" },
  { id: 3, title: "Digital Marketing Lead", company: "GrowthLab", location: "Karachi", type: "Contract", mode: "On-site", cat: "Marketing", salary: 120000, posted: 3, featured: false, initials: "GL" },
  { id: 4, title: "React Native Engineer", company: "AppForge", location: "Remote", type: "Full-time", mode: "Remote", cat: "Development", salary: 200000, posted: 1, featured: true, initials: "AF" },
  { id: 5, title: "Financial Analyst", company: "Horizon Capital", location: "Lahore", type: "Full-time", mode: "On-site", cat: "Finance", salary: 110000, posted: 5, featured: false, initials: "HC" },
  { id: 6, title: "Business Dev Manager", company: "Tradeloop", location: "Karachi", type: "Full-time", mode: "Hybrid", cat: "Business", salary: 160000, posted: 4, featured: false, initials: "TL" },
  { id: 7, title: "Customer Success Specialist", company: "HelpDesk Pro", location: "Remote", type: "Part-time", mode: "Remote", cat: "Support", salary: 75000, posted: 2, featured: false, initials: "HP" },
  { id: 8, title: "Backend Python Engineer", company: "DataStream", location: "Islamabad", type: "Full-time", mode: "Hybrid", cat: "Development", salary: 190000, posted: 1, featured: false, initials: "DS" },
];

const CATEGORIES = [
  { label: "All", value: "all", Icon: LayoutGrid },
  { label: "Development", value: "Development", Icon: Code2 },
  { label: "Design", value: "Design", Icon: Palette },
  { label: "Marketing", value: "Marketing", Icon: Megaphone },
  { label: "Finance", value: "Finance", Icon: Coins },
  { label: "Business", value: "Business", Icon: Briefcase },
  { label: "Support", value: "Support", Icon: Headphones },
];

const TYPE_STYLES = {
  "Full-time": "bg-blue-50 text-blue-700",
  "Contract":  "bg-amber-50 text-amber-700",
  "Part-time": "bg-green-50 text-green-700",
};

const MODE_ICON = { Remote: Wifi, Hybrid: Building2, "On-site": Building2 };

export default function JobPortal() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let list = JOBS.filter((j) => {
      const matchCat = cat === "all" || j.cat === cat;
      const matchLoc = !location || j.location === location;
      const q = query.toLowerCase();
      const matchQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
      return matchCat && matchLoc && matchQ;
    });
    if (sort === "salary") list.sort((a, b) => b.salary - a.salary);
    else list.sort((a, b) => a.posted - b.posted);
    return list;
  }, [query, location, cat, sort]);

  return (
    <section className="py-10 px-5 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Search Bar */}
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search job title, company, or skill…"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400"
            />
          </div>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl bg-white px-3 focus:outline-none"
          >
            <option value="">All locations</option>
            <option>Remote</option>
            <option>Lahore</option>
            <option>Karachi</option>
            <option>Islamabad</option>
          </select>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(({ label, value, Icon }) => (
            <button
              key={value}
              onClick={() => setCat(value)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-all
                ${cat === value
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800"}`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">Showing {filtered.length} job{filtered.length !== 1 ? "s" : ""}</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg bg-white px-2.5 py-1.5 focus:outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="salary">Highest salary</option>
          </select>
        </div>

        {/* Job Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-2 text-gray-400">
            <Search size={28} className="text-gray-300" />
            <p className="text-sm">No jobs match your filters. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((job) => {
              const ModeIcon = MODE_ICON[job.mode] || Building2;
              const salaryK = Math.round(job.salary / 1000);
              const postedLabel = job.posted === 1 ? "Today" : `${job.posted}d ago`;

              return (
                <div
                  key={job.id}
                  className={`bg-white rounded-2xl p-5 flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-md
                    ${job.featured ? "border-2 border-blue-300" : "border border-gray-100"}`}
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 border border-gray-200 flex-shrink-0">
                        {job.initials}
                      </div>
                      <div>
                        {job.featured && (
                          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full block mb-1">
                            Featured
                          </span>
                        )}
                        <p className="text-[15px] font-semibold text-gray-900 leading-tight">{job.title}</p>
                        <p className="text-[12.5px] text-gray-500">{job.company}</p>
                      </div>
                    </div>
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${TYPE_STYLES[job.type]}`}>
                      {job.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
                    <span className="flex items-center gap-1 text-[12px] text-gray-400">
                      <MapPin size={12} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] text-gray-400">
                      <ModeIcon size={12} /> {job.mode}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] text-gray-400">
                      <Clock size={12} /> {postedLabel}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <p className="text-[13.5px] font-semibold text-gray-900">
                      PKR {salaryK}k <span className="text-[11px] font-normal text-gray-400">/mo</span>
                    </p>
                    <button className="inline-flex items-center gap-1.5 text-[12.5px] font-medium border border-gray-200 rounded-lg px-3.5 py-1.5 hover:bg-gray-50 transition-colors">
                      Apply <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}