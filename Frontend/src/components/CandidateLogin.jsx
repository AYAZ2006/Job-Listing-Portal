import React, { useState } from "react";
import OtpModal from "./ui/OtpModal";

export default function CandidateLogin() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // OTP Modal control
  const [openOtp, setOpenOtp] = useState(false);

  // Trigger OTP modal
  const handleLogin = () => {
    if (!email) {
      alert("Enter email first");
      return;
    }
    setOpenOtp(true);
  };

  // Dummy resend handler (you can connect API later)
  const handleResend = async (email) => {
    console.log("Resending OTP to:", email);
    return Promise.resolve();
  };

  // Dummy verify handler (you can connect API later)
  const handleVerify = async (email, otp) => {
    console.log("Verifying OTP:", otp, "for email:", email);
    alert("OTP Verified Successfully!");
    setOpenOtp(false);
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* Left Image */}
        <div
          className="hidden lg:flex items-end justify-center p-8 bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900"
          style={{
            backgroundImage:
              "url('https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-1.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Form */}
        <div className="p-10 flex flex-col justify-center space-y-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Login as candidate
          </h1>

          <div>
            <p className="text-gray-300 mb-1">Email *</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 border border-gray-700"
            />
          </div>

          <div>
            <p className="text-gray-300 mb-1">Mobile Number *</p>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-500 border border-gray-700"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition"
          >
            Login
          </button>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?
            <a href="/candidate" className="text-blue-400 ml-1 hover:underline">
              Signup
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
