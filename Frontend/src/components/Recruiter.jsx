import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import companies from "./Org";
export default function Recruiter() {
  const Navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(80,80,255,0.1)1px,transparent1px),linear-gradient(90deg,rgba(80,80,255,0.1)1px,transparent1px)] bg-[size:45px_45px] animate-pulse"></div>
      <div className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex items-end justify-center p-6 bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900 relative" style={{ backgroundImage: "url('https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-6.png?d=734x734')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center 65px"}}>
        </div>
        <div className="p-10 flex flex-col justify-center space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-white">Sign up as recruiter</h1>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-300 text-sm mb-1">Organization Email *</label>
              <input type="email" id="email" placeholder="Enter your email" className={`w-full px-4 py-3 rounded-lg border text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${isEmail ? "bg-white/10 border-gray-600 focus:ring-blue-500" : "bg-red-900/20 border-red-500 focus:ring-red-500"}`} requiredonChange={(e) => {const email = e.target.value;const domain = email.split("@")[1];if (!domain || domain.includes("gmail") || domain.includes("yahoo") || domain.includes("hotmail")) {setIsEmail(false);} else {setIsEmail(true);}}}/>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col">
                <label htmlFor="firstName" className="text-gray-300 text-sm mb-1">First Name *</label>
                <input type="text" id="firstName" placeholder="First Name" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
              </div>
              <div className="flex-1 flex flex-col">
                <label htmlFor="lastName" className="text-gray-300 text-sm mb-1">Last Name</label>
                <input type="text" id="lastName" placeholder="Last Name" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="mobile" className="text-gray-300 text-sm mb-1">Mobile Number *</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-lg bg-white/10 border border-gray-600 text-white">+91</span>
                <input type="tel" id="mobile" placeholder="Enter mobile number" className="flex-1 px-4 py-3 rounded-r-lg bg-white/10 border border-gray-600 border-l-0 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
              </div>
            </div>
            <div className="flex flex-col">
              <select className="w-full px-2 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                <option value="" disabled>Select your organization</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600/50 rounded-lg text-white font-semibold hover:bg-blue-600/70 transition cursor-pointer mt-2" onClick={(e) => { e.preventDefault(); setShowPopup(true);}}>Login</button>
          </form>
          <p className="text-sm text-center text-gray-400 mt-2">Already have an account?<span className="text-blue-400 ml-1 cursor-pointer hover:underline" onClick={() => Navigate('/login')}>Login</span></p>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full top-0 left-5 animate-ping"></div>
        <div className="absolute w-20 h-20 bg-purple-500/10 rounded-full bottom-10 right-10 animate-bounce"></div>
        <div className="absolute w-24 h-24 bg-pink-500/10 rounded-full top-1/3 right-1/4 animate-pulse"></div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-[35rem] h-[24rem] text-white flex flex-col gap-4 relative">
            <div className="flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/128/5962/5962703.png" alt="verify" className="w-6 h-6"/>
              <h1 className="text-2xl font-bold text-white">Please verify your email</h1>
            </div>
            <div className="flex items-center gap-4">
              <img src="/mail.webp" alt="verify" className="w-6 h-6"/>
              <h1 className="text-xl text-white">Enter the One Time Password (OTP) which has been sent to</h1>
            </div>
            <h2 className="text-xl font-bold">Login Successful</h2>
            <p>You clicked the login button! This is a popup message.</p>
            <button className="self-end px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
