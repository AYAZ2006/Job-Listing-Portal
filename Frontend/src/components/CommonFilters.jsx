import React from "react";
const WORK_MODES = ["In Office", "Remote", "Field Work", "Hybrid"];
const WORK_TYPES = ["Full Time", "Part Time", "Contract"];
const DATE_RANGES = [{ label: "Past 24 Hours", value: "past24hours" },{ label: "Past Week", value: "pastweek" },{ label: "Past Month", value: "pastmonth" },{ label: "Past 3 Months", value: "past3months" },{ label: "Past 6 Months", value: "past6months" },{ label: "Past Year", value: "pastyear" },];
export default function CommonFilters({ filters, setFilters }) {
  const toggle = (key, value) => {setFilters(prev => ({...prev,[key]: prev[key] === value ? "" : value}));
};

  return (
    <aside className="w-80 p-6 bg-[#1a1a1a] border-r border-white/10 hidden md:block overflow-y-auto scrollbar-hide mt-25 ml-5 rounded-lg">
      <style jsx>{`.scrollbar-hide {-ms-overflow-style: none;scrollbar-width: none;}.scrollbar-hide::-webkit-scrollbar {display: none;}`}</style>
      <h2 className="text-xl font-semibold mb-8 text-white">Filters</h2>
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Work Mode</h3>
        <div className="flex flex-wrap gap-3">
          {WORK_MODES.map(mode => (
            <button key={mode} onClick={() => toggle("workMode", mode)} className={`px-5 py-2.5 rounded-full cursor-pointer border text-sm font-medium transition-all whitespace-nowrap ${filters.workMode === mode ? "bg-black text-white border-black shadow-md" : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white"}`}>{mode}</button>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Type</h3>
        <div className="flex flex-wrap gap-3">
          {WORK_TYPES.map(type => (
            <button key={type} onClick={() => toggle("workType", type)} className={`px-5 py-2.5 rounded-full cursor-pointer border text-sm font-medium transition-all whitespace-nowrap ${filters.workType === type ? "bg-black text-white border-black shadow-md" : "border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white"}`}>{type}</button>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Date Posted</h3>
        <div className="space-y-3">
          {DATE_RANGES.map(({ label, value }) => (
            <button key={value} onClick={() => toggle("datePosted", value)} className={`w-full px-5 py-3 cursor-pointer rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${filters.datePosted === value ? "bg-black text-white border-black shadow-lg" : "border-gray-600 text-gray-400 hover:border-gray-300 hover:text-white bg-[#262626]"}`}><span>{label}</span>{filters.datePosted === value && (<span className="ml-2 text-xs"></span>)}</button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-3">Location</h3>
        <input type="text" placeholder="City, state or remote" value={filters.location} onChange={e => setFilters(prev => ({ ...prev, location: e.target.value }))} className="w-full px-4 py-3 bg-[#262626] border border-gray-600 rounded-lg outline-none text-white placeholder-gray-500 focus:border-black transition"/>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-3">Keywords</h3>
        <input type="text" placeholder="Job title, skills, company..." value={filters.keywords} onChange={e => setFilters(prev => ({ ...prev, keywords: e.target.value }))} className="w-full px-4 py-3 bg-[#262626] border border-gray-600 rounded-lg outline-none text-white placeholder-gray-500 focus:border-black transition"/>
      </div>
    </aside>
  );
}