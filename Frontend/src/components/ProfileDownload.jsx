import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FiDownload, FiArrowLeft } from "react-icons/fi";

export default function ProfileDownload() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, skills = [], experiences = [] } = location.state || {};
  if (!profile) return <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center text-2xl font-light">No profile data</div>;
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-gray-200 py-16 px-6">
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-12">
          <button onClick={() => navigate(-1)} className="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-white transition text-lg"><FiArrowLeft size={28} />Back</button>
          <button className="flex items-center gap-3 bg-white cursor-pointer text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-200 transition shadow-2xl"><FiDownload size={22} />Download PDF</button>
        </div>
        <div id="profile-print" className="bg-[#111111] rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="border-b border-gray-800 px-12 py-16 text-center">
            <div className="w-40 h-40 mx-auto mb-8 bg-gray-800 rounded-full border-8 border-gray-900 flex items-center justify-center"><span className="text-7xl font-thin text-gray-400">{profile.name?.charAt(0).toUpperCase() || "U"}</span></div>
            <h1 className="text-6xl font-extralight text-white tracking-wider">{(profile.name + " " + (profile.surname || "")).trim() || "User"}</h1>
            <p className="text-2xl text-gray-500 mt-4 font-light">{profile.email}</p>
          </div>
          <div className="p-12 space-y-16">
            {profile.about && <div><h2 className="text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-6">About</h2><p className="text-gray-300 text-lg leading-relaxed font-light">{profile.about}</p></div>}
            <div>
              <h2 className="text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-8">Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
                <div><span className="text-gray-600">Email</span><p className="text-white font-light mt-1">{profile.email}</p></div>
                <div><span className="text-gray-600">Mobile</span><p className="text-white font-light mt-1">{profile.mobile || "—"}</p></div>
                <div><span className="text-gray-600">Category</span><p className="text-white font-light mt-1">{profile.category || "—"}</p></div>
                <div><span className="text-gray-600">Status</span><p className="text-white font-light mt-1">{profile.career_status || "Active"}</p></div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-8">Education</h2>
              <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-2xl">
                <p className="text-2xl text-white font-light">{profile.qualification || "Not specified"}</p>
                <p className="text-gray-500 mt-3 text-lg">{profile.course_start || "—"} to {profile.course_end || "Present"}</p>
              </div>
            </div>
            {skills.length > 0 && <div><h2 className="text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-8">Skills</h2><div className="flex flex-wrap gap-4">{skills.map((skill, i) => <span key={i} className="bg-gray-900 text-gray-300 px-6 py-3 rounded-full border border-gray-700 font-light text-sm tracking-wide">{typeof skill === "string" ? skill : skill.name}</span>)}</div></div>}
            {experiences.length > 0 && <div><h2 className="text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-8">Experience</h2><div className="space-y-6">{experiences.map((exp, i) => <div key={i} className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-2xl"><h3 className="text-xl text-white font-light">{exp.role} — {exp.company}</h3><p className="text-gray-500 mt-2">{exp.start} – {exp.end || "Present"}</p><p className="text-gray-400 mt-4 leading-relaxed">{exp.description || ""}</p></div>)}</div></div>}
            {(profile.linkedin || profile.portfolio) && <div><h2 className="text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-8">Links</h2><div className="space-y-4 text-lg">{profile.linkedin && <a href={profile.linkedin} target="_blank" className="text-gray-400 hover:text-white transition block">linkedin.com/in/{profile.linkedin.split('/').pop()}</a>}{profile.portfolio && <a href={profile.portfolio} target="_blank" className="text-gray-400 hover:text-white transition block">{profile.portfolio.replace(/^https?:\/\//, '')}</a>}</div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}