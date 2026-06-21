import { Search, BriefcaseBusiness, UsersRound, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-[85vh] bg-linear-to-br from-teal-50 via-white to-emerald-50 px-5 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        
        {/* Left Side */}
        <div className="space-y-7">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-medium">
            <BriefcaseBusiness size={16} />
            Find Better Career Opportunities
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-5.2xl font-black text-gray-900 leading-tight">
            Find Your Dream Job with{" "}
            <span className="text-teal-600">Confidence</span>
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
            Discover verified jobs, connect with trusted employers, and take the
            next step in your career journey, all in one place.
          </p>

          {/* Search Box */}
          {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex flex-col md:flex-row gap-3 max-w-2xl"> */}
            {/* <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
            </div> */}

            {/* <div className="hidden md:flex items-center gap-2 flex-1 px-3 border-l border-gray-200">
              <MapPin size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
            </div>

            <button className="bg-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-600 hover:scale-105 transition-all duration-300 shadow-md">
              Search
            </button>
          </div> */}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-3">
                <BriefcaseBusiness size={22} />
              </div>
              <h3 className="text-2xl font-black text-gray-900">10K+</h3>
              <p className="text-sm text-gray-500">Jobs Posted</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <UsersRound size={22} />
              </div>
              <h3 className="text-2xl font-black text-gray-900">5K+</h3>
              <p className="text-sm text-gray-500">Trusted Employers</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-28 h-28 bg-teal-200 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-60"></div>

          <div className="relative bg-white p-3 rounded-4xl shadow-2xl border border-gray-100 hover:scale-[1.02] transition-all duration-500">
            <img
              src="https://i.pinimg.com/736x/a2/79/b1/a279b1b7318a08f151c84878eaa75c52.jpg"
              alt="Job search illustration"
              className="w-full h-105 object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;