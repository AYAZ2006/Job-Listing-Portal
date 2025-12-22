import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function Evaluate() {
  const [allApplicants, setAllApplicants] = useState([]);
  const [candidateResumes, setCandidateResumes] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const recruiterUsername = localStorage.getItem("recruiter_email");
  const statusOptions = [
    { value: "applied", label: "Applied", color: "bg-gray-600" },
    { value: "shortlisted", label: "Shortlisted", color: "bg-blue-600" },
    { value: "interview", label: "Interview", color: "bg-purple-600" },
    { value: "offer", label: "Offer", color: "bg-green-600" },
    { value: "rejected", label: "Rejected", color: "bg-red-600" },
  ];
  useEffect(() => {
    if (!recruiterUsername) {toast.error("Please log in as recruiter");setLoading(false);return;}
    const fetchAllApplicants = async () => {
      try {
        setLoading(true);
        const jobsResponse = await axios.get("https://jobchahiye.vercel.app/jobs/", { params: { username: recruiterUsername } });
        const internshipsResponse = await axios.get("https://jobchahiye.vercel.app/internships/", { params: { username: recruiterUsername } });
        const jobs = jobsResponse.data || [];
        const internships = internshipsResponse.data || [];
        if (jobs.length === 0 && internships.length === 0) {setAllApplicants([]);toast.info("No postings yet");setLoading(false);return;}
        const allApplicantsList = [];
        for (const job of jobs) {
          if (!job.id) continue;
          try {
            const res = await axios.post("https://jobchahiye.vercel.app/job-applicants/", { job_id: job.id, email: recruiterUsername });
            if (res.data.applicants) {res.data.applicants.forEach(app => {allApplicantsList.push({id: `${app.candidate_email}-${job.id}-job`,...app,applied_job_title: res.data.job_title || job.job_title,applied_company_name: res.data.company_name || job.company_name,status: app.status || "applied",posting_type: "job"});});
            }
          } catch (err) {}
        }
        for (const intern of internships) {
          if (!intern.id) continue;
          try {
            const res = await axios.post("https://jobchahiye.vercel.app/internship-applicants/", { internship_id: intern.id, email: recruiterUsername });
            if (res.data.applicants) {res.data.applicants.forEach(app => {allApplicantsList.push({id: `${app.candidate_email}-${intern.id}-internship`,...app,applied_job_title: res.data.internship_title || intern.internship_title,applied_company_name: res.data.company_name || intern.company_name,status: app.status || "applied",posting_type: "internship"});});
            }
          } catch (err) {}
        }
        allApplicantsList.sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at));
        setAllApplicants(allApplicantsList);
        const resumeMap = {};
        for (const app of allApplicantsList) {
          if (resumeMap[app.candidate_email]) continue;
          try {
            const res = await fetch(`https://jobchahiye.vercel.app/view-resume/?email=${app.candidate_email}`);
            if (res.ok) {
              const data = await res.json();
              if (data?.length > 0) resumeMap[app.candidate_email] = data[0];
            }
          } catch (err) {}
        }
        setCandidateResumes(resumeMap);

      } catch (err) {
        toast.error("Failed to load applicants");
      } finally {
        setLoading(false);
      }
    };
    fetchAllApplicants();
  }, [recruiterUsername]);

  const toggleExpand = (id) => setExpandedId(prevId => (prevId === id ? null : id));
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.post("https://jobchahiye.vercel.app/update-status/", { application_id: id, status: newStatus, recruiter_email: recruiterUsername });
      setAllApplicants(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
      toast.success("Status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return (<div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]"><div className="animate-spin h-16 w-16 border-t-4 border-blue-500 rounded-full"></div></div>);
  if (allApplicants.length === 0) return (<div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-gray-400 text-2xl">No applications yet</div>);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.02),transparent_12%),linear-gradient(180deg,#0f0f0f,#060606)] px-6 py-12 pt-24">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6">
          {allApplicants.map(app => {
            const isExpanded = expandedId === app.id;
            const resume = candidateResumes[app.candidate_email];
            const currentStatus = statusOptions.find(s => s.value === app.status) || statusOptions[0];
            return (
              <div key={app.id} className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20">
                <div onClick={() => toggleExpand(app.id)} className="p-6 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between gap-6">
                  <div className="flex items-center gap-5 flex-1">
                    <div className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center text-2xl font-bold text-white shadow-lg">{app.full_name?.[0] || "C"}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{app.full_name || "Name not provided"}</h3>
                      <div className="text-sm text-gray-400 space-y-1 mt-1">
                        <p><span className="text-gray-500">Applied For:</span> <strong className="text-gray-300">{app.applied_job_title}</strong></p>
                        <p><span className="text-gray-500">Company:</span> {app.applied_company_name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full text-white font-bold text-sm ${currentStatus.color}`}>{currentStatus.label}</div>
                    <div className="text-right text-sm text-gray-400">
                      <p>Applied On</p>
                      <p className="font-medium text-white">{app.applied_at_formatted || new Date(app.applied_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-3xl text-gray-500 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>↓</div>
                  </div>
                </div>
                {isExpanded && (
                  <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(26,26,26,0.95),rgba(18,18,18,0.95))] p-8">
                    <div className="mb-8 flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">Update Status</h3>
                      <select value={app.status} onChange={(e) => updateStatus(app.id, e.target.value)} className="px-6 py-3 bg-black/50 border border-white/20 rounded-xl text-white font-medium cursor-pointer hover:bg-black/70 transition">{statusOptions.map(opt => (<option key={opt.value} value={opt.value} className="bg-black">{opt.label}</option>))}</select>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Candidate Profile</h2>
                        <div className="space-y-4 text-sm">
                          <Info label="Email" value={app.candidate_email} />
                          <Info label="Mobile" value={app.mobile || "Not provided"} />
                          <Info label="Qualification" value={app.qualification || "N/A"} />
                          <Info label="Gender" value={app.gender || "Not specified"} />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-4">Application</h2>
                        <div className="space-y-4 text-sm">
                          <Info label="Applied For" value={app.applied_job_title} />
                          <Info label="Company" value={app.applied_company_name} />
                          <Info label="Applied On" value={app.applied_at_formatted || new Date(app.applied_at).toLocaleDateString()} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-white mb-3">About Candidate</h3>
                      <p className="text-gray-300 leading-relaxed bg-white/5 rounded-xl p-5 border border-white/10">{app.about || "No about section provided."}</p>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-3">
                        {app.skills?.length > 0 ? app.skills.map((skill, i) => (<span key={i} className="px-4 py-2 bg-black text-white/60 rounded-full text-sm font-medium border border-blue-300">{skill}</span>)) : <span className="text-gray-500">No skills listed</span>}
                      </div>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4 justify-center pt-6 border-t border-white/10">
                      {app.linkedin && <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-black text-white border border-white/10 shadow cursor-pointer hover:shadow-lg transition-shadow rounded-xl font-bold">LinkedIn</a>}
                      {app.portfolio && <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-black text-white border border-white/10 shadow cursor-pointer hover:shadow-lg transition-shadow rounded-xl font-bold">Portfolio</a>}
                      {resume?.file ? <a href={`https://jobchahiye.vercel.app/${resume.file}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-black text-white border border-white/10 shadow cursor-pointer hover:shadow-lg transition-shadow rounded-xl font-bold">Download Resume</a> : <span className="px-8 py-3 text-gray-500">No resume uploaded</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const Info = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-white/5 last:border-0">
    <span className="text-gray-400">{label}:</span>
    <span className="text-white font-medium">{value}</span>
  </div>
);

export default Evaluate;
