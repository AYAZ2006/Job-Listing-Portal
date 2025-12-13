import React, { useState, useEffect } from "react";
import { Briefcase, GraduationCap, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, type } = location.state || {};
  const [workType, setWorkType] = useState(item?.work_type || "");
  const [workMode, setWorkMode] = useState(item?.work_mode || "");
  const [loading, setLoading] = useState(false);
  useEffect(() => {if (!item || !type) {toast.error("No item to edit");navigate("/manage");}}, [item, type, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item) return;
    const form = e.target;
    const formData = new FormData(form);
    const email = localStorage.getItem("recruiter_email");
    formData.set("email", email);
    formData.set("work_type", workType);
    formData.set("work_mode", workMode);
    setLoading(true);
    try {
      const deleteUrl = type === "job" ? `https://job-listing-portal-8.onrender.com/jobs/${item.id}/` : `https://job-listing-portal-8.onrender.com/internships/${item.id}/`;
      await axios.delete(deleteUrl);
      const postUrl = type === "job" ? "https://job-listing-portal-8.onrender.com/jobs/" : "https://job-listing-portal-8.onrender.com/internships/";
      await axios.post(postUrl, formData, {headers: { "Content-Type": "multipart/form-data" },});
      toast.success("Updated successfully!");
      navigate("/manage");
    } catch (err) {
      console.error("Edit failed:", err);
      toast.error(err.response?.data?.detail || "Failed to update");
    } finally {
      setLoading(false);
    }
  };
  if (!item) return null;
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <HashLoader color="#36d7b7" size={80} />
        </div>
      )}
      <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-[#121212] pt-24">
        <div className="bg-white/10 border border-white/15 backdrop-blur-xl rounded-2xl w-full max-w-6xl p-5 animate-[slideUp_0.35s_ease-out]">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate("/manage")} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition backdrop-blur-xl"><ArrowLeft size={24} /></button>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">{type === "job" ? <Briefcase size={32} /> : <GraduationCap size={32} />}Edit {type === "job" ? "Job" : "Internship"}</h2>
          </div>
          <form className="flex flex-col gap-5 mt-4 text-white" onSubmit={handleSubmit}>
            {type === "job" && (
              <>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                  <label className="block mb-2 text-sm opacity-80">Job Title</label>
                  <input type="text" name="job_title" defaultValue={item.job_title} className="w-full bg-black/50 border border-white/20 p-3 rounded-lg focus:border-teal-500/50 transition" required/>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                  <label className="block mb-2 text-sm opacity-80">Company</label>
                  <div className="flex gap-3">
                    <input type="text" name="company_name" defaultValue={item.company_name} className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" required/>
                    <label className="bg-black/50 border border-white/20 p-3 rounded-lg cursor-pointer text-sm flex items-center justify-center whitespace-nowrap">Change Logo
                      <input name="company_logo" type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Openings</label>
                    <input name="openings" type="number" defaultValue={item.openings || ""} className="w-full bg-black/50 border border-white/20 p-3 rounded-lg"/>
                  </div>
                  <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Work Type</label>
                    <div className="flex gap-3">
                      {["Full Time", "Part Time"].map((t) => (
                        <button key={t} type="button" onClick={() => setWorkType(t)} className={`px-4 py-2 rounded-lg border text-sm transition cursor-pointer ${workType === t ? "bg-indigo-600 border-indigo-400" : "bg-black/60 border-white/20 hover:bg-black/70"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                  <label className="block mb-2 text-sm opacity-80">Work Mode</label>
                  <div className="flex gap-3 flex-wrap">
                    {["Office", "Remote", "Hybrid"].map((m) => (
                      <button key={m} type="button" onClick={() => setWorkMode(m)} className={`px-4 py-2 rounded-lg border text-sm transition cursor-pointer ${ workMode === m ? "bg-indigo-600 border-indigo-400" : "bg-black/60 border-white/20 hover:bg-black/70"}`}>{m}</button>
                    ))}
                  </div>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                  <label className="block mb-2 text-sm opacity-80">Location</label>
                  <input name="location" type="text" defaultValue={item.location} className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" required/>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                  <label className="block mb-3 text-sm opacity-80">Job Description</label>
                  <textarea name="job_description" rows="6" defaultValue={item.job_description} placeholder="Job Description:\n- Roles:\n- Responsibilities:\n- Requirements:" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg resize-none" required/>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                  <label className="block mb-2 text-sm opacity-80">Salary Range</label>
                  <div className="flex gap-3">
                    <input type="number" name="salary_min" defaultValue={item.salary_min || ""} placeholder="Min" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg"/>
                    <input type="number" name="salary_max" defaultValue={item.salary_max || ""} placeholder="Max" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg"/>
                  </div>
                </div>
              </>
            )}
            {type === "internship" && (
                <>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Internship Title</label>
                    <input name="internship_title" type="text" defaultValue={item.internship_title} placeholder="Internship Title" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" required/>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Company</label>
                    <div className="flex gap-3">
                        <input name="company_name" type="text" defaultValue={item.company_name} placeholder="Company Name" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" required/>
                        <input name="duration_months" type="number" defaultValue={item.duration_months || ""} placeholder="Duration (months)" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg"/>
                        <label className="bg-black/50 border border-white/20 p-3 rounded-lg cursor-pointer text-sm flex items-center justify-center whitespace-nowrap">Change Logo
                            <input name="company_logo" type="file" accept="image/*" className="hidden" />
                        </label>
                    </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Openings</label>
                        <input name="openings" type="number" defaultValue={item.openings || ""} placeholder="Enter openings" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg"/>
                    </div>
                    <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Work Type</label>
                        <div className="flex gap-3">
                        {["Full Time", "Part Time"].map((t) => (
                            <button key={t} type="button" onClick={() => setWorkType(t)} className={`px-4 py-2 rounded-lg border text-sm transition cursor-pointer ${workType === t ? "bg-indigo-600 border-indigo-400" : "bg-black/60 border-white/20 hover:bg-black/70"}`}>{t}</button>
                        ))}
                        </div>
                    </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Work Mode</label>
                    <div className="flex gap-3 flex-wrap">
                        {["Office", "Remote", "Hybrid"].map((m) => (
                        <button key={m} type="button" onClick={() => setWorkMode(m)} className={`px-4 py-2 rounded-lg border text-sm transition cursor-pointer ${workMode === m ? "bg-indigo-600 border-indigo-400" : "bg-black/60 border-white/20 hover:bg-black/70"}`}>{m}</button>
                        ))}
                    </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Location</label>
                    <input name="location" type="text" defaultValue={item.location} placeholder="Location" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" required/>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-3 text-sm opacity-80">Internship Description</label>
                    <textarea name="internship_description" rows="6" defaultValue={item.internship_description} placeholder={`Internship Description:\n- Roles:\n- Responsibilities:\n- Requirements:`} className="w-full bg-black/50 border border-white/20 p-3 rounded-lg resize-none" required/>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Stipend Range</label>
                    <div className="flex gap-3">
                        <input name="stipend_min" type="number" defaultValue={item.stipend_min || ""} placeholder="Min" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg"/>
                        <input name="stipend_max" type="number" defaultValue={item.stipend_max || ""} placeholder="Max" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg"/>
                    </div>
                    </div>
                </>
                )}
                <div className="flex gap-3 pt-6">
                <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-4 rounded-lg font-medium transition text-lg">{loading ? "Updating..." : "Save Changes"}</button>
                <button type="button" onClick={() => navigate("/manage")} className="flex-1 bg-gray-600 hover:bg-gray-700 p-4 rounded-lg transition text-lg">Cancel</button>
                </div>
            </form>
            </div>
        </div>
        </>
  );
}

export default Edit;