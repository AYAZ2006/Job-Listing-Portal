import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import SplittingText from "@/components/ui/shadcn-io/SplittingText.jsx";
import ScrambledText from "@/components/ui/shadcn-io/scrambled-text/index.jsx";
import { Typewriter } from "react-simple-typewriter";
function Dashboard() {
  const [showCursor1, setShowCursor1] = React.useState(true);
  const [showCursor2, setShowCursor2] = React.useState(true);
  const [showCursor3, setShowCursor3] = React.useState(true);
  return (
    <div className="w-screen min-h-screen overflow-hidden bg-[url('/image.png')] bg-center bg-cover text-white">
      <Parallax pages={3} className="overflow-y-scroll scrollbar-hidden">
        <ParallaxLayer offset={0} speed={0} className="flex flex-col items-center justify-center h-screen bg-black">
          <SplittingText text="Your future starts here" type="words" className="text-white/80 text-3xl font-bold" motionVariants={{initial: { opacity: 0, x: 100 },animate: { opacity: 1, x: 0 },transition: { duration: 0.9 },stagger: 0.1,}} inView={true}/>
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
            <nav className="flex items-center bg-[#1a1a1a]/80 backdrop-blur-md rounded-sm shadow text-[0.65rem] tracking-wider uppercase text-gray-200 font-semibold">
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

        <ParallaxLayer offset={1} speed={0} className="flex flex-col items-center justify-center h-screen bg-black">
          <SplittingText text="Smooth text reveals that actually work" type="words" className="text-white text-5xl font-bold" motionVariants={{initial: { opacity: 0, x: 100 },animate: { opacity: 1, x: 0 },transition: { duration: 0.5 },stagger: 0.1,}} inView={true}/>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0} className="flex flex-col items-center justify-center h-screen bg-black">
          <SplittingText text="Smooth text reveals that actually work" type="words" className="text-white text-5xl font-bold" motionVariants={{initial: { opacity: 0, x: 100 },animate: { opacity: 1, x: 0 },transition: { duration: 0.5 },stagger: 0.1,}} inView={true}/>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default Dashboard;
