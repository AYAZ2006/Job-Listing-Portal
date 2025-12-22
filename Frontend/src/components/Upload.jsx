import React, { useState } from "react";
import { FiUploadCloud,FiRefreshCw  } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
export default function Upload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const handleFile = (selected) => {const picked = selected[0];if (picked) setFile(picked);};
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files);
  };
  const handleRefresh = () => setFile(null);
  const handleUpload = async () => {
    if (!file) return toast.warning("Please select a file first.");
    const formData = new FormData();
    const email = localStorage.getItem("user_email")
    formData.append("email",email); 
    formData.append("file", file);
    try {
      const res = await fetch("http://127.0.0.1:8000/upload-resume/", {method: "POST",body: formData,});
      const data = await res.json();
      if (res.ok) {
        toast.success("Uploaded successfully");
        setFile(null);
        setIsDragging(false);
      } else {
        toast.error(JSON.stringify(data));
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="min-h-screen text-white flex justify-center items-center p-4">
      <div className="bg-[#0E1422] w-full max-w-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Upload the Resume</h2>
          <button className="text-gray-400 hover:text-gray-200 text-xl" onClick={() => window.location.reload()}>×</button>
        </div>
        <p className="text-gray-400 text-sm mb-6">Make sure the file format meets the requirements. It must be .pdf</p>

        <div className={`rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 ${isDragging ? "border-blue-500 bg-blue-500/10" : "border-gray-700 bg-[#111827]"}`} onDragEnter={(e) => {e.preventDefault();setIsDragging(true);}} onDragLeave={(e) => {e.preventDefault();setIsDragging(false);}} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          <div className="text-blue-400 mb-4 flex justify-center"><FiUploadCloud size={70} /></div>
          <p className="text-lg text-gray-300 mb-1">Drag & Drop</p>
          <label className="text-blue-400 font-medium cursor-pointer relative inline-block after:block after:w-full after:h-px after:bg-blue-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">
            Choose a file
            <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleFile(e.target.files)}/>
          </label>
          {file && (
            <div className="mt-4 flex items-center justify-between bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 w-full max-w-md">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white rounded p-1"><FiUploadCloud size={20} /></div>
                <p className="text-sm text-gray-300">{file.name}</p>
              </div>
              <div className="flex gap-3 text-gray-400">
                <button onClick={handleRefresh} className="hover:text-blue-400 cursor-pointer"><FiRefreshCw size={18} /></button>
              </div>
            </div>
          )}
        </div>
        <p className="text-gray-500 text-xs mt-4">Maximum file size 500MB • See more requirements</p>
        <div className="flex justify-between items-center mt-10">
          <div className="flex gap-4 text-gray-400 text-sm">
            <button className="hover:text-gray-200">Verification</button>
            <span>•</span>
            <button className="hover:text-gray-200 cursor-pointer" onClick={() => navigate("/contact")}>Help Center</button>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer" onClick={() => window.location.reload()}>Cancel</button>
            <button className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 cursor-pointer" onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
}
