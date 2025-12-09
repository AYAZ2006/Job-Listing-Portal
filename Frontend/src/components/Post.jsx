import React, { useState } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HashLoader from 'react-spinners/HashLoader';
function Post() {
  const [view, setView] = useState("select"); 
  const [workType, setWorkType] = useState("");
  const [workMode, setWorkMode] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = localStorage.getItem("recruiter_email");
    formData.set("email", email);
    formData.set("work_type", workType);
    formData.set("work_mode", workMode);
    setLoading(true);
    try {
        const response = await axios.post("http://127.0.0.1:8000/jobs/",formData,{headers: { "Content-Type": "multipart/form-data" },});
        toast.success("Job posted successfully!");
        form.reset();
        navigate("/manage");
    } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
    };
    const handleInternshipSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const email = localStorage.getItem("recruiter_email");
        formData.set("email", email);
        formData.set("work_type", workType);
        formData.set("work_mode", workMode);
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/internships/",formData,{headers: { "Content-Type": "multipart/form-data" },});
            toast.success("Internship posted successfully!");
            form.reset();
            navigate("/manage");
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
        setLoading(false);
        }
    };
  return (
    <>
        {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <HashLoader color="#36d7b7" size={80} />
        </div>
      )}
        <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-[#121212] pt-24">
        <div className="bg-white/10 border border-white/15 backdrop-blur-xl rounded-2xl w-full max-w-6xl p-5 animate-[slideUp_0.35s_ease-out]">
            <div className="flex items-center mb-4"><h2 className="text-lg font-semibold text-white">{view==="select" && "Select Posting Type to Continue"}{view==="jobs" && "Post a Job"}{view==="internship" && "Post an Internship"}</h2></div>
                {view==="select" && <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button onClick={()=>setView("jobs")} className="flex-1 bg-black text-white p-4 rounded-xl flex items-center justify-center gap-6 hover:opacity-90 transition text-base sm:text-lg cursor-pointer">
                        <Briefcase size={22} className="sm:size-6" />
                        <p className="font-medium">Jobs</p>
                    </button>
                    <button onClick={()=>setView("internship")} className="flex-1 bg-black text-white p-4 rounded-xl flex items-center justify-center gap-6 hover:opacity-90 transition text-base sm:text-lg cursor-pointer">
                        <GraduationCap size={22} className="sm:size-6" />
                        <p className="font-medium">Internships</p>
                    </button>
                </div>}   
                {view==="jobs" && <form className="flex flex-col gap-5 mt-4 text-white" onSubmit={handleJobSubmit}>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Job Title</label>
                        <input type="text" name="job_title" placeholder="Job Title" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Company</label>
                        <div className="flex gap-3">
                            <input type="text" name="company_name" placeholder="Company Name" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                            <label className="bg-black/50 border border-white/20 p-3 rounded-lg cursor-pointer text-sm flex items-center justify-center whitespace-nowrap">Upload Logo
                                <input name="company_logo" type="file" accept="image/*" className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                            <label className="block mb-2 text-sm opacity-80">Openings</label>
                            <input name="openings" type="number" placeholder="Enter openings" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                        </div>
                        <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Work Type</label>
                        <div className="flex gap-3">{["Full Time","Part Time"].map((type)=>
                            <button key={type} type="button" onClick={()=>setWorkType(type)} className={`px-4 py-2 rounded-lg border text-sm transition cursor-pointer ${workType===type?"bg-indigo-600 border-indigo-400":"bg-black/60 border-white/20 hover:bg-black/70"}`}>{type}</button>)}
                        </div>
                    </div>
                    <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Work Mode</label>
                        <div className="flex gap-3 flex-wrap">{["Office","Remote","Hybrid"].map((mode)=>
                            <button key={mode} type="button" onClick={()=>setWorkMode(mode)} className={`px-4 py-2 rounded-lg border text-sm cursor-pointer transition ${workMode===mode?"bg-indigo-600 border-indigo-400":"bg-black/60 border-white/20 hover:bg-black/70"}`}>{mode}</button>)}
                        </div>
                    </div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Location</label>
                    <input name="location" type="text" placeholder="Location" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-3 text-sm opacity-80">Job Description</label>
                    <textarea name="job_description" rows="6" placeholder={`Job Description:\n- Roles:\n- Responsibilities:\n- Requirements:`} className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Salary Range</label>
                    <div className="flex gap-3">
                        <input type="number" name="salary_min" placeholder="Min" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                        <input type="number" name="salary_max" placeholder="Max" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                    </div>
                </div>
                <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg cursor-pointer">Submit</button>
                    <button type="button" onClick={()=>setView("select")} className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded-lg cursor-pointer">Back</button>
                </div>
                </form>}
                {view==="internship" && <form className="flex flex-col gap-3 mt-4 text-white" onSubmit={handleInternshipSubmit}>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Internship Title</label>
                        <input name="internship_title" type="text" placeholder="Internship Title" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Company</label>
                        <div className="flex gap-3">
                            <input name="company_name" type="text" placeholder="Company Name" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                            <input name="duration_months" type="number" placeholder="Duration (months)" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                            <label className="bg-black/50 border border-white/20 p-3 rounded-lg cursor-pointer text-sm flex items-center justify-center whitespace-nowrap">Upload Logo
                                <input name="company_logo" type="file" accept="image/*" className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                            <label className="block mb-2 text-sm opacity-80">Openings</label>
                            <input name="openings" type="number" placeholder="Enter openings" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                        </div>
                        <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Work Type</label>
                        <div className="flex gap-3">{["Full Time","Part Time"].map((type)=>
                            <button key={type} type="button" onClick={()=>setWorkType(type)} className={`px-4 py-2 rounded-lg border text-sm transition cursor-pointer ${workType===type?"bg-indigo-600 border-indigo-400":"bg-black/60 border-white/20 hover:bg-black/70"}`}>{type}</button>)}
                        </div>
                    </div>
                    <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-4">
                        <label className="block mb-2 text-sm opacity-80">Work Mode</label>
                        <div className="flex gap-3 flex-wrap">{["Office","Remote","Hybrid"].map((mode)=>
                            <button key={mode} type="button" onClick={()=>setWorkMode(mode)} className={`px-4 py-2 rounded-lg border text-sm cursor-pointer transition ${workMode===mode?"bg-indigo-600 border-indigo-400":"bg-black/60 border-white/20 hover:bg-black/70"}`}>{mode}</button>)}
                        </div>
                    </div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Location</label>
                    <input name="location" type="text" placeholder="Location" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-3 text-sm opacity-80">Internship Description</label>
                    <textarea name="internship_description" rows="6" placeholder={`Internship Description:\n- Roles:\n- Responsibilities:\n- Requirements:`} className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                </div>
                <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                    <label className="block mb-2 text-sm opacity-80">Stipend Range</label>
                    <div className="flex gap-3">
                        <input name="stipend_min" type="number" placeholder="Min" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                        <input name="stipend_max" type="number" placeholder="Max" className="w-full bg-black/50 border border-white/20 p-3 rounded-lg" />
                    </div>
                </div>
                <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg cursor-pointer">Submit</button>
                    <button type="button" onClick={()=>setView("select")} className="flex-1 bg-gray-600 hover:bg-gray-700 p-3 rounded-lg cursor-pointer">Back</button>
                </div>
                </form>}
        </div>
        </div>
    </>
  );
}

export default Post;
