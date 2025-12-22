import React,{useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import HashLoader from 'react-spinners/HashLoader';
export default function ContactUs() {
  const [formData, setFormData] = useState({name: "",email: "",phone: "",company: "",message: "",terms: false,});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const {name,value,type,checked} = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms) {
      toast.warning("Please accept the terms before submitting.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://jobchahiye.vercel.app/contact/", formData);
      toast.success("Your message has been sent successfully!");
      setFormData({name: "",email: "",phone: "",company: "",message: "",terms: false,   });
      setLoading(false);
    } catch (error) {
      toast.error("Failed to send your message");
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
      <div className="w-full min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-wide mt-10">LET'S GET IN TOUCH</h1>
        <p className="text-gray-400 text-center max-w-xl mb-12">Can't find what you're looking for? Contact us and we'll get back to you shortly.</p>
        <form className="w-full max-w-xl space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-300 font-medium">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Type Here" className="w-full p-3 mt-1 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:border-blue-500 outline-none" required/>
          </div>
          <div>
            <label className="text-sm text-gray-300 font-medium">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Type Here" className="w-full p-3 mt-1 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:border-blue-500 outline-none" required/>
          </div>
          <div>
            <label className="text-sm text-gray-300 font-medium">Phone Number *</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Type Here" className="w-full p-3 mt-1 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:border-blue-500 outline-none" required/>
          </div>
          <div>
            <label className="text-sm text-gray-300 font-medium">Company/College Name *</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Type Here" className="w-full p-3 mt-1 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:border-blue-500 outline-none" required/>
          </div>
          <div>
            <label className="text-sm text-gray-300 font-medium">Message</label>
            <textarea rows="4" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your needs..." className="w-full p-3 mt-1 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg focus:border-blue-500 outline-none" required></textarea>
          </div>
          <div className="flex items-start gap-3">
            <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} className="mt-1 h-4 w-4 accent-green-500" required/>
            <p className="text-xs text-gray-400">By submitting this form, you agree to our terms, privacy policy, and the way we handle your inquiry.</p>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-white-700 transition p-3 rounded-full font-semibold text-white tracking-wide flex items-center justify-center gap-2 cursor-pointer">GET CONNECTED<span className="text-xl">→</span></button>
        </form>
      </div>
    </>
  );
}