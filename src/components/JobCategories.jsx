import {
  Code2, Megaphone, Paintbrush,
  BriefcaseBusiness, Headphones, DollarSign,
} from "lucide-react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const categories = [
  { title: "Development",      icon: Code2,             query: "developer jobs" },
  { title: "Marketing",        icon: Megaphone,         query: "marketing jobs" },
  { title: "Design",           icon: Paintbrush,        query: "designer jobs" },
  { title: "Business",         icon: BriefcaseBusiness, query: "business jobs" },
  { title: "Customer Support", icon: Headphones,        query: "customer support jobs" },
  { title: "Finance",          icon: DollarSign,        query: "finance jobs" },
];

const JobCategories = () => {
  const { fetchAllJobs } = useContext(DataContext);

  return (
    <section className="relative py-20 px-5 bg-white overflow-hidden">
      {/* Subtle ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-120 h-75 rounded-full bg-teal-50 opacity-60 blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-90 h-60 rounded-full bg-orange-50 opacity-50 blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.14em] uppercase text-teal-700 bg-teal-50 border border-teal-200 px-4 py-1.5 rounded-full">
            <span className="text-[7px]">◆</span> Popular Categories
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Explore Jobs by{" "}
            <span className="relative inline-block">
              Category
              <span className="absolute left-0 bottom-1 w-full h-1.25 rounded bg-teal-400 opacity-30" />
            </span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto text-[15px] leading-relaxed">
            Choose a category to discover real job opportunities tailored for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.title}
                onClick={() => fetchAllJobs(`${cat.query} in pakistan`, "pk")}
                className="group relative text-left bg-white border-[1.5px] border-gray-200 rounded-2xl p-7 shadow-sm
                           hover:border-teal-400 hover:shadow-[0_12px_40px_#00b4a018] hover:-translate-y-1
                           transition-all duration-300 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                {/* Hover glow */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Active dot */}
                <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-12 h-12 rounded-[14px] bg-teal-50 flex items-center justify-center mb-5
                                group-hover:bg-teal-500 group-hover:-rotate-6 group-hover:scale-110
                                transition-all duration-300">
                  <Icon size={21} className="text-teal-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3
                  className="text-[17px] font-bold text-gray-900 group-hover:text-teal-700 transition-colors"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {cat.title}
                </h3>

                <p className="mt-1.5 text-[12.5px] text-gray-400 font-medium flex items-center gap-1">
                  Browse live jobs
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:text-teal-500">
                    →
                  </span>
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;