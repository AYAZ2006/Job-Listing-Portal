import React, { useState } from "react";
import OtpModal from "./ui/OtpModal";
import { useNavigate } from "react-router-dom";

export default function RecruiterLogin() {
  const [emailInput, setEmailInput] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const navigate = useNavigate();

  // fake sending OTP
  async function sendOtpApi(email) {
    console.log("Recruiter OTP sent to:", email);
    return new Promise((res) => setTimeout(res, 700));
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(80,80,255,0.1)1px,transparent1px),linear-gradient(90deg,rgba(80,80,255,0.1)1px,transparent1px)] bg-[size:45px_45px] animate-pulse"></div>

      <div className="relative z-10 w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SIDE IMAGE */}
        <div
          className="hidden lg:flex items-center justify-center p-6 bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900"
          style={{
            backgroundImage: "url('https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-1.png?d=734x734')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10 flex flex-col justify-center space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-white">Recruiter Login</h1>
            <p className="text-gray-300 text-sm">Access your recruiter dashboard</p>
          </div>

          <input
            type="email"
            placeholder="Enter your recruiter email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none"
          />

          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition cursor-pointer"
            onClick={async () => {
              if (!emailInput) return alert("Enter email");
              await sendOtpApi(emailInput);
              setOtpEmail(emailInput);
              setOtpOpen(true);
            }}
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-400 mt-2">
            Don’t have an account?
            <span
              className="text-blue-400 ml-1 cursor-pointer hover:underline"
              onClick={() => navigate("/recruiter")}
            >
              Signup
            </span>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <OtpModal
        open={otpOpen}
        email={otpEmail}
        onClose={() => setOtpOpen(false)}
        onResend={() => sendOtpApi(otpEmail)}
        onVerify={() => {
          setOtpOpen(false);
          navigate("/recruiter-dashboard");
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full top-0 left-5 animate-ping"></div>
        <div className="absolute w-20 h-20 bg-purple-500/10 rounded-full bottom-10 right-10 animate-bounce"></div>
        <div className="absolute w-24 h-24 bg-pink-500/10 rounded-full top-1/3 right-1/4 animate-pulse"></div>
      </div>
    </div>
  );
}
