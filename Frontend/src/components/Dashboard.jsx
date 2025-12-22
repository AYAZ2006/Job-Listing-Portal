import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import SplittingText from "@/components/ui/shadcn-io/SplittingText.jsx";
import ScrambledText from "@/components/ui/shadcn-io/scrambled-text/index.jsx";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../index.css";
function Dashboard() {
  const [showCursor1, setShowCursor1] = React.useState(true);
  const [showCursor2, setShowCursor2] = React.useState(true);
  const [showCursor3, setShowCursor3] = React.useState(true);
  const companies = ["Google","Microsoft","Amazon","Meta","Apple","Netflix","Adobe","Salesforce",];
  const logos = [
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/256211ad-d248-43f6-9361-f9f666b25300/public", alt: "Microsoft" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/b6975c88-b230-4c80-05de-523799dea000/public", alt: "Amazon" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/bf9f88fb-c486-4425-d4ba-de51b8d27f00/public", alt: "Adobe" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/f3d71fd8-64c8-451f-bf95-df47a432b800/public", alt: "Qualcomm" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/bb24aedc-6d7b-42a7-15b4-3f1ddcfc8700/public", alt: "Visa" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/b685226e-d473-4917-555c-461a1302b300/public", alt: "Oracle" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/465992cf-1519-4dbc-71ab-457868d6a600/public", alt: "DE Shaw & Co" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/eaa557ab-6445-46b6-1c0b-fed8a77bf600/public", alt: "Google" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/380e8284-812e-4235-cf3c-7c19c630d200/public", alt: "Flipkart" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/44878280-dd42-4b9e-c76d-ae235d072f00/public", alt: "Walmart" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/ac315be4-16b6-4079-3de5-314a1054df00/public", alt: "Goldman Sachs" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/b0be829a-e9c0-4611-1c97-233827517900/public", alt: "IBM" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/f310ad12-d6d8-4adf-df3e-b040aba7f200/public", alt: "Meta" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/18f4096f-ee27-4246-c5ec-89b979bc0900/public", alt: "DarwinBox" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/f1acbf97-b6fe-4004-b90d-d018d91b7500/public", alt: "JP Morgan" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/1bf932d8-2b71-4101-4bd2-230bc4ab0a00/public", alt: "Accenture" },
    { src: "https://imagedelivery.net/L-RRwTsGtjw4XmStu9Y7XA/a793dceb-1355-442d-054f-2e778707a700/public", alt: "Apple" },
  ];
  const Navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen overflow-hidden bg-[url('/image.png')] bg-center bg-cover  text-white">
      <Parallax pages={4} className="overflow-y-scroll scrollbar-hidden">
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
              <h3 className="text-white text-xl font-light tracking-[15px] animate-textUp1">Discover Your Next Opportunity</h3>
              <h1 className="text-white text-[12rem] font-extrabold uppercase tracking-[40px] mt-[-20px] animate-textUp2">JobLelo</h1>
            </div>
            <div className="absolute bottom-[18%] w-full flex justify-center z-30">
              <p className="text-white/70 text-sm w-[70%] leading-7 tracking-[1px] text-center animate-textUp3">JobLelo connects talented professionals with their dream roles across industries. Browse thousands of listings, discover exciting opportunities, and take the next step in your career. From internships to full-time positions, find the perfect fit for your skills and ambitions.</p>
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
        <ParallaxLayer offset={2} speed={0} className="flex flex-col items-center justify-center h-screen bg-black">
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
            <nav className="flex items-center bg-gray-900 backdrop-blur-md rounded-sm shadow text-[0.65rem] tracking-wider uppercase text-gray-200 font-semibold">
              <ScrambledText className="text-center inline-block w-20" radius={120} duration={1} speed={0.6} scrambleChars="!@#$%^&*()_+" style={{ color: 'currentColor', fontSize: 'clamp(0.65rem, 1.5vw, 1rem)', fontFamily: 'inherit' }}>Vision</ScrambledText>
              <span className="text-gray-500">/</span>
              <ScrambledText className="text-center inline-block w-20" radius={120} duration={1} speed={0.6} scrambleChars="!@#$%^&*()_+" style={{ color: 'currentColor', fontSize: 'clamp(0.65rem, 1.5vw, 1rem)', fontFamily: 'inherit' }}>Pioneer</ScrambledText>
              <span className="text-gray-500">/</span>
              <ScrambledText className="text-center inline-block w-20" radius={120} duration={1} speed={0.6} scrambleChars="!@#$%^&*()_+" style={{ color: 'currentColor', fontSize: 'clamp(0.65rem, 1.5vw, 1rem)', fontFamily: 'inherit' }}>Dream</ScrambledText>
              <span className="text-gray-500">/</span>
              <ScrambledText className="text-center inline-block w-20" radius={120} duration={1} speed={0.6} scrambleChars="!@#$%^&*()_+" style={{ color: 'currentColor', fontSize: 'clamp(0.65rem, 1.5vw, 1rem)', fontFamily: 'inherit' }}>Support</ScrambledText>
            </nav>
          </div>
          <h1 className="fixed mt-170 text-5xl">Our Alumini Works At</h1>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0} className="relative h-screen">
          <div className="absolute inset-0 bg-[#0A0A0A] z-10">
            <section className="py-16 overflow-hidden bg-black backdrop-blur-sm">
              <style jsx>{`
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee {animation: marquee 60s linear infinite;}
                .animate-marquee:hover {animation-play-state: paused;}
              `}</style>
              <div className="flex animate-marquee whitespace-nowrap min-w-max">
                <div className="flex items-center gap-20">
                  {logos.map((logo, index) => (
                    <div key={`first-${index}`} className="shrink-0 px-10">
                      <img src={logo.src} alt={logo.alt} className="h-24 w-auto object-contain brightness-0 invert opacity-75 hover:opacity-100 transition-opacity duration-300"/>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-20">
                  {logos.map((logo, index) => (
                    <div key={`dup-${index}`} className="shrink-0 px-10">
                      <img src={logo.src} alt={logo.alt} className="h-24 w-auto object-contain brightness-0 invert opacity-75 hover:opacity-100 transition-opacity duration-300"/>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
          <div className="absolute bottom-0 w-full z-20">
            <Footer />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default Dashboard;
