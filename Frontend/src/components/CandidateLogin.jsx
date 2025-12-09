import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpModal from "./ui/OtpModal";
import { toast } from "react-toastify";
import axios from "axios";
import HashLoader from 'react-spinners/HashLoader';
export default function CandidateLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Enter both email and password");
      return;
    }
    setLoading(true);  
    try {
      const res = await axios.post('http://127.0.0.1:8000/candidate/login/', { email:email, password:password });
      toast.success(res.data.message);
      localStorage.setItem("user_type", "candidate");
      localStorage.setItem("user_email", email);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid credentials");
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
      <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(80,80,255,0.1)1px,transparent1px),linear-gradient(90deg,rgba(80,80,255,0.1)1px,transparent1px)] bg-[size:45px_45px] animate-pulse"></div>
        <div className="relative z-10 w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:flex items-end justify-center p-6 bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900 relative" style={{backgroundImage:"url('https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-1.png?d=734x734')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center 15px",}}></div>
          <div className="p-10 flex flex-col justify-center space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-3xl font-bold text-white">Welcome to JobPortal</h1>
              <p className="text-gray-300 text-sm">Sign in to continue your job search</p>
            </div>
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-white/10 border border-gray-600 rounded-lg text-white font-medium hover:bg-white/20 transition cursor-pointer">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5" />Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 bg-gray-700/30 border border-gray-500 rounded-lg text-white font-medium hover:bg-gray-600 transition cursor-pointer">
              <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="linkedin" className="w-5 h-5" />Continue with LinkedIn
            </button>
            <div className="flex items-center my-3">
              <hr className="flex-grow border-gray-500/50"/>
              <span className="text-gray-400 mx-2">or</span>
              <hr className="flex-grow border-gray-500/50"/>
            </div>
            <div className="space-y-4 mt-2">
              <div>
                <p className="text-gray-300 mb-1">Email *</p>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-300 mb-1">Password *</p>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 pr-10 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    <img src={showPassword ? "/eye-off.svg" : "/eye.svg"} alt="toggle password"className="w-5 h-5"/>
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button onClick={handleLogin} disabled={!email || !password} className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-8 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Login</button>
                <span className="text-blue-400 text-sm cursor-pointer hover:underline" onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
              </div>
            </div>
            <p className="text-sm text-center text-gray-400">Don't have an account?<span className="text-blue-400 ml-1 cursor-pointer hover:underline" onClick={() => navigate("/signup")}>Sign up</span></p>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full top-0 left-5 animate-ping"></div>
          <div className="absolute w-20 h-20 bg-purple-500/10 rounded-full bottom-10 right-10 animate-bounce"></div>
          <div className="absolute w-24 h-24 bg-pink-500/10 rounded-full top-1/3 right-1/4 animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
