import { Briefcase, Building2, Users, MapPin, ShieldCheck, Zap, Eye, Heart, ArrowRight } from "lucide-react";

// Rename this to match your brand — keep it in sync with the one in Contact.jsx,
// or move both into a shared src/config.js if you'd rather not repeat it.
const SITE_NAME = "Rozgar";

const STATS = [
  { icon: Briefcase, value: "1,200+", label: "Jobs posted" },
  { icon: Building2, value: "340+", label: "Companies hiring" },
  { icon: Users, value: "18,000+", label: "Active job seekers" },
  { icon: MapPin, value: "12", label: "Cities covered" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust",
    desc: "Every employer is verified before a listing goes live, so applicants never have to guess.",
  },
  {
    icon: Zap,
    title: "Speed",
    desc: "Post a role in minutes, and start reviewing applications the same day.",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "Clear salary ranges and honest job descriptions, not vague postings.",
  },
  {
    icon: Heart,
    title: "Opportunity",
    desc: "From internships to leadership roles, we back every stage of a career.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="px-5 pt-16 pb-12 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block text-[12px] font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-4">
            About {SITE_NAME}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Connecting good people with good work
          </h1>
          <p className="mt-4 text-gray-600">
            {SITE_NAME} helps job seekers find roles worth applying for, and helps companies hire
            without the noise of generic job boards.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 text-center">
              <Icon size={18} className="mx-auto mb-2 text-teal-600" />
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="text-[12.5px] text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="px-5 pb-16">
        <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why we built this</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Most job boards bury good listings under spam and stale postings. We started{" "}
              {SITE_NAME} to fix that: verified employers, real salary ranges, and a search that
              actually narrows down to roles worth your time.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, teams use {SITE_NAME} to hire faster, and candidates use it to apply with
              confidence instead of guesswork.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-teal-50 rounded-xl p-4">
              <p className="text-lg font-bold text-teal-700">48 hrs</p>
              <p className="text-[12px] text-teal-700/80">Avg. employer response time</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-lg font-bold text-gray-900">92%</p>
              <p className="text-[12px] text-gray-500">Listings with a clear salary range</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-lg font-bold text-gray-900">6 min</p>
              <p className="text-[12px] text-gray-500">Median time to post a job</p>
            </div>
            <div className="bg-teal-50 rounded-xl p-4">
              <p className="text-lg font-bold text-teal-700">4.7 / 5</p>
              <p className="text-[12px] text-teal-700/80">Candidate satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-5 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What we stand for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                  <Icon size={16} className="text-teal-600" />
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to get started?</h2>
          <p className="text-gray-300 mb-6">Browse open roles or post your first listing in minutes.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="/find-job"
              className="inline-flex items-center gap-1.5 bg-teal-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-teal-400 transition-colors"
            >
              Browse jobs <ArrowRight size={14} />
            </a>
            <a
              href="/post-job"
              className="inline-flex items-center gap-1.5 border border-gray-700 text-gray-200 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Post a job
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
