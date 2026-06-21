import { useState } from 'react';
import {
  Briefcase, MapPin, DollarSign, Plus, X, AlertCircle, Building2,
  FileText, Users, Mail, Link2, Clock3, Send, CheckCircle2, Tag,
} from 'lucide-react';

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const LEVELS = ['Entry', 'Mid', 'Senior', 'Lead'];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'PKR'];
const PERIODS = ['year', 'month', 'hour'];

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
  .font-display { font-family: 'Fraunces', Georgia, serif; }
  .font-mono-custom { font-family: 'IBM Plex Mono', monospace; }
  .font-body { font-family: 'Inter', sans-serif; }
`;

const emptyForm = {
  title: '', company: '', department: '', location: '', remote: false,
  jobType: '', level: '',
  salaryMin: '', salaryMax: '', currency: 'USD', period: 'year',
  description: '', responsibilities: [], requirements: [], skills: [],
  applyMethod: 'email', applyEmail: '', applyUrl: '',
  deadline: '', featured: false,
};

function ErrorText({ msg }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600">
      <AlertCircle className="h-3 w-3 shrink-0" />
      {msg}
    </p>
  );
}

function FieldLabel({ children, required }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-slate-700">
      {children}
      {required && <span className="ml-1 text-rose-500">*</span>}
    </label>
  );
}

function Section({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          <Icon className="h-4 w-4 text-slate-600" />
        </div>
        <div>
          <h2 className="font-display text-lg text-slate-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function ListInput({ items, onAdd, onRemove, placeholder }) {
  const [value, setValue] = useState('');
  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue('');
  };
  return (
    <div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
        <button
          type="button"
          onClick={submit}
          className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
      {items.length > 0 && (
        <ul className="mt-3 space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <span>{item}</span>
              <button type="button" onClick={() => onRemove(i)} className="shrink-0 text-slate-400 hover:text-rose-600">
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function PostJobPage() {
  const [form, setForm] = useState(emptyForm);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [published, setPublished] = useState(false);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    if (!form.skills.includes(v)) update('skills', [...form.skills, v]);
    setSkillInput('');
  };
  const removeSkill = (i) => update('skills', form.skills.filter((_, idx) => idx !== i));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Job title is required';
    if (!form.company.trim()) e.company = 'Company name is required';
    if (!form.remote && !form.location.trim()) e.location = 'Add a location, or mark this role as remote';
    if (!form.jobType) e.jobType = 'Choose a job type';
    if (!form.level) e.level = 'Choose an experience level';
    if (form.description.trim().length < 40) e.description = 'Write at least 40 characters so candidates know what to expect';
    if (form.applyMethod === 'email' && !form.applyEmail.trim()) e.applyEmail = 'Add an email to receive applications';
    if (form.applyMethod === 'url' && !form.applyUrl.trim()) e.applyUrl = 'Add a link to your application form';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePublish = () => {
    if (validate()) {
      setPublished(true);
    } else {
      showToast('Fix the highlighted fields to publish');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDraft = () => showToast('Draft saved');

  const handleReset = () => {
    setForm(emptyForm);
    setErrors({});
    setPublished(false);
  };

  const salaryLabel = () => {
    if (!form.salaryMin && !form.salaryMax) return null;
    const sym = { USD: '$', EUR: '€', GBP: '£', PKR: 'Rs ' }[form.currency];
    if (form.salaryMin && form.salaryMax) return `${sym}${form.salaryMin} – ${sym}${form.salaryMax} / ${form.period}`;
    return `${sym}${form.salaryMin || form.salaryMax} / ${form.period}`;
  };

  const Toast = () =>
    toast ? (
      <div className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        {toast}
      </div>
    ) : null;

  if (published) {
    return (
      <div className="font-body flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <style>{FONT_STYLES}</style>
        <Toast />
        <div className="w-full max-w-md text-center">
          <div className="relative mx-auto mb-6 inline-block">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <div className="font-mono-custom absolute -right-4 -top-3 rotate-12 rounded border-2 border-amber-400 bg-white px-2 py-0.5 text-xs uppercase tracking-widest text-amber-600">
              Live
            </div>
          </div>
          <p className="font-mono-custom mb-2 text-xs uppercase tracking-widest text-rose-600">Published</p>
          <h1 className="font-display mb-3 text-3xl text-slate-900">{form.title} is live</h1>
          <p className="mb-8 text-slate-600">
            Candidates can now find this listing under {form.company}. You can edit or close it anytime from your dashboard.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => showToast('Link copied')}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400"
            >
              Copy link
            </button>
            <button
              onClick={handleReset}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Post another job
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-body min-h-screen bg-slate-50">
      <style>{FONT_STYLES}</style>
      <Toast />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="font-mono-custom mb-1 text-xs uppercase tracking-widest text-rose-600">Hiring · New listing</p>
            <h1 className="font-display text-3xl text-slate-900">Post a job</h1>
          </div>
          <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <Briefcase className="h-4 w-4" />
            <span>Listings stay live for 30 days</span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-5">
        {/* FORM */}
        <div className="space-y-6 lg:col-span-3">

          <Section icon={Building2} title="The basics" subtitle="Who's hiring, and for what.">
            <div>
              <FieldLabel required>Job title</FieldLabel>
              <input
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="e.g. Frontend Engineer"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <ErrorText msg={errors.title} />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel required>Company name</FieldLabel>
                <input
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                  placeholder="e.g. Northwind Co."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
                <ErrorText msg={errors.company} />
              </div>
              <div>
                <FieldLabel>Department</FieldLabel>
                <input
                  value={form.department}
                  onChange={(e) => update('department', e.target.value)}
                  placeholder="e.g. Engineering"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>
            </div>

            <div>
              <FieldLabel required={!form.remote}>Location</FieldLabel>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={form.location}
                    onChange={(e) => update('location', e.target.value)}
                    disabled={form.remote}
                    placeholder="e.g. Lahore, Pakistan"
                    className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => update('remote', !form.remote)}
                  className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium ${
                    form.remote ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  Remote
                </button>
              </div>
              <ErrorText msg={errors.location} />
            </div>

            <div>
              <FieldLabel required>Job type</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {JOB_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update('jobType', t)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm ${
                      form.jobType === t ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <ErrorText msg={errors.jobType} />
            </div>

            <div>
              <FieldLabel required>Experience level</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => update('level', l)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm ${
                      form.level === l ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <ErrorText msg={errors.level} />
            </div>
          </Section>

          <Section icon={DollarSign} title="Compensation" subtitle="Leave blank to keep the salary private.">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Minimum</FieldLabel>
                <input
                  type="number"
                  value={form.salaryMin}
                  onChange={(e) => update('salaryMin', e.target.value)}
                  placeholder="60000"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>
              <div>
                <FieldLabel>Maximum</FieldLabel>
                <input
                  type="number"
                  value={form.salaryMax}
                  onChange={(e) => update('salaryMax', e.target.value)}
                  placeholder="90000"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Currency</FieldLabel>
                <select
                  value={form.currency}
                  onChange={(e) => update('currency', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <FieldLabel>Per</FieldLabel>
                <select
                  value={form.period}
                  onChange={(e) => update('period', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  {PERIODS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </Section>

          <Section icon={FileText} title="Description" subtitle="What will this person actually do?">
            <div>
              <FieldLabel required>Overview</FieldLabel>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                rows={5}
                placeholder="Describe the role, the team, and what success looks like in the first six months..."
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <div className="mt-1 flex items-center justify-between">
                <ErrorText msg={errors.description} />
                <p className="font-mono-custom text-xs text-slate-400">{form.description.length} characters</p>
              </div>
            </div>

            <div>
              <FieldLabel>Responsibilities</FieldLabel>
              <ListInput
                items={form.responsibilities}
                onAdd={(v) => update('responsibilities', [...form.responsibilities, v])}
                onRemove={(i) => update('responsibilities', form.responsibilities.filter((_, idx) => idx !== i))}
                placeholder="e.g. Ship features end-to-end with our product team"
              />
            </div>

            <div>
              <FieldLabel>Requirements</FieldLabel>
              <ListInput
                items={form.requirements}
                onAdd={(v) => update('requirements', [...form.requirements, v])}
                onRemove={(i) => update('requirements', form.requirements.filter((_, idx) => idx !== i))}
                placeholder="e.g. 2+ years building production React apps"
              />
            </div>
          </Section>

          <Section icon={Tag} title="Skills" subtitle="Short tags candidates can scan quickly.">
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                placeholder="e.g. React"
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
              <button
                type="button"
                onClick={addSkill}
                className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>
            {form.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.skills.map((s, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {s}
                    <button type="button" onClick={() => removeSkill(i)} className="text-slate-400 hover:text-rose-600">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Section>

          <Section icon={Users} title="How to apply" subtitle="Where should applications land, and until when.">
            <div>
              <FieldLabel required>Application method</FieldLabel>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => update('applyMethod', 'email')}
                  className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm ${
                    form.applyMethod === 'email' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  <Mail className="h-4 w-4" /> Email
                </button>
                <button
                  type="button"
                  onClick={() => update('applyMethod', 'url')}
                  className={`flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm ${
                    form.applyMethod === 'url' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  <Link2 className="h-4 w-4" /> External link
                </button>
              </div>
            </div>

            {form.applyMethod === 'email' ? (
              <div>
                <FieldLabel required>Application email</FieldLabel>
                <input
                  type="email"
                  value={form.applyEmail}
                  onChange={(e) => update('applyEmail', e.target.value)}
                  placeholder="careers@company.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
                <ErrorText msg={errors.applyEmail} />
              </div>
            ) : (
              <div>
                <FieldLabel required>Application link</FieldLabel>
                <input
                  type="url"
                  value={form.applyUrl}
                  onChange={(e) => update('applyUrl', e.target.value)}
                  placeholder="https://company.com/apply"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
                <ErrorText msg={errors.applyUrl} />
              </div>
            )}

            <div>
              <FieldLabel>Application deadline</FieldLabel>
              <div className="relative">
                <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => update('deadline', e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-800">Feature this listing</p>
                <p className="text-xs text-slate-500">Appears at the top of search results with a stamp badge.</p>
              </div>
              <button
                type="button"
                onClick={() => update('featured', !form.featured)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${form.featured ? 'bg-rose-600' : 'bg-slate-300'}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </Section>

          <div className="flex items-center justify-end gap-3 pb-2">
            <button
              onClick={handleDraft}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-white"
            >
              Save as draft
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
            >
              Publish job <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* LIVE PREVIEW */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-10">
            <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-slate-50 shadow-xl">
              {form.featured && (
                <div className="font-mono-custom absolute right-5 top-5 rotate-6 rounded border-2 border-amber-400 px-2 py-0.5 text-xs uppercase tracking-widest text-amber-300">
                  Featured
                </div>
              )}

              <div className="mb-5 flex items-center gap-3">
                <div className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-lg text-slate-100">
                  {form.company ? form.company[0].toUpperCase() : '?'}
                </div>
                <div>
                  <p className="font-mono-custom text-xs uppercase tracking-widest text-slate-400">Live preview</p>
                  <p className="text-sm text-slate-300">How candidates will see it</p>
                </div>
              </div>

              <h2 className="font-display text-2xl text-white">{form.title || 'Your job title'}</h2>
              <p className="mt-1 text-sm text-slate-300">
                {form.company || 'Company'}
                {' · '}
                {form.remote ? 'Remote' : (form.location || 'Location')}
                {form.jobType && ` · ${form.jobType}`}
              </p>

              {salaryLabel() && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                  <DollarSign className="h-3.5 w-3.5" />
                  {salaryLabel()}
                </p>
              )}

              <div className="my-5 h-px bg-slate-700" />

              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
                {form.description || 'A short, honest description of the role will show up here as you write it.'}
              </p>

              {form.responsibilities.length > 0 && (
                <div className="mt-5">
                  <p className="font-mono-custom mb-2 text-xs uppercase tracking-widest text-slate-400">Responsibilities</p>
                  <ul className="space-y-1.5">
                    {form.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {form.requirements.length > 0 && (
                <div className="mt-5">
                  <p className="font-mono-custom mb-2 text-xs uppercase tracking-widest text-slate-400">Requirements</p>
                  <ul className="space-y-1.5">
                    {form.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {form.skills.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {form.skills.map((s, i) => (
                    <span key={i} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{s}</span>
                  ))}
                </div>
              )}

              <button disabled className="mt-6 w-full cursor-not-allowed rounded-lg bg-rose-600 py-2.5 text-sm font-medium text-white opacity-60">
                Apply now
              </button>
              <p className="font-mono-custom mt-3 text-xs text-slate-500">
                {form.deadline ? `Apply by ${form.deadline}` : 'Posted just now'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}