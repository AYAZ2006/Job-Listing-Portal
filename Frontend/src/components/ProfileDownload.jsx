import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FiDownload, FiArrowLeft } from "react-icons/fi";

export default function ProfileDownload() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, skills = [], experiences = [] } = location.state || {};
  if (!profile) return <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center text-2xl font-light">No profile data</div>;

  const downloadPDF = () => {
    const element = document.getElementById("profile-print");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${profile.name || "Profile"}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-gray-200 py-8 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-6 sm:mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-6">
          <button onClick={() => navigate(-1)} className="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-white transition text-lg"><FiArrowLeft size={28} />Back</button>
          <button onClick={downloadPDF} className="flex items-center gap-3 bg-white cursor-pointer text-black px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-bold hover:bg-gray-200 transition shadow-2xl text-base sm:text-lg"><FiDownload size={22} />Download PDF</button>
        </div>
        <div id="profile-print" className="bg-[#111111] rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
          <div className="border-b border-gray-800 px-6 py-10 sm:px-12 sm:py-16 text-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 sm:mb-8 bg-gray-800 rounded-full border-6 sm:border-8 border-gray-900 flex items-center justify-center"><span className="text-6xl sm:text-7xl font-thin text-gray-400">{profile.name?.charAt(0).toUpperCase() || "U"}</span></div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-white tracking-wider">{(profile.name + " " + (profile.surname || "")).trim() || "User"}</h1>
            <p className="text-lg sm:text-2xl text-gray-500 mt-3 sm:mt-4 font-light">{profile.email}</p>
          </div>
          <div className="p-6 sm:p-12 space-y-12 sm:space-y-16">
            {profile.about && <div><h2 className="text-2xl sm:text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-6">About</h2><p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">{profile.about}</p></div>}
            <div>
              <h2 className="text-2xl sm:text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-6 sm:mb-8">Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-base sm:text-lg">
                <div><span className="text-gray-600">Email</span><p className="text-white font-light mt-1">{profile.email}</p></div>
                <div><span className="text-gray-600">Mobile</span><p className="text-white font-light mt-1">{profile.mobile || "—"}</p></div>
                <div><span className="text-gray-600">Category</span><p className="text-white font-light mt-1">{profile.category || "—"}</p></div>
                <div><span className="text-gray-600">Status</span><p className="text-white font-light mt-1">{profile.career_status || "Active"}</p></div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-6 sm:mb-8">Education</h2>
              <div className="bg-[#0a0a0a] border border-gray-800 p-6 sm:p-8 rounded-2xl">
                <p className="text-xl sm:text-2xl text-white font-light">{profile.qualification || "Not specified"}</p>
                <p className="text-gray-500 mt-2 sm:mt-3 text-base sm:text-lg">{profile.course_start || "—"} to {profile.course_end || "Present"}</p>
              </div>
            </div>
            {skills.length > 0 && <div><h2 className="text-2xl sm:text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-6 sm:mb-8">Skills</h2><div className="flex flex-wrap gap-3 sm:gap-4">{skills.map((skill, i) => <span key={i} className="bg-gray-900 text-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-700 font-light text-xs sm:text-sm tracking-wide">{typeof skill === "string" ? skill : skill.name}</span>)}</div></div>}
            {experiences.length > 0 && <div><h2 className="text-2xl sm:text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-6 sm:mb-8">Experience</h2><div className="space-y-6">{experiences.map((exp, i) => <div key={i} className="bg-[#0a0a0a] border border-gray-800 p-6 sm:p-8 rounded-2xl"><h3 className="text-lg sm:text-xl text-white font-light">{exp.role} — {exp.company}</h3><p className="text-gray-500 mt-2 text-sm sm:text-base">{exp.start} – {exp.end || "Present"}</p><p className="text-gray-400 mt-3 sm:mt-4 leading-relaxed text-sm sm:text-base">{exp.description || ""}</p></div>)}</div></div>}
            {(profile.linkedin || profile.portfolio) && <div><h2 className="text-2xl sm:text-3xl font-thin text-gray-400 border-b border-gray-700 pb-3 mb-6 sm:mb-8">Links</h2><div className="space-y-4 text-base sm:text-lg">{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition block">linkedin.com/in/{profile.linkedin.split('/').pop()}</a>}{profile.portfolio && <a href={profile.portfolio} target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition block">{profile.portfolio.replace(/^https?:\/\//, '')}</a>}</div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
