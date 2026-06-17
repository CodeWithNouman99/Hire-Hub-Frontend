import { useEffect } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import JobCard from "../components/JobCard";

const FindJob = () => {
  const { jobs, loading, error, fetchAllJobs } = getData();

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 px-5 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Find Your Dream Job
          </h1>
          <p className="mt-3 text-gray-600">
            Explore latest job opportunities and apply according to your skills.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-teal-600 font-medium text-lg">
            Loading jobs...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* Jobs Section */}
        {!loading && !error && jobs?.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Section */}
            <div className="w-full lg:w-1/4">
              <FilterSection />
            </div>

            {/* Job Cards */}
            <div className="w-full lg:w-3/4 grid grid-cols-1 gap-5">
              {/* {jobs.map((job, index) => ( */}
                <JobCard />
              {/* ))} */}
            </div>
          </div>
        )}

        {/* No Jobs */}
        {!loading && !error && jobs?.length === 0 && (
          <div className="text-center bg-white border border-gray-200 rounded-xl p-10">
            <h2 className="text-xl font-semibold text-gray-900">
              No jobs found
            </h2>
            <p className="text-gray-500 mt-2">
              Please try again with another category or search keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FindJob;