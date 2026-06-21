import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

// Rename this to match your brand — keep it in sync with the one in About.jsx,
// or move both into a shared src/config.js if you'd rather not repeat it.
const SITE_NAME = "HireHub";

// Placeholder contact details — swap these for the real ones.
const CONTACT_INFO = {
  email: "support@HireHub.pk",
  phone: "+92 42 111 222 333",
  address: "Gulberg III, Lahore, Pakistan",
  hours: "Mon–Fri, 9am–6pm PKT",
};

const ROLES = ["Job seeker", "Employer", "Something else"];

const FAQS = [
  {
    q: "Is it free to browse jobs?",
    a: "Yes — creating an account and applying to jobs is always free for job seekers.",
  },
  {
    q: "How long does a job listing stay live?",
    a: "Listings stay active for 30 days by default. Employers can renew or close them anytime from their dashboard.",
  },
  {
    q: "How do I know an employer is verified?",
    a: "Verified employers carry a badge on their listings. We confirm company details before any role goes live.",
  },
  {
    q: "I'm having trouble applying to a job — who do I contact?",
    a: 'Send us a message using the form on this page and pick "Job seeker" — we typically respond within a business day.',
  },
];

function FaqItem({ q, a, open, onToggle, isLast }) {
  return (
    <div className={`py-4 ${isLast ? "" : "border-b border-gray-100"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-[14px] font-medium text-gray-900">{q}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform shrink-0 ml-3 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="mt-2 text-[13.5px] text-gray-500 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

const initialForm = {
  name: "",
  email: "",
  role: "Job seeker",
  subject: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [openFaq, setOpenFaq] = useState(0);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Tell us your name";
    if (!form.email.trim()) e.email = "Add an email so we can reply";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "That email doesn't look right";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Add a little more detail (at least 10 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    // Replace with your real API call, e.g. await api.post("/contact", form)
    setTimeout(() => setStatus("sent"), 900);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Get in touch
          </h1>
          <p className="mt-3 text-gray-600">
            Questions about a listing, your account, or hiring on {SITE_NAME}?
            We're happy to help.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="w-full lg:w-2/3 bg-white border border-gray-100 rounded-2xl p-6 md:p-8">
            {status === "sent" ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={26} className="text-teal-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Message sent
                </h2>
                <p className="text-gray-500 mb-6">
                  Thanks, {form.name.split(" ")[0]} — we'll get back to you at{" "}
                  {form.email} soon.
                </p>
                <button
                  onClick={handleReset}
                  className="text-sm font-medium border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Full name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Ayesha Khan"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400"
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400"
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    I am a
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ROLES.map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => update("role", r)}
                        className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-colors ${
                          form.role === r
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder="What's this about?"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us a bit more..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-teal-400"
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                  {status !== "sending" && <Send size={14} />}
                </button>
              </form>
            )}
          </div>

          {/* Contact info sidebar */}
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-400">Email</p>
                  <p className="text-[13.5px] font-medium text-gray-900">
                    {CONTACT_INFO.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-400">Phone</p>
                  <p className="text-[13.5px] font-medium text-gray-900">
                    {CONTACT_INFO.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-400">Office</p>
                  <p className="text-[13.5px] font-medium text-gray-900">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-400">Hours</p>
                  <p className="text-[13.5px] font-medium text-gray-900">
                    {CONTACT_INFO.hours}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                {[FaFacebook, FaInstagram, FaLinkedin, FaYoutube].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                    >
                      <Icon size={14} />
                    </a>
                  ),
                )}
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6">
              <p className="text-[13px] text-gray-300 mb-1">
                Looking for work instead?
              </p>
              <a
                href="/find-jobs"
                className="text-[14px] font-medium text-teal-400 hover:text-teal-300"
              >
                Browse open roles →
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            Frequently asked questions
          </h2>
          <div className="bg-white border border-gray-100 rounded-2xl px-6">
            {FAQS.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                isLast={i === FAQS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
