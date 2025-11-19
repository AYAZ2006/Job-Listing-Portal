import React, { useState } from "react";
import OtpModal from "./ui/OtpModal";

export default function RecruiterSignup() {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mobile, setMobile] = useState("");

  // OTP modal state
  const [openOtp, setOpenOtp] = useState(false);

  const handleSignup = () => {
    if (!email) {
      alert("Please enter your email before signup.");
      return;
    }
    setOpenOtp(true);
  };

  // Dummy resend OTP handler
  const handleResend = async (email) => {
    console.log("Resending OTP to:", email);
    return Promise.resolve();
  };

  // Dummy verify OTP handler
  const handleVerify = async (email, otp) => {
    console.log("Verifying OTP:", otp, "for", email);
    alert("OTP Verified Successfully!");
    setOpenOtp(false);
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
      <div className="max-w-5xl w-full bg-black/40 rounded-3xl shadow-2xl p-10 flex gap-10 backdrop-blur-xl border border-white/10">

        {/* Left Image Section */}
        <div className="w-1/2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Recruiter"
            className="rounded-2xl shadow-lg"
          />
          <h2 className="text-center text-white text-xl font-bold mt-4">
            Recruit Talent Easily
          </h2>
          <p className="text-center text-gray-300 text-sm">
            Post jobs, evaluate candidates, hire smarter.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="w-1/2">
          <h1 className="text-white text-3xl font-bold mb-6">
            Signup as Recruiter
          </h1>

          <label className="text-gray-300 text-sm">Email *</label>
          <input
            type="email"
            placeholder="Enter your company email"
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white mt-1 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-gray-300 text-sm">First Name *</label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white mt-1 mb-4"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div className="w-1/2">
              <label className="text-gray-300 text-sm">Last Name *</label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white mt-1 mb-4"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>

          <label className="text-gray-300 text-sm">Mobile Number *</label>
          <div className="flex">
            <span className="bg-white/10 text-white px-4 py-3 rounded-l-xl border-r border-white/20">
              +91
            </span>
            <input
              type="tel"
              placeholder="Enter mobile number"
              className="w-full px-4 py-3 rounded-r-xl bg-white/10 text-white mt-0 mb-4"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <button
            onClick={handleSignup}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl mt-4"
          >
            Signup
          </button>

          <p className="text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <a href="/recruiter-login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal
        open={openOtp}
        email={email}
        onClose={() => setOpenOtp(false)}
        onResend={handleResend}
        onVerify={handleVerify}
      />
    </div>
  );
}
