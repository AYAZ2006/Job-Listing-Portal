import React, { use } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import SplittingText from "@/components/ui/shadcn-io/SplittingText.jsx";
import ScrambledText from "@/components/ui/shadcn-io/scrambled-text/index.jsx";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import "../index.css";
function Dashboard() {
  const [showCursor1, setShowCursor1] = React.useState(true);
  const [showCursor2, setShowCursor2] = React.useState(true);
  const [showCursor3, setShowCursor3] = React.useState(true);
  const Navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen overflow-hidden bg-[url('/image.png')] bg-center bg-cover  text-white">
      <Parallax pages={3} className="overflow-y-scroll scrollbar-hidden">
        <ParallaxLayer offset={0} speed={0}>
          <div className="relative h-screen w-full overflow-hidden bg-black bg-cover bg-top animate-bgMove" style={{ backgroundImage: "url('/landing-parallax-1.jpg')" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <img src="/office.jpg" alt="Office" className="absolute bottom-[-12%] animate-bottomIn2 z-20"/>
            <img src="/building.jpg" alt="Building" className="absolute bottom-[-12%] animate-bottomIn1 z-30 w-1/2"/>
            <div className="absolute top-[40%] right-1/2 translate-x-1/2 -translate-y-1/2 z-30 text-center">
              <h3 className="text-xl font-light tracking-[15px] animate-textUp1 text-center">
                <span className="text-white">Find Your </span>
                <span className="text-black">Dream Job</span>
              </h3>
              <h1 className="text-white text-[12rem] font-extrabold uppercase tracking-[40px] mt-[-20px] animate-textUp2">JobLelo</h1>
            </div>
            <div className="absolute bottom-[18%] w-full flex justify-center z-30">
              <p className="text-gray text-sm w-[70%] leading-7 tracking-[1px] text-center animate-textUp3">Find your dream job and take the next step in your career. Explore thousands of opportunities across industries, connect with top companies, and build the future you’ve always envisioned. Whether you're looking for growth, experience, or the perfect fit, your career journey starts here.Your career journey is just beginning. Discover roles that match your skills, grow with inspiring teams, and unlock new possibilities. From internships to full-time positions, find the opportunity that brings out your best.</p>
            </div>
            <div className="absolute bottom-[8%] w-full flex justify-center z-30 animate-textUp4" onClick={()=>Navigate('/login')}>
              <button className="w-[300px] h-[50px] border border-white/80 rounded-full text-white/80 tracking-[3px] uppercase flex items-center justify-center gap-2 transition hover:bg-white/80 hover:text-gray-800">Explore More <i className="fa-solid fa-arrow-right"></i></button>
            </div>
            <div className="absolute top-1/2 w-full flex justify-between px-[5%] text-white/40 text-4xl animate-zoomOut z-30">
              <i className="fa-solid fa-chevron-left cursor-pointer"></i>
              <i className="fa-solid fa-chevron-right cursor-pointer"></i>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0}>
         <div className="relative h-screen w-full overflow-hidden bg-[#121212] bg-cover bg-top animate-bgMove" style={{ backgroundImage: "url('/landing-parallax-1.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute top-[40%] right-1/2 translate-x-1/2 -translate-y-1/2 z-30 text-center">
              <h3 className="text-white text-xl font-light tracking-[15px] animate-textUp1">The Land of Serene Beauty</h3>
              <h1 className="text-white text-[12rem] font-extrabold uppercase tracking-[40px] mt-[-20px] animate-textUp2">Kerala</h1>
            </div>
            <div className="absolute bottom-[18%] w-full flex justify-center z-30">
              <p className="text-white/70 text-sm w-[70%] leading-7 tracking-[1px] text-center animate-textUp3">Kerala is a tropical paradise in southern India, known for itsbreathtaking landscapes, rich culture, and serene backwaters. Whetheryou're seeking adventure, relaxation, or a taste of India's uniquetraditions, Kerala has something for everyone. From lush hills topristine beaches, this state blends beauty and tradition perfectly.</p>
            </div>
            <div className="absolute bottom-[8%] w-full flex justify-center z-30 animate-textUp4">
              <button className="w-[300px] h-[50px] border border-white/80 rounded-full text-white/80 tracking-[3px] uppercase flex items-center justify-center gap-2 transition hover:bg-white/80 hover:text-gray-800">Explore More <i className="fa-solid fa-arrow-right"></i></button>
            </div>
            <div className="absolute top-1/2 w-full flex justify-between px-[5%] text-white/40 text-4xl animate-zoomOut z-30">
              <i className="fa-solid fa-chevron-left cursor-pointer"></i>
              <i className="fa-solid fa-chevron-right cursor-pointer"></i>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0} className="flex flex-col items-center justify-center h-screen bg-[#121212]">
          <SplittingText text="Your future starts here" type="words" className="text-white/80 text-3xl mt-160 sm:mt-0 font-bold" motionVariants={{initial: { opacity: 0, x: 100 },animate: { opacity: 1, x: 0 },transition: { duration: 0.9 },stagger: 0.1,}} inView={true}/>
          <h1 className="text-5xl font-extrabold text-white leading-snug max-w-3xl mx-auto text-center space-y-2 mt-5">
            <span className="block text-yellow-400">
              <Typewriter words={["Opportunity is missed by most people"]} loop={1} cursor={showCursor1} cursorStyle="" typeSpeed={70} deleteSpeed={50} delaySpeed={1000} onLoopDone={() => setShowCursor1(false)}/>
            </span>
            <span className="block text-gray-300">
              <Typewriter words={["because it is dressed in overalls"]}  loop={1}  cursor={showCursor2} cursorStyle=""  typeSpeed={70}  deleteSpeed={50}  delaySpeed={2000} onLoopDone={() => setShowCursor2(false)}/>
            </span>
            <span className="block text-blue-400">
              <Typewriter words={["and looks like work."]} loop={1} cursor={showCursor3} cursorStyle="" typeSpeed={70} deleteSpeed={50} delaySpeed={3000} onLoopDone={() => setShowCursor3(false)}/>
            </span>
          </h1>
          <div className="lg:fixed lg:h-10 flex justify-center mt-120">
            <nav className="flex items-center bg-black backdrop-blur-md rounded-sm shadow text-[0.65rem] tracking-wider uppercase text-gray-200 font-semibold">
              <ScrambledText className="text-center inline-block w-20" radius={120} duration={1} speed={0.6} scrambleChars="!@#$%^&*()_+" style={{ color: 'currentColor', fontSize: 'clamp(0.65rem, 1.5vw, 1rem)', fontFamily: 'inherit' }}>Vision</ScrambledText>
              <span className="text-gray-500">/</span>
              <ScrambledText className="text-center inline-block w-20" radius={120} duration={1} speed={0.6} scrambleChars="!@#$%^&*()_+" style={{ color: 'currentColor', fontSize: 'clamp(0.65rem, 1.5vw, 1rem)', fontFamily: 'inherit' }}>Pioneer</ScrambledText>
              <span className="text-gray-500">/</span>
              <ScrambledText className="text-center inline-block w-20" radius={120} duration={1} speed={0.6} scrambleChars="!@#$%^&*()_+" style={{ color: 'currentColor', fontSize: 'clamp(0.65rem, 1.5vw, 1rem)', fontFamily: 'inherit' }}>Dream</ScrambledText>
              <span className="text-gray-500">/</span>
              <ScrambledText className="text-center inline-block w-20" radius={120} duration={1} speed={0.6} scrambleChars="!@#$%^&*()_+" style={{ color: 'currentColor', fontSize: 'clamp(0.65rem, 1.5vw, 1rem)', fontFamily: 'inherit' }}>Support</ScrambledText>
            </nav>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default Dashboard;
