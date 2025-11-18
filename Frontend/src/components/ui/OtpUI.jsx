import { useEffect, useState } from "react";

export default function OtpUI({ email }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [counter, setCounter] = useState(60);

  // Mask email
  const maskEmail = (mail) => {
    const [name, domain] = mail.split("@");
    const maskedName = name[0] + "*".repeat(name.length - 1);
    return maskedName + "@" + domain;
  };

  // Timer
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  const handleOtpChange = (value, index) => {
    // Only allow numbers
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#002b36]">
      <div className="w-[420px] bg-[#013845] p-6 rounded-xl shadow-xl text-white">

        <h2 className="text-xl font-semibold text-center mb-2">Please verify your email</h2>

        <p className="bg-green-600/20 text-green-300 p-3 rounded-md text-sm mb-4">
          Enter the One Time Password (OTP) sent to 
          <span className="font-bold text-green-400"> {maskEmail(email)}</span>
        </p>

        {/* OTP Input Boxes */}
        <div className="flex justify-between mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, i)}
              className="w-10 h-12 text-center text-xl bg-gray-800 border border-gray-600 rounded-md focus:border-blue-400"
            />
          ))}
        </div>

        {/* Resend section */}
        <p className="text-sm text-gray-300 text-center">
          Didn’t receive OTP?{" "}
          {counter > 0 ? (
            <span className="text-gray-400">Resend in {counter}s</span>
          ) : (
            <button className="text-blue-400 hover:underline">Resend OTP</button>
          )}
        </p>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700">
            Close
          </button>

          <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600">
            Verify Email
          </button>
        </div>
      </div>
    </div>
  );
}
