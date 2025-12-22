import React, { useRef,useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Building2, CheckCircle, ClipboardList, MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import AnalyticsPage from "./AnalyticsPage";
import axios from "axios";
import { toast } from "react-toastify";
function Admin() {
  const jobsRef = useRef(null);
  const internshipsRef = useRef(null);
  const Navigate = useNavigate();
  const [postedJobs, setPostedJobs] = useState([]);
  const [postedInternships, setPostedInternships] = useState([]);
  const recruiterActions = [
    { title: "Post New Job", description: "Create and publish a new job listing.", icon: Briefcase, goto:"/post"},
    { title: "Evaluate Applications", description: "Review and shortlist candidates.", icon: CheckCircle, goto:"/evaluate"},
    { title: "Manage Internships", description: "Add or update internship opportunities.", icon: ClipboardList, goto:"/post"},
    { title: "View Companies", description: "Monitor registered companies on the platform.", icon: Building2, goto:"/post"}
  ];
   useEffect(() => {
    const fetchData = async () => {
      try {
        const recruiterEmail = localStorage.getItem("username");
        const [jobsRes, internshipsRes] = await Promise.all([axios.get(`https://jobchahiye.vercel.app/my-jobs/?username=${recruiterEmail}`),axios.get(`https://jobchahiye.vercel.app/my-internships/?username=${recruiterEmail}`)]);
        setPostedJobs(jobsRes.data || []);
        setPostedInternships(internshipsRes.data || []);
      } catch (err) {
        toast.error("Failed to fetch posted jobs/internships", err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-[#121212] pt-24">
      <div className="w-full max-w-6xl mb-16">
        <AnalyticsPage />
        <h2 className="text-3xl font-bold text-white mb-6">Recruiter Actions</h2>
        <div className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-4" ref={jobsRef} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {recruiterActions.map((action, index) => (
            <div key={index} className="min-w-[300px] bg-[#1C1C1C] border border-gray-700 rounded-lg p-5 flex flex-col gap-3">
              <div className="p-2 bg-purple-500/20 rounded-2xl w-fit">
                <action.icon className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-white font-semibold text-lg">{action.title}</h3>
              <p className="text-gray-400 text-sm">{action.description}</p>
            <button className="mt-3 bg-purple-500 hover:bg-purple-700 text-white font-semibold py-1 px-4 rounded-full flex items-center gap-2 w-fit text-sm transition-all duration-300 cursor-pointer" onClick={()=>Navigate(action.goto)}>Go <ArrowRight className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 mt-2">
          <button onClick={() => jobsRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{"<"}</button>
          <button onClick={() => jobsRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{">"}</button>
        </div>
      </div>
      <div className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Your Posted Jobs</h2>
        <div className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-4" ref={internshipsRef} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {postedJobs.length > 0 ? postedJobs.map((job, index) => (
            <div key={index} className="min-w-[300px] bg-[#1C1C1C] border border-gray-700 rounded-lg p-5 flex flex-col gap-3">
              <h3 className="text-white font-semibold text-lg">{job.job_title}</h3>
              <p className="text-gray-400 text-sm">{job.company_name}</p>
              <p className="text-gray-400 text-sm">Openings: {job.openings}</p>
              <p className="text-gray-400 text-sm">Type: {job.work_type}</p>
              <p className="text-gray-400 text-sm">Mode: {job.work_mode}</p>
              <p className={`text-sm font-medium ${job.status === "Active" ? "text-green-400" : "text-red-400"}`}>{job.status}</p>
            </div>
          )) : (
            <p className="text-gray-400">No jobs posted yet.</p>
          )}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 mt-2">
          <button onClick={() => internshipsRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{"<"}</button>
          <button onClick={() => internshipsRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{">"}</button>
        </div>
      </div>
      <div className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Your Posted Internships</h2>
        <div className="flex gap-6 overflow-x-auto scroll-smooth px-2 py-4" ref={internshipsRef} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {postedInternships.length > 0 ? postedInternships.map((job, index) => (
            <div key={index} className="min-w-[300px] bg-[#1C1C1C] border border-gray-700 rounded-lg p-5 flex flex-col gap-3">
              <h3 className="text-white font-semibold text-lg">{job.internship_title}</h3>
              <p className="text-gray-400 text-sm">{job.company_name}</p>
              <p className="text-gray-400 text-sm">Openings: {job.openings}</p>
              <p className="text-gray-400 text-sm">Type: {job.work_type}</p>
              <p className="text-gray-400 text-sm">Mode: {job.work_mode}</p>
              <p className={`text-sm font-medium ${job.status === "Active" ? "text-green-400" : "text-red-400"}`}>{job.status}</p>
            </div>
          )) : (
            <p className="text-gray-400">No internships posted yet.</p>
          )}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 mt-2">
          <button onClick={() => internshipsRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{"<"}</button>
          <button onClick={() => internshipsRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600">{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
