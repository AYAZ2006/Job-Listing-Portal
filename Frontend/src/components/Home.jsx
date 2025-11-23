import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Building2, ArrowRight } from 'lucide-react';
import Footer from "./Footer.jsx";
function Home() {
  const appliedJobs = [
    { id: 1, title: "Frontend Developer", company: "Google" },
    { id: 2, title: "Backend Engineer", company: "Microsoft" },
    { id: 3, title: "React Developer", company: "Meta" },
    { id: 4, title: "Junior Engineer", company: "Adobe" },
  ];
  const savedJobs = [
    { id: 5, title: "UI Designer", company: "Dribbble" },
    { id: 6, title: "Software Intern", company: "Netflix" },
  ];
  const [activeTab, setActiveTab] = useState("apps");
  const recentApplications = appliedJobs.slice(-3).reverse();
  const recentSaved = savedJobs.slice(-3).reverse();
  const internships = [
    { title: "MERN Stack Developer Internship", company: "Lakhdatar Properties", location: "Raipur", applied: 12, wfh: true },
    { title: "Business Development Trainee Internship", company: "Datacrew.ai", stipend: "15K/Month", views: 176, active: true },
    { title: "Mobile App Developer Internship", company: "SkygrowthSolutions", location: "Hyderabad", applied: 6, wfh: true },
    { title: "Graphic Designer Internship", company: "FOOZ Global LLP", stipend: "Not Disclosed", applied: 2, active: true },
    { title: "Graphic Designer Internship", company: "FOOZ Global LLP", stipend: "Not Disclosed", applied: 2, active: true },
    { title: "Graphic Designer Internship", company: "FOOZ Global LLP", stipend: "Not Disclosed", applied: 2, active: true },
  ];
  const jobs = [
    { title: "MERN Stack Developer", company: "Lakhdatar Properties", location: "Raipur", applied: 12, wfh: true },
    { title: "Business Development Trainee", company: "Datacrew.ai", stipend: "15K/Month", views: 176, active: true },
    { title: "Mobile App Developer", company: "SkygrowthSolutions", location: "Hyderabad", applied: 6, wfh: true },
    { title: "Graphic Designer", company: "FOOZ Global LLP", stipend: "Not Disclosed", applied: 2, active: true },
    { title: "Graphic Designer", company: "FOOZ Global LLP", stipend: "Not Disclosed", applied: 2, active: true },
    { title: "Graphic Designer", company: "FOOZ Global LLP", stipend: "Not Disclosed", applied: 2, active: true },
  ];
  const internshipsRef = useRef(null);
  const jobsRef = useRef(null);
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#121212] pt-24">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-10 mb-16 md:px-0 px-4">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold text-white mb-3">My Activity</h1>
          <p className="text-lg text-gray-300">Take a quick look at your recent actions and continue from where you paused.</p>
          <div className="bg-[#1C1C1C] border border-gray-700 rounded-full flex items-center gap-8 p-3 px-6 w-fit">
            <div onClick={() => setActiveTab("apps")} className={`flex items-center gap-3 cursor-pointer transition ${activeTab === "apps" ? "opacity-100" : "opacity-60"}`}>
              <img src="/activity.svg" className="w-6 h-6" />
              <h1 className="text-white text-sm font-medium">Applications</h1>
            </div>
            <div onClick={() => setActiveTab("saved")} className={`flex items-center gap-3 cursor-pointer transition ${activeTab === "saved" ? "opacity-100" : "opacity-60"}`}>
              <img src="/heart.svg" className="w-5 h-5" />
              <h1 className="text-white text-sm font-medium">Saved</h1>
            </div>
          </div>
          {activeTab === "apps" && (
            <div className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white mb-4">Your Applications</h2>
                <button className="text-blue-400 text-sm hover:underline cursor-pointer flex items-center gap-1">View All
                  <img src="/arrow-up-right.svg" alt="arrow"/>
                </button>
              </div>
              {recentApplications.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {recentApplications.map((job) => (
                    <div key={job.id} className="p-4 bg-[#181818] rounded-md border border-[#2A2A2A] flex justify-between">
                      <h3 className="text-white text-lg font-medium">{job.title}</h3>
                      <p className="text-gray-400 text-sm">{job.company}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 bg-[#181818] rounded-md border border-[#2A2A2A] text-center">
                  <p className="text-gray-400 text-sm">You haven't applied for any jobs yet.</p>
                </div>
              )}
            </div>
          )}
          {activeTab === "saved" && (
            <div className="bg-[#1C1C1C] border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white mb-4">Your Saved Jobs</h2>
                <button className="text-blue-400 text-sm hover:underline cursor-pointer flex items-center gap-1">View All
                  <img src="/arrow-up-right.svg" alt="arrow"/>
                </button>
              </div>
              {recentSaved.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {recentSaved.map((job) => (
                    <div key={job.id} className="p-4 bg-[#181818] rounded-md border border-[#2A2A2A] flex justify-between">
                      <h3 className="text-white text-lg font-medium">{job.title}</h3>
                      <p className="text-gray-400 text-sm">{job.company}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 bg-[#181818] rounded-md border border-[#2A2A2A] text-center">
                  <p className="text-gray-400 text-sm">No saved jobs yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 md:px-0 px-4">Internship Opportunities</h2>
        <div className="relative">
          <div ref={internshipsRef} className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {internships.map((internship, index) => (
              <div key={index} className="min-w-[300px] bg-[#1C1C1C] border border-gray-700 rounded-lg p-5 flex flex-col gap-3">
                <h3 className="text-white font-semibold text-lg">{internship.title}</h3>
                <p className="text-gray-400 text-sm">{internship.company}</p>
                {internship.location && <p className="text-gray-400 text-sm">Location: {internship.location}</p>}
                {internship.stipend && <p className="text-gray-400 text-sm">Stipend: {internship.stipend}</p>}
                {internship.applied && <p className="text-gray-400 text-sm">{internship.applied} people applied</p>}
                {internship.wfh !== undefined && <p className="text-gray-400 text-sm">{internship.wfh ? "Work from Home Available" : "On-site"}</p>}
                {internship.active !== undefined && <p className={`text-sm font-medium ${internship.active ? "text-green-400" : "text-red-400"}`}>{internship.active ? "Active" : "Closed"}</p>}
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 mt-2">
            <button onClick={() => internshipsRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{"<"}</button>
            <button onClick={() => internshipsRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{">"}</button>
          </div>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 60 }}  whileInView={{ opacity: 1, y: 0 }}  viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut' }}  className="relative w-full max-w-6xl  mx-auto mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border border-white/10 shadow-2xl backdrop-blur-xl"style={{backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80')`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundBlendMode: 'overlay',}}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative flex flex-col md:flex-row h-80 md:h-96">
          <motion.div initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} transition={{ duration: 1.2 }} className="md:w-1/2 h-full relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80" alt="Career Growth" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          </motion.div>
          <div className="relative z-10 md:w-1/2 p-6 md:p-8 flex flex-col justify-center text-white">
            <motion.h2 initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-lg md:text-xl lg:text-2xl font-bold leading-snug bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Opportunities don’t wait —<br />
              <span className="text-purple-300">why should you?</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-3 text-gray-300 text-sm md:text-base">Join thousands who’ve already taken the leap.</motion.p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Briefcase, label: 'Open Positions', value: '7,500+' },
                { icon: Users, label: 'Active Job Seekers', value: '18,000+' },
                { icon: Building2, label: 'Companies Hiring', value: '1,200+' },
              ].map((stat, index) => (
                <motion.div key={stat.label} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + index * 0.15, duration: 0.7 }} className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 backdrop-blur-md rounded-2xl border border-purple-400/30">
                    <stat.icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }} whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }} whileTap={{ scale: 0.98 }} className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full flex items-center cursor-pointer gap-2 w-fit text-sm hover:shadow-purple-500/30 transition-all duration-300">Start Your Job Search
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold text-white md:px-0 px-4 mb-6">Job Opportunities</h2>
        <div className="relative">
          <div ref={jobsRef} className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {jobs.map((job, index) => (
              <div key={index} className="min-w-[300px] bg-[#1C1C1C] border border-gray-700 rounded-lg p-5 flex flex-col gap-3">
                <h3 className="text-white font-semibold text-lg">{job.title}</h3>
                <p className="text-gray-400 text-sm">{job.company}</p>
                {job.location && <p className="text-gray-400 text-sm">Location: {job.location}</p>}
                {job.stipend && <p className="text-gray-400 text-sm">Stipend: {job.stipend}</p>}
                {job.applied && <p className="text-gray-400 text-sm">{job.applied} people applied</p>}
                {job.wfh !== undefined && <p className="text-gray-400 text-sm">{job.wfh ? "Work from Home Available" : "On-site"}</p>}
                {job.active !== undefined && <p className={`text-sm font-medium ${job.active ? "text-green-400" : "text-red-400"}`}>{job.active ? "Active" : "Closed"}</p>}
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 mt-2">
            <button onClick={() => jobsRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{"<"}</button>
            <button onClick={() => jobsRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{">"}</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
