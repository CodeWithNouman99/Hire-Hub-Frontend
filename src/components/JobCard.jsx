import { MapPin, Wifi, Building2, Clock, ArrowRight } from "lucide-react";

const TYPE_STYLES = {
  "Full-time": "bg-blue-50 text-blue-700",
  "Part-time": "bg-green-50 text-green-700",
  "Contract": "bg-amber-50 text-amber-700",
  "Internship": "bg-purple-50 text-purple-700",
};

const MODE_ICON = { 
  Remote: Wifi, 
  Hybrid: Building2, 
  "On-site": Building2 
};

const formatPosted = (days) => {
  if (days === undefined || days === null || isNaN(days) || days < 0) return "Recently";
  if (days === 0) return "Today";
  if (days === 1) return "1d ago";
  return `${days}d ago`;
};

const JobCard = ({ job }) => {
  // Debug: Log the job data
  console.log("JobCard received:", job);

  if (!job) {
    console.warn("JobCard: No job data received");
    return null;
  }

  const { 
    title, 
    company, 
    logo, 
    location, 
    mode, 
    type, 
    salary, 
    posted, 
    featured,
    applyLink 
  } = job;

  // Debug: Log individual fields
  console.log("Title:", title, "Company:", company);

  const ModeIcon = MODE_ICON[mode] || Building2;
  const salaryK = salary ? Math.round(salary / 1000) : null;

  return (
    <div
      className={`bg-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:-translate-y-0.5 hover:shadow-md
        ${featured ? "border-2 border-teal-300" : "border border-gray-100"}`}
    >
      {/* Logo */}
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 flex-shrink-0 overflow-hidden">
        {logo ? (
          <img src={logo} alt={company} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-semibold text-gray-600">
            {company?.slice(0, 2).toUpperCase() || "JD"}
          </span>
        )}
      </div>

      {/* Title, company, meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {featured && (
            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
          {type && (
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                TYPE_STYLES[type] || "bg-gray-50 text-gray-600"
              }`}
            >
              {type}
            </span>
          )}
        </div>

        <h3 className="text-[15px] font-semibold text-gray-900 truncate">
          {title || "Untitled Position"}
        </h3>
        <p className="text-[13px] text-gray-500 mb-2">
          {company || "Unknown Company"}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {location && (
            <span className="flex items-center gap-1 text-[12px] text-gray-400">
              <MapPin size={12} /> {location}
            </span>
          )}
          {mode && (
            <span className="flex items-center gap-1 text-[12px] text-gray-400">
              <ModeIcon size={12} /> {mode}
            </span>
          )}
          {posted !== undefined && posted !== null && !isNaN(posted) && posted >= 0 && (
            <span className="flex items-center gap-1 text-[12px] text-gray-400">
              <Clock size={12} /> {formatPosted(posted)}
            </span>
          )}
        </div>
      </div>

      {/* Salary + Apply */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-5">
        {salaryK && (
          <p className="text-[14px] font-semibold text-gray-900 whitespace-nowrap">
            PKR {salaryK}k <span className="text-[11px] font-normal text-gray-400">/mo</span>
          </p>
        )}
        <a 
          href={applyLink || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium border border-gray-200 rounded-lg px-3.5 py-1.5 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Apply <ArrowRight size={12} />
        </a>
      </div>
    </div>
  );
};

export default JobCard;