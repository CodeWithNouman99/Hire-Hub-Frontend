import { createContext, useContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mapJobData = (apiJob) => {
    // Calculate days since posted
    const postedTimestamp = apiJob.job_posted_at_timestamp;
    let daysAgo = undefined;
    
    if (postedTimestamp) {
      const now = Math.floor(Date.now() / 1000);
      daysAgo = Math.floor((now - postedTimestamp) / (60 * 60 * 24));
      if (daysAgo < 0) daysAgo = 0;
    }

    let salary = null;
    if (apiJob.job_min_salary && apiJob.job_max_salary) {
      salary = Math.round((apiJob.job_min_salary + apiJob.job_max_salary) / 2);
    } else if (apiJob.job_min_salary) {
      salary = apiJob.job_min_salary;
    } else if (apiJob.job_max_salary) {
      salary = apiJob.job_max_salary;
    }

    let mode = "On-site";
    if (apiJob.job_is_remote === true) {
      mode = "Remote";
    } else if (apiJob.job_is_hybrid === true) {
      mode = "Hybrid";
    }

    let type = apiJob.job_employment_type || "Full-time";
    const typeMap = {
      "FULL_TIME": "Full-time",
      "PART_TIME": "Part-time",
      "CONTRACTOR": "Contract",
      "INTERN": "Internship",
      "TEMPORARY": "Contract",
      "OTHER": "Full-time"
    };
    type = typeMap[type] || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return {
      id: apiJob.job_id || `job-${Math.random()}`,
      title: apiJob.job_title || "Untitled Position",
      company: apiJob.employer_name || "Unknown Company",
      logo: apiJob.employer_logo || null,
      location: apiJob.job_city || apiJob.job_country || "Remote",
      mode: mode,
      type: type,
      salary: salary,
      posted: daysAgo,
      featured: false,
      description: apiJob.job_description || "",
      applyLink: apiJob.job_apply_link || "#",
      category: apiJob.job_category || "general"
    };
  };

  const fetchAllJobs = async (query = "developer jobs in pakistan") => {
    console.log("🔍 Fetching jobs with query:", query);

    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    if (!apiKey) {
      console.error("❌ API key is missing!");
      setError("⚠️ API key is missing. Please check your .env file.");
      setLoading(false);
      return;
    }

    console.log("✅ API Key found:", apiKey.substring(0, 10) + "...");

    setLoading(true);
    setError("");

    try {
      // ✅ FIXED: URL is 'jsearch' not 'jssearch'
      const response = await axios.get(
        "https://jsearch.p.rapidapi.com/search-v2",  // ✅ Fixed URL
        {
          params: {
            query: query,
            num_pages: "3",
            country: "pk",
            date_posted: "all",
          },
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "jsearch.p.rapidapi.com",  // ✅ Fixed host
          },
        }
      );

      console.log("✅ API Response Status:", response.status);
      
      // Check if we have data
      const apiJobs = response.data?.data || [];
      console.log("📊 Raw Jobs Count:", apiJobs.length);

      if (Array.isArray(apiJobs) && apiJobs.length > 0) {
        const mappedJobs = apiJobs.map(mapJobData);
        console.log("✅ Mapped Jobs:", mappedJobs.length);
        setJobs(mappedJobs);
        setError("");
      } else {
        setJobs([]);
        setError("No jobs found. Try a different search query.");
      }
    } catch (error) {
      console.error("❌ API Error:", error);
      
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        
        if (error.response.status === 403) {
          setError("❌ Invalid API key. Please check your RapidAPI subscription.");
        } else if (error.response.status === 429) {
          setError("❌ Too many requests. Please try again later.");
        } else {
          setError(`❌ API Error: ${error.response.status} - ${error.response.data?.message || "Unknown error"}`);
        }
      } else if (error.request) {
        setError("❌ Network error. Please check your internet connection.");
      } else {
        setError(`❌ Error: ${error.message}`);
      }
      
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ jobs, loading, error, fetchAllJobs }}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("getData must be used within a DataProvider");
  }
  return context;
};