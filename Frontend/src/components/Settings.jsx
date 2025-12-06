import React,{useState,useEffect} from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiDownload, FiTrash2 } from "react-icons/fi";
import Upload from "./Upload";
import { Switch } from "@radix-ui/react-switch";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
export default function Settings() {
  const [activeTab, setActiveTab] = useState("Account");
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(null);
  const [skills, setSkills] = useState([]);
  const [showCurrent, setShowCurrent] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);
  const [experiences, setExperiences] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const email = localStorage.getItem("user_email");
  const [profile, setProfile] = useState({name: "",surname: "",email: email,mobile: "",gender: "",course_start: "",course_end: "",category: "",qualification: "",career_status: "",linkedin: "",portfolio: "",about: "",skills: [],experiences: []});
  const emailNotifications = ["Job Recommendations", "Application Status Updates", "Messages from Recruiters", "Newsletter / Promotions"];
  const pushNotifications = ["New Job Matches", "Interview Reminders", "Message Alerts", "Event Reminders"];
  const smsNotifications = ["Application Status Updates", "Interview Reminders"];
  const activityAlerts = ["Profile Viewed", "Resume Bookmarked", "Application Deadlines Approaching"];
  const navigate = useNavigate();
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const allSkills = ["3D Modeling","Account Management","Accounting","Active Listening","Adaptability","Administration","Advertising","Agile Methodologies","Analytical Thinking","Android Development","Angular","Animation","API Development","Application Security","Artificial Intelligence","Attention to Detail","Auditing","AWS","Azure","Backend Development","Banking Knowledge","Benchmarking","Big Data","Blog Writing","Bookkeeping","Brand Management","Business Analysis","Business Communication","Business Development","Business Strategy","C Programming","C#","C++","Cloud Computing","Coaching","Collaboration","Communication Skills","Compliance","Conflict Resolution","Content Creation","Content Marketing","Content Writing","Copywriting","Creative Thinking","Critical Thinking","CSS","Customer Handling","Customer Relationship Management","Customer Service","Cybersecurity","Data Analysis","Data Cleaning","Data Entry","Data Engineering","Data Mining","Data Science","Data Structures","Data Visualization","Database Management","Decision Making","Deep Learning","Design Thinking","DevOps","Django","Digital Marketing","Discipline","Docker","Documentation","E-commerce Management","Editing","Email Marketing","Emotional Intelligence","Employee Management","Empathy","English Proficiency","Event Management","Excel","Express.js","Figma","Financial Analysis","Financial Modeling","Flutter","Forecasting","Front Desk Operations","Frontend Development","Full Stack Development","Git","GitHub","Google Ads","Google Analytics","Graphic Design","HTML","Human Resource Management","Illustration","Influencer Marketing","Information Security","Interpersonal Skills","Inventory Management","iOS Development","Java","JavaScript","Jira","JSON","Journalism","Kotlin","Kubernetes","Laravel","Leadership","Lead Generation","Legal Research","Linear Algebra","Linux","Logical Reasoning","Machine Learning","Management Skills","Manual Testing","Market Research","Marketing Strategy","Mechanical Design","Media Planning","MERN Stack","Mobile App Development","MongoDB","Motion Graphics","Multitasking","MySQL","Negotiation","Networking","Node.js","Numerical Reasoning","Object-Oriented Programming","Office Management","OpenCV","Operating Systems","Operations Management","Optimization","Organization Skills","Payroll Processing","Performance Marketing","Photo Editing","Photoshop","PHP","Portfolio Management","PostgreSQL","Presentation Skills","Problem Solving","Product Design","Product Management","Product Research","Project Coordination","Project Management","Prototyping","Public Relations","Public Speaking","Python","Quality Assurance","Query Optimization","QuickBooks","React Native","React.js","Recruitment","Reporting","Research Skills","REST APIs","Risk Management","Robotics","Ruby","Sales","Salesforce","Scheduling","Scrum","Search Engine Marketing","Search Engine Optimization (SEO)","Security Testing","Social Media Management","Social Media Marketing","Software Development","Software Testing","SQL","Stakeholder Management","Statistical Analysis","Storytelling","Strategic Planning","Strategic Thinking","Stress Management","Supply Chain Management","Swift","System Administration","System Design","Tailwind CSS","Talent Acquisition","Team Leadership","Team Management","Teamwork","Technical Documentation","Technical Support","TensorFlow","Time Management","Training & Development","Translation","Troubleshooting","TypeScript","UI Design","UI/UX","Unit Testing","User Research","UX Research","Video Editing","Virtual Assistance","Vue.js","Web Analytics","Web Development","Wireframing","WordPress","Writing Skills"
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const [searchQuery, setSearchQuery] = useState("");
  const filteredSkills = allSkills.filter(skill =>
    skill.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  useEffect(() => {setProfile(prev => ({...prev,skills: skills.map(s => s.name),experiences: experiences}));
  }, [skills, experiences]);
  const [newSkill, setNewSkill] = useState("");
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { id: Date.now(), name: newSkill.trim() }]);
      setNewSkill("");
    }
  };
  const updateSkill = (index, newName) => {
    const updated = [...skills];
    updated[index].name = newName;
    setSkills(updated);
  };
  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  const getEmptyExperience = () => ({id: Date.now(),role: "",company: "",start: "",end: "",description: ""});
  const updateExperience = (index, field, value) => {
    setExperiences(prev => {const updated = [...prev];updated[index] = { ...updated[index], [field]: value };return updated;});
  };
  const removeExperience = (index) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
  };
  const loadResume = () => {
  if (!email) return;
  fetch(`http://127.0.0.1:8000/view-resume/?email=${email}`).then(res => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then(data => {if (Array.isArray(data) && data.length > 0) {const latestResume = data[0]; setResume(latestResume);setLoad(latestResume);}
      else {
        setResume(null);
        setLoad(null);
    }
    })
    .catch(err => {setResume(null);setLoad(null);})};
  useEffect(() => {loadResume();}, []);
  const handleDownload = async (resumeId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/${resumeId}/download/`);
      if (!response.ok) throw new Error("Failed to fetch download URL");
      const data = await response.json();
      const downloadUrl = `http://127.0.0.1:8000${data.download_url}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = data.download_url.split("/").pop() || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Resume download started");
    } catch (err) {
      toast.error("Failed to download resume");
    }
  };
  const handleChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };
  const handleDelete = async () => {
    const email = localStorage.getItem("user_email");
    if (!email) {
      toast.error("No user logged in");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/delete-account/", {method: "DELETE",headers: { "Content-Type": "application/json" },body: JSON.stringify({ email })});
      if (res.ok) {
        toast.success("Account deleted permanently");
        localStorage.clear();
        window.location.href = "/login";
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
      }
    } catch (err) {
      toast.error("Network error");
    }
  }
  const handleChangePassword = async () => {
    const email = localStorage.getItem("user_email");
    const curr = document.getElementById("currentPass").value;
    const newP = document.getElementById("newPass").value;
    const conf = document.getElementById("confirmPass").value;
    if (newP !== conf) return toast.error("Passwords don't match");
    const res = await fetch("http://127.0.0.1:8000/change-password/", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ email, current_password: curr, new_password: newP, confirm_password: conf })});
    const data = await res.json();
    res.ok ? toast.success("Password changed!") : toast.error(data.error);
  };
  useEffect(() => {
    if (!email) return;
    fetch(`http://127.0.0.1:8000/profile/?email=${email}`).then(res => res.json()).then(data => {
        if (data.email) {setProfile(data);
          if (Array.isArray(data.skills)) {setSkills(data.skills.map((name, i) => ({ id: Date.now() + i, name })));}
          if (Array.isArray(data.experiences)) {setExperiences(data.experiences.map((exp, i) => ({ ...exp, id: exp.id || Date.now() + i })));}
        }
      })
    .catch(err => console.error("Failed to load profile", err));}, [email]);
  const handleSave = () => {
    const payload = {...profile,skills: skills.map(s => s.name),experiences: experiences };
    fetch("http://127.0.0.1:8000/profile/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    .then(async res => {
      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) {
        toast.error("Backend error");
        return;
      }

      toast.success("Profile updated");
      setIsEditing(false);
    })
    .catch(err => {
      toast.error("Failed to update");
      console.log(err);
    });
};

  const tabs = ["Account","Notifications","Sharing","Skills","Career Highlights","Security & Privacy"];
  return (
    <div className="h-screen w-full bg-[#0e0e0e] text-gray-200 flex">
      <aside className="w-72 h-3/4 sticky top-0 p-6 overflow-y-auto hide-scrollbar bg-[#1a1a1a] border-r border-white/10 mt-30 rounded-lg ml-5 hidden md:block">
        <h2 className="text-lg font-semibold text-white mb-4">Resume Strength</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#333" strokeWidth="8" fill="none" />
              <circle cx="50" cy="50" r="45" stroke="#4ade80" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="80" strokeLinecap="round"/></svg>
            <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold">70%</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Your resume is almost complete</p>
        </div>
        <div className="space-y-4">
          <div className="bg-[#141414] p-3 rounded-lg border border-white/10">
            <h3 className="text-white text-sm font-semibold">Missing Sections</h3>
            <ul className="text-gray-400 text-xs mt-2 space-y-1">
              <li>• Add more skills</li>
              <li>• Upload updated resume</li>
              <li>• Add 1 more experience</li>
            </ul>
          </div>
          <div className="bg-[#141414] p-3 rounded-lg border border-white/10">
            <h3 className="text-white text-sm font-semibold">Skills Detected</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {["React", "Node.js", "Tailwind", "SQL"].map((skill) => (
                <span key={skill} className="bg-[#1f1f1f] border border-white/10 text-gray-300 text-xs px-2 py-1 rounded-md">{skill}</span>
              ))}
            </div>
          </div>
          <button className="w-full mt-3 bg-[#4ade80] text-black font-semibold py-2 rounded-lg hover:bg-[#3ec46f] cursor-pointer">Improve Resume</button>
        </div>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto hide-scrollbar mt-10">
        {showUpload && (
          <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-transparent p-6 rounded-xl w-full max-w-lg"><Upload /></div>
          </div>
        )}
        <div className="sticky top-0 z-20 bg-[#0e0e0e] pt-6 pb-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Settings</h1>
          <h1 className="text-xs sm:text-sm mb-6 text-gray-300">Manage your account settings and preferences</h1>
          <div className="flex justify-center gap-2 sm:gap-3 mb-4 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button key={tab} className={`px-3 sm:px-4 py-2 rounded-full cursor-pointer text-xs sm:text-sm whitespace-nowrap ${ activeTab === tab ? "bg-white text-black": "bg-[#1a1a1a] text-gray-400 border border-white/10"}`}onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
            <button onClick={isEditing ? handleSave : toggleEdit} className="px-4 cursor-pointer py-2 rounded-full bg-blue-500 text-white">{isEditing ? "Save" : "Edit"}</button>
          </div>
        </div>
        {activeTab==="Account" && (
          <>
              <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 className="text-lg font-semibold mb-4">Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm text-gray-400">Name</label>
                  <input disabled={!isEditing} type="text" value={profile.name} onChange={(e) => handleChange("name", e.target.value)} className={`w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="Your name"/></div>
                <div>
                  <label className="text-sm text-gray-400">Surname</label>
                  <input disabled={!isEditing} type="text" value={profile.surname} onChange={(e) => handleChange("surname", e.target.value)} className={`w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="Your surname"/></div>
                <div className="flex items-center justify-center"><FaUserCircle className="text-gray-500" size={70} /></div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-400">Email</label>
                  <input disabled type="email" value={profile.email} className={`w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="you@example.com"/>
                </div>
              </div>
            </div>
            <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 className="text-lg font-semibold mb-4">Resume</h2>
              <div className="flex items-center justify-between"> 
                <p className="text-sm text-gray-300">{resume ? resume.file.split("/").pop() : "No resume uploaded"}</p>
                <div className="flex items-center gap-3">
                  {load ? (
                    <button onClick={() => handleDownload(resume.resume_id)} className="p-2 bg-black rounded-lg cursor-pointer hover:bg-black/20 transition flex items-center" title="Download Resume"><FiDownload size={18} /></button>
                  ) : (
                    <button disabled className="p-2 bg-black/40 rounded-lg text-gray-500 cursor-not-allowed flex items-center"><FiDownload size={18} /></button>
                  )}
                  <button disabled={!isEditing} onClick={() => setShowUpload(true)} className={`px-5 py-2 bg-black hover:bg-black/20 disabled:bg-black/30 disabled:text-gray-500 text-white text-sm rounded-lg transition ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}>{resume ? "Update" : "Upload"}</button>
                </div>
              </div>
            </div>
            <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="mb-6 max-w-3xs">
                <label className="text-sm text-gray-400 mb-2 block">Mobile Number</label>
                <div className="flex">
                  <select disabled={!isEditing} className={`bg-[#1d1d1d] border border-white/10 text-white rounded-l-md p-2 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <option>+91</option>
                  </select>
                  <input disabled={!isEditing} value={profile.mobile} onChange={(e) => handleChange("mobile", e.target.value)} type="tel" className={`w-full bg-[#1d1d1d] border border-white/10 text-white rounded-r-md p-2 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="Your mobile number"/>
                </div>
              </div>
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Gender</label>
                <div className="flex gap-4">
                  {["Male", "Female", "More Options"].map((g) => (
                    <button key={g} disabled={!isEditing} onClick={() => handleChange("gender", g)} className={`px-4 py-2 cursor-pointer border border-white/10 rounded-lg bg-[#1d1d1d]  ${profile.gender === g ? "bg-[#2a2a2a] border-white/20" : ""} ${!isEditing ? "opacity-50 cursor-not-allowed" : "hover:bg-[#2a2a2a]"}`}>{g}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Course Duration</label>
                <div className="flex gap-4">
                  <input disabled={!isEditing} value={profile.course_start} onChange={(e) => handleChange("course_start", e.target.value === "" ? null : Number(e.target.value))} type="number" className={`w-full md:w-1/2 bg-[#1d1d1d] border border-white/10 text-white rounded-md p-2 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="Start Year"/>
                  <input disabled={!isEditing} value={profile.course_end} onChange={(e) => handleChange("course_end", e.target.value === "" ? null : Number(e.target.value))} type="number" className={`w-full md:w-1/2 bg-[#1d1d1d] border border-white/10 text-white rounded-md p-2 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="End Year"/>
                </div>
              </div>
            </div>
            <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 className="text-lg font-semibold mb-4">Job Seeker Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm text-gray-400">Category</label>
                  <select disabled={!isEditing} value={profile.category} onChange={(e) => handleChange("category", e.target.value)} className={`w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <option>Student</option>
                    <option>Fresher</option>
                    <option>Experienced</option>
                    <option>Internship Seeker</option>
                    <option>Part-Time Seeker</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Highest Qualification</label>
                  <input disabled={!isEditing} value={profile.qualification} onChange={(e) => handleChange("qualification", e.target.value)} type="text" placeholder="B.Tech, B.Sc, Diploma..." className={`w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}/>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Career Status</label>
                  <select disabled={!isEditing} value={profile.career_status} onChange={(e) => handleChange("career_status", e.target.value)} className={`w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white  ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}>
                    <option>Looking for Opportunities</option>
                    <option>Open to Internships</option>
                    <option>Actively Applying</option>
                    <option>Not Looking</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 className="text-lg font-semibold mb-4">Portfolio & Online Presence</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-400">LinkedIn</label>
                  <input disabled={!isEditing} value={profile.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} type="url" className={`w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="Your LinkedIn URL"/>
                </div>
                <div>
                  <label className="text-sm text-gray-400">GitHub / Portfolio</label>
                  <input disabled={!isEditing} value={profile.portfolio} onChange={(e) => handleChange("portfolio", e.target.value)} type="url" className={`w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="GitHub or portfolio link"/>
                </div>
              </div>
            </div>
            <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 className="text-lg font-semibold mb-4">About Me</h2>
              <textarea disabled={!isEditing} value={profile.about} onChange={(e) => handleChange("about", e.target.value)} className={`w-full bg-[#1d1d1d] rounded-md p-2 mt-1 border border-white/10 text-white ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`} rows="5" placeholder="A short description about yourself, your career goals, and work style"></textarea>
            </div>
          </>
        )}
        {activeTab==="Notifications" && (
          <>
            <div className="bg-[#151515] rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold mb-6">Email Notifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emailNotifications.map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200">
                    <label className="text-gray-300 text-sm font-medium cursor-pointer">{item}</label>
                    <input type="checkbox" disabled={!isEditing} className={`w-5 h-5 text-black/10 bg-gray-800 border border-white/20 rounded focus:ring-2 focus:ring-black/10 cursor-pointer transition ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}/>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8 mt-10">
              <h2 class="text-lg font-semibold mb-6">SMS Notifications</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {smsNotifications.map((item) => (
                  <div key={item} class="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200">
                    <label class="text-gray-300 text-sm font-medium cursor-pointer">{item}</label>
                    <input type="checkbox" disabled={!isEditing} className={`w-5 h-5 text-black/10 bg-gray-800 border border-white/20 rounded focus:ring-2 focus:ring-black/10 cursor-pointer transition ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}/>
                  </div>
                ))}
              </div>
            </div>
            <div class="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 class="text-lg font-semibold mb-4">Notification Frequency</h2>
              <select disabled={!isEditing} class={`w-full bg-[#1d1d1d] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 transition ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}>
                <option>Instant</option>
                <option>Daily Digest</option>
                <option>Weekly Summary</option>
              </select>
            </div>
            <div class="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 class="text-lg font-semibold mb-5">Do Not Disturb / Quiet Hours</h2>
              <div class="flex items-center gap-4">
                <input type="time" disabled={!isEditing} class={`bg-[#1d1d1d] border border-white/10 text-white rounded-lg px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}/>
                <span class="text-gray-400 text-sm">to</span>
                <input type="time" disabled={!isEditing} class={`bg-[#1d1d1d] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}/>
              </div>
            </div>
            <div class="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 class="text-lg font-semibold mb-6">Activity Alerts</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activityAlerts.map((item) => (
                  <div key={item} class="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200">
                    <label class="text-gray-300 text-sm font-medium cursor-pointer">{item}</label>
                    <input type="checkbox" disabled={!isEditing} class={`w-5 h-5 text-black/10 bg-gray-800 border border-white/20 rounded focus:ring-2 focus:ring-black/10 cursor-pointer transition ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}/>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {activeTab==="Sharing" && (
          <>
            <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 className="text-lg font-semibold mb-6">Sharing & Visibility</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200">
                  <label className="text-gray-300 text-sm font-medium cursor-pointer select-none">Make my profile visible to employers/recruiters</label>
                  <input type="checkbox" disabled={!isEditing} className="w-5 h-5 text-black/10 bg-gray-800 border border-white/20 rounded focus:ring-2 focus:ring-black/10 cursor-pointer transition"/>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200">
                  <label className="text-gray-300 text-sm font-medium cursor-pointer select-none">Allow recruiters to download my resume/CV</label>
                  <input type="checkbox" disabled={!isEditing} className="w-5 h-5 text-black/10 bg-gray-800 border border-white/20 rounded focus:ring-2 focus:ring-black/10 cursor-pointer transition"/>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200">
                  <label className="text-gray-300 text-sm font-medium cursor-pointer select-none">Show my phone number to employers</label>
                  <input type="checkbox" disabled={!isEditing} className="w-5 h-5 text-black/10 bg-gray-800 border border-white/20 rounded focus:ring-2 focus:ring-black/10 cursor-pointer transition"/>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200">
                  <label className="text-gray-300 text-sm font-medium cursor-pointer select-none">Allow employers to send InMail / direct messages</label>
                  <input type="checkbox" disabled={!isEditing} className="w-5 h-5 text-black/10 bg-gray-800 border border-white/20 rounded focus:ring-2 focus:ring-black/10 cursor-pointer transition"/>
                </div>
              </div>
            </div>
            <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
              <h2 className="text-lg font-semibold mb-6">Advanced Sharing & Application Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200">
                  <div>
                    <label className="text-gray-200 font-medium text-sm cursor-pointer select-none">Enable “Apply with Profile”</label>
                    <p className="text-gray-500 text-xs mt-1">Apply to jobs instantly without uploading your CV every time</p>
                  </div>
                  <input type="checkbox" disabled={!isEditing} className="w-5 h-5 text-black/10 bg-gray-800 border border-white/20 rounded focus:ring-2 focus:ring-black/10 cursor-pointer transition"/>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200">
                  <div>
                    <label className="text-gray-200 font-medium text-sm cursor-pointer select-none">Allow recruiters to export my profile to their ATS</label>
                    <p className="text-gray-500 text-xs mt-1">Lets companies add you directly to Workable, Greenhouse, Lever, etc.</p>
                  </div>
                  <input type="checkbox" disabled={!isEditing} className="w-5 h-5 text-black/10 bg-gray-800 border border-white/20 rounded focus:ring-2 focus:ring-black/10 cursor-pointer transition"/>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-colors duration-200 col-span-1 md:col-span-2">
                  <div className="flex-1">
                    <label className="text-gray-200 font-medium text-sm">Public profile link</label>
                    <p className="text-gray-400 text-sm mt-2 font-mono break-all">https://yoursite.com/u/your-username</p>
                    <p className="text-gray-500 text-xs mt-1">Share this link on your CV, LinkedIn, email signature, WhatsApp</p>
                  </div>
                  <button disabled={!isEditing} className="px-5 cursor-pointer py-2 bg-black hover:bg-black/10 disabled:bg-black/20 disabled:text-gray-400 text-white text-sm rounded-lg transition font-medium">Copy Link</button>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab === "Skills" && (
        <>
          <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Skills</h2>
              {isEditing && (
                <button onClick={() => document.getElementById("new-skill-input")?.focus()} className="text-white text-sm font-medium transition">+ Add Skill</button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={skill.id || index} className="group flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10 hover:bg-[#2a2a2a] transition-all duration-200">
                  {isEditing ? (
                    <input type="text" value={skill.name} onChange={(e) => updateSkill(index, e.target.value)} onKeyDown={(e) => e.key === "Enter" && e.target.blur()} className="bg-transparent text-gray-200 font-medium outline-none flex-1 mr-3 focus:ring-2 focus:ring-black/10 rounded px-2 py-1" placeholder="Skill name"/>
                  ) : (
                    <span className="text-gray-200 font-medium">{skill.name}</span>
                  )}
                  {isEditing && (
                    <button onClick={() => removeSkill(index)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {skills.length === 0 && (
                <div className="col-span-1 md:col-span-2 text-center py-12">
                  <p className="text-gray-500 text-sm">No skills added yet.<br /><span className="text-gray-400">Start typing to add your first skill</span>
                  </p>
                </div>
              )}
            </div>
            {isEditing && (
              <div className="mt-6">
                <label className="text-sm text-gray-400 mb-2 block">Add a skill</label>
                <div className="relative">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setSearchQuery("")} placeholder="Type to search skills" className="w-full bg-[#1d1d1d] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/10 transition" autoComplete="off"/>
                  {searchQuery.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-[#1d1d1d] border border-white/10 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
                      {allSkills .filter(skill =>  skill.toLowerCase().startsWith(searchQuery.toLowerCase()) && !skills.some(s => s.name.toLowerCase() === skill.toLowerCase())).slice(0, 10)
                        .map((skill) => (
                          <button key={skill} onClick={() => {setSkills(prev => [...prev, { id: Date.now(), name: skill }].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())));setSearchQuery("");}} className="w-full text-left px-5 py-3.5 hover:bg-[#2a2a2a] text-gray-200 transition-colors flex items-center justify-between border-b border-white/5 last:border-0">
                            <span className="font-medium">{skill}</span>
                            <span className="text-white text-xs font-medium">Add</span>
                          </button>
                        ))}
                      {allSkills.filter(skill => skill.toLowerCase().startsWith(searchQuery.toLowerCase())
                      ).length === 0 && (
                        <div className="px-5 py-8 text-center text-gray-500 text-sm">No skills found for "<span className="text-white">{searchQuery}</span>"</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Personalization</h2>
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-medium">Show Skills to Recruiters</h3>
                <Switch className=" h-6 w-11 r ounded-full bg-zinc-700 data-[state=checked]:bg-black/10 transition-all border border-white/20 shadow-sm rounded-lg"/>
              </div>
            </div>
          </div>
        </>
      )}
      {activeTab === "Career Highlights" && (
        <>
          <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Experience</h2>
              {isEditing && (
                <button onClick={() => setExperiences([...experiences, getEmptyExperience()])} className="text-white text-sm font-medium transition">+ Add Experience</button>
              )}
            </div>
            {experiences.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No experience added yet</p>
            ) : (
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10"></div>
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative flex gap-6 mb-10 last:mb-0">
                    <div className="absolute left-8 w-4 h-4 bg-gray-400 rounded-full -translate-x-1/2 ring-4 ring-black z-10"></div>
                    <div className="flex-1 ml-16">
                      {isEditing ? (
                        <div className="space-y-3">
                          <input value={exp.role} onChange={(e) => updateExperience(index, "role", e.target.value)} placeholder="Job Title" className="w-full bg-[#1d1d1d] border border-white/10 rounded-lg px-4 py-2 text-white" />
                          <input value={exp.company} onChange={(e) => updateExperience(index, "company", e.target.value)} placeholder="Company" className="w-full bg-[#1d1d1d] border border-white/10 rounded-lg px-4 py-2 text-white" />
                          <div className="flex gap-3">
                            <input type="month" value={exp.start} onChange={(e) => updateExperience(index, "start", e.target.value)} className="bg-[#1d1d1d] border border-white/10 rounded-lg px-4 py-2 text-white" />
                            <input type="month" value={exp.end} onChange={(e) => updateExperience(index, "end", e.target.value)} className="bg-[#1d1d1d] border border-white/10 rounded-lg px-4 py-2 text-white" />
                          </div>
                          <textarea value={exp.description} onChange={(e) => updateExperience(index, "description", e.target.value)} placeholder="Description" rows="3" className="w-full bg-[#1d1d1d] border border-white/10 rounded-lg px-4 py-2 text-white" />
                          <button onClick={() => removeExperience(index)} className="text-red-500 text-sm">Remove</button>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-white">{exp.role || "Job Title"}</h3>
                          <p className="text-white">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.start} – {exp.end || "Present"}</p>
                          {exp.description && <p className="text-gray-300 mt-2 text-sm">{exp.description}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      {activeTab === "Security & Privacy" && (
        <>
          <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
            <h2 className="text-lg font-semibold mb-6">Change Password</h2>
            <div className="space-y-4 max-w-md">
            <div className="relative">
              <input type={showCurrent ? "password" : "text"} id="currentPass" placeholder="Current password" className="w-full bg-[#1d1d1d] border border-white/10 rounded-lg px-4 py-3 text-white pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50"/>
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">{showCurrent ? <FiEyeOff size={20} /> : <FiEye size={20} />}</button>
            </div>
            <div className="relative">
              <input type={showNew ? "password" : "text"} id="newPass" placeholder="New password" className="w-full bg-[#1d1d1d] border border-white/10 rounded-lg px-4 py-3 text-white pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50"/>
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">{showNew ? <FiEyeOff size={20} /> : <FiEye size={20} />}</button>
            </div>
            <div className="relative">
              <input type={showConfirm ? "password" : "text"} id="confirmPass" placeholder="Confirm new password" className="w-full bg-[#1d1d1d] border border-white/10 rounded-lg px-4 py-3 text-white pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50"/>
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">{showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}</button>
            </div>
            <button onClick={handleChangePassword} className="w-full px-6 cursor-pointer py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">Update Password</button>
          </div>
          </div>
          <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Two-Factor Authentication (2FA)</h2>
                <p className="text-gray-400 text-sm mt-1">Add an extra layer of security using SMS or authenticator app</p>
              </div>
            </div>
          </div>
          <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
            <h2 className="text-lg font-semibold mb-4">Active Sessions</h2>
            <p className="text-sm text-gray-400 mb-5">Manage devices that are currently logged into your account</p>
            <div className="space-y-4">
              {[
                { device: "Chrome • Windows 11", location: "Mumbai, India", time: "Active now", current: true },
                { device: "Safari • iPhone 14", location: "Mumbai, India", time: "2 hours ago", current: false },
                { device: "Firefox • MacBook Pro", location: "Bengaluru, India", time: "3 days ago", current: false },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#1d1d1d] rounded-lg border border-white/10">
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-gray-400">{session.location} • {session.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {session.current && <span className="text-green-400 text-xs font-medium">Current</span>}
                    {!session.current && (
                      <button className="text-red-500 cursor-pointer text-sm hover:underline">Log out</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 cursor-pointer text-red-500 hover:underline text-sm">Log out from all other devices</button>
          </div>
          <div className="bg-[#151515] rounded-xl p-6 border border-white/10 mb-8">
            <h2 className="text-lg font-semibold mb-5">Data & Privacy</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Download your data</p>
                  <p className="text-sm text-gray-400">Get a copy of all your profile & application data</p>
                </div>
                <button className="px-5 py-2 cursor-pointer bg-black hover:bg-black/80 rounded-lg text-sm" onClick={() => { navigate("/profile-download", {state: {profile: profile,skills: skills,experiences: experiences}});}}>Request Download</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-400">Delete account</p>
                  <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                </div>
                <button className="px-5 py-2 bg-red-600/20 text-red-400 cursor-pointer rounded-lg text-sm hover:bg-red-600/30" onClick={() => setShowModal(true)}>Delete Account</button>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-[#151515] rounded-2xl border border-red-600/30 p-8 max-w-md mx-4 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-red-600/20 rounded-full rounded-full flex items-center justify-center"><FiTrash2 size={28} className="text-red-400" /></div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Delete Account?</h2>
                    <p className="text-gray-400 mt-1">This action cannot be undone</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed">All your profile data, applications, and account will be permanently deleted.You will not be able to recover it.</p>
                <div className="flex gap-4 justify-end">
                  <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition">Cancel</button>
                  <button onClick={() => {handleDelete();setShowModal(false);}}className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">Yes, Delete My Account</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      </main>
      <style jsx>{`.hide-scrollbar::-webkit-scrollbar {display: none;}.hide-scrollbar {-ms-overflow-style: none;scrollbar-width: none; /* Firefox */}`}</style>
    </div>
  );
}
