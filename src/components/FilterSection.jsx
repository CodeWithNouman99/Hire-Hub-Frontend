// import React from 'react'

// const FilterSection = () => {
//   return (
//     <div>
//       Filter
//     </div>
//   )
// }
// // 
// export default FilterSection

// components/FilterSection.jsx
import { useState } from "react";
import { Search, MapPin, X } from "lucide-react";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
const EXPERIENCE = ["Entry", "Mid", "Senior", "Lead"];
const CATEGORIES = ["Engineering", "Design", "Marketing", "Sales", "Product", "Finance"];

const FilterSection = ({ onChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    types: [],
    experience: "",
    categories: [],
    salary: 50,
  });

  const update = (next) => {
    const merged = { ...filters, ...next };
    setFilters(merged);
    onChange?.(merged);
  };

  const toggleArray = (key, value) => {
    const arr = filters[key].includes(value)
      ? filters[key].filter((v) => v !== value)
      : [...filters[key], value];
    update({ [key]: arr });
  };

  const reset = () =>
    update({
      search: "",
      location: "",
      types: [],
      experience: "",
      categories: [],
      salary: 50,
    });

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Job title or keyword"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={filters.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="City or remote"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Job Type */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Job Type</h3>
        <div className="space-y-2">
          {JOB_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => toggleArray("types", type)}
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Experience</h3>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE.map((level) => {
            const active = filters.experience === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() =>
                  update({ experience: active ? "" : level })
                }
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
                  active
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-teal-400"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = filters.categories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleArray("categories", cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition ${
                  active
                    ? "bg-teal-50 text-teal-700 border-teal-300"
                    : "bg-white text-gray-600 border-gray-200 hover:border-teal-400"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Salary */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">
            Min Salary
          </h3>
          <span className="text-sm font-semibold text-teal-600">
            ${filters.salary}k
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="5"
          value={filters.salary}
          onChange={(e) => update({ salary: Number(e.target.value) })}
          className="w-full accent-teal-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0k</span>
          <span>$200k+</span>
        </div>
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={reset}
        className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
      >
        <X className="h-4 w-4" />
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;

