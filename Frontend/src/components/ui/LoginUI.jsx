import { useNavigate } from "react-router-dom";

export default function LoginUI() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">

      {/* Grid Light Effect */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(80,80,255,0.1)1px,transparent1px),linear-gradient(90deg,rgba(80,80,255,0.1)1px,transparent1px)] bg-[size:45px_45px] animate-pulse"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left Image Section */}
        <div
          className="hidden lg:flex items-end justify-center p-6 bg-gradient-to-br from-blue-700 via-blue-800 to-gray-900"
          style={{
            backgroundImage:
              "url('https://d8it4huxumps7.cloudfront.net/uploads/images/login/login-img-1.png?d=734x734')",
            backgroundSize: "contain",
            backgroundPosition: "center -18px",
            backgroundRepeat: "no-repeat"
          }}
        ></div>

        {/* Right Content */}
        <div className="p-10 flex flex-col justify-center space-y-6">

          {/* Heading */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-white">Login to your account</h1>
            <p className="text-gray-300 text-sm">Choose how you want to login</p>
          </div>

          {/* Candidate Login */}
          <div
            className="w-full flex items-start justify-center gap-3 py-6 px-6 bg-orange-500/10 border border-amber-500 rounded-lg flex-col text-white font-medium hover:bg-orange-500/20 transition cursor-pointer"
            onClick={() => navigate("/candidate-login")}
          >
            <img src="/user.svg" alt="user" className="w-5 h-5" />
            <h1 className="text-2xl">Login as Candidate</h1>
            <h1 className="text-white/70">
              Access your profile, apply for jobs & track applications
            </h1>
          </div>

          {/* Recruiter Login */}
          <div
            className="w-full flex items-start justify-center gap-3 py-6 px-6 bg-sky-500/10 border border-indigo-500 rounded-lg flex-col text-white font-medium hover:bg-sky-500/20 transition cursor-pointer"
            onClick={() => navigate("/recruiter-login")}
          >
            <img src="/search.svg" alt="search" className="w-5 h-5" />
            <h1 className="text-2xl">Login as Recruiter</h1>
            <h1 className="text-white/70">
              Manage candidates, post jobs & review applications
            </h1>
          </div>

          {/* Signup Link */}
          <p className="text-sm text-center text-gray-400 mt-2">
            Don’t have an account?
            <span
              className="text-blue-400 ml-1 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full top-0 left-5 animate-ping"></div>
        <div className="absolute w-20 h-20 bg-purple-500/10 rounded-full bottom-10 right-10 animate-bounce"></div>
        <div className="absolute w-24 h-24 bg-pink-500/10 rounded-full top-1/3 right-1/4 animate-pulse"></div>
      </div>

    </div>
  );
}

