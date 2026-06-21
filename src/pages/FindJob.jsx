import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import JobCard from "../components/JobCard";

const initialFilters = { category: "all", type: "", mode: "", location: "" };

const FindJob = () => {
  const { jobs, loading, error, fetchAllJobs } = getData();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const updateFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  const resetFilters = () => {
    setFilters(initialFilters);
    setQuery("");
  };

  const filteredJobs = useMemo(() => {
    if (!jobs || !Array.isArray(jobs) || jobs.length === 0) return [];

    let list = jobs.filter((job) => {
      // Handle category filter - you might want to add a category field in mapping
      const matchCategory = filters.category === "all" || job.category === filters.category;
      
      // Handle type filter
      const matchType = !filters.type || 
        job.type?.toLowerCase() === filters.type.toLowerCase() ||
        job.type?.toLowerCase().replace(/_/g, ' ') === filters.type.toLowerCase();
      
      // Handle mode filter
      const matchMode = !filters.mode || 
        job.mode?.toLowerCase() === filters.mode.toLowerCase();
      
      // Handle location filter
      const matchLocation = !filters.location || 
        job.location?.toLowerCase().includes(filters.location.toLowerCase());
      
      // Handle search query
      const q = query.toLowerCase().trim();
      const matchQuery = !q ||
        job.title?.toLowerCase().includes(q) ||
        job.company?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q);

      return matchCategory && matchType && matchMode && matchLocation && matchQuery;
    });

    // Sort jobs
    if (sort === "salary") {
      list.sort((a, b) => (b.salary || 0) - (a.salary || 0));
    } else if (sort === "newest") {
      list.sort((a, b) => (a.posted || 999) - (b.posted || 999));
    }

    return list;
  }, [jobs, filters, query, sort]);

  // Debug: Log jobs data
  console.log("Jobs in FindJob:", jobs);
  console.log("Filtered Jobs:", filteredJobs);

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Find Your Dream Job</h1>
          <p className="mt-3 text-gray-600">
            Explore latest job opportunities and apply according to your skills.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search job title or company…"
              className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block w-1/4">
              <div className="bg-white border border-gray-100 rounded-2xl h-96 animate-pulse" />
            </div>
            <div className="w-full lg:w-3/4 grid grid-cols-1 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl h-28 animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center bg-white border border-red-100 rounded-xl p-10">
            <p className="text-red-500 font-medium mb-3">{error}</p>
            <button
              onClick={() => fetchAllJobs()}
              className="text-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Jobs Section */}
        {!loading && !error && jobs && jobs.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSection 
              jobs={jobs} 
              filters={filters} 
              onChange={updateFilter} 
              onReset={resetFilters} 
            />

            <div className="w-full lg:w-3/4">
              {/* Stats row */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
                </p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg bg-white px-2.5 py-1.5 focus:outline-none"
                >
                  <option value="newest">Newest first</option>
                  <option value="salary">Highest salary</option>
                </select>
              </div>

              {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-5">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id || Math.random()} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center bg-white border border-gray-200 rounded-xl p-10">
                  <h2 className="text-xl font-semibold text-gray-900">No jobs match your filters</h2>
                  <p className="text-gray-500 mt-2">Try adjusting your search or clearing filters.</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 text-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No jobs returned from the API at all */}
        {!loading && !error && (!jobs || jobs.length === 0) && (
          <div className="text-center bg-white border border-gray-200 rounded-xl p-10">
            <h2 className="text-xl font-semibold text-gray-900">No jobs found</h2>
            <p className="text-gray-500 mt-2">Please check back later for new opportunities.</p>
            <button
              onClick={() => fetchAllJobs()}
              className="mt-4 text-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FindJob;