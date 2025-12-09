import React, { Fragment } from "react";

export default function Footer() {
  const Jobs = [
    { name: "Full-Time Jobs", link: "/jobs" },
    { name: "Internships", link: "/internships" },
    { name: "Part-Time Jobs", link: "/jobs" },
    { name: "Remote Opportunities", link: "/jobs" },
  ];

  const RESOURCES = [
    { name: "Career Advice", link: "#" },
    { name: "Resume Tips", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Interview Prep", link: "#" },
    { name: "Salary Insights", link: "#" },
  ];

  const COMPANY = [
    { name: "About Us", link: "/" },
    { name: "Our Team", link: "/" },
    { name: "Press", link: "/" },
    { name: "Customer Stories", link: "/" },
    { name: "Diversity & Inclusion", link: "/" },
  ];

  const SUPPORT = [
    { name: "Help Center", link: "/" },
    { name: "FAQs", link: "/" },
    { name: "Webinars", link: "/" },
    { name: "Open-source", link: "/" },
    { name: "Contact Us", link: "/contact" },
  ];

  const Icons = [
    { name: "facebook", icon: "/facebook.svg", link: "#", size: "w-7 h-7"},
    { name: "twitter", icon: "/twitter.svg", link: "#", size: "w-6 h-6" },
    { name: "github", icon: "/github.svg", link: "#", size: "w-7 h-7" },
    { name: "linkedin", icon: "/linkedin.svg", link: "#", size: "w-6 h-6" },
    { name: "instagram", icon: "/instagram.svg", link: "#", size: "w-6 h-6" },
];


  const Item = ({ Links, title }) => (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a href={link.link} className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6">{link.name}</a>
        </li>
      ))}
    </ul>
  );
  const DEVELOPERS = [
    { name: "Mohammed Ayaz Mohiuddin", role: "Full Stack Developer",linkedin:"https://www.linkedin.com/in/mohammed-ayaz-38ba06289" },
    { name: "Sujith", role: "Full Stack Developer",linkedin:"https://www.linkedin.com/in/sujith-arike/" },
  ];

  const SPECIAL_THANKS = [
    { name: "Omkar Raichur", role: "Contributer & Tester",linkedin:"https://www.linkedin.com/in/omkarraichur/" },
  ];
  const SocialIcons = ({ Icons }) => (
    <div className="flex justify-center items-center gap-3">
        {Icons.map((icon) => (
        <a key={icon.name} href={icon.link} className="w-9 h-9 flex justify-center items-center rounded-full bg-gray-300 hover:bg-teal-400 transition">
            <img src={icon.icon} alt={icon.name} className={icon.size} />
        </a>
        ))}
    </div>
    );

  const CreditsSection = ({ developers, specialThanks }) => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-12 text-gray-400 lg:-translate-x-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <div className="flex-1">
          <h2 className="text-white font-semibold text-lg mb-4">Developers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {developers.map((dev, idx) => (
              <div key={idx} className="flex flex-col">
                <a  href={dev.linkedin}  target="_blank"  rel="noopener noreferrer"  className="font-medium text-white hover:text-teal-400 transition">{dev.name}</a>
                <span className="italic text-gray-400 text-sm">{dev.role}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-white font-semibold text-lg mb-4">Special Thanks</h2>
          <div className="flex flex-col gap-4">
            {specialThanks.map((item, idx) => (
              <a key={idx} href={item.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition">
                <p className="hover:text-teal-400 transition font-medium text-white">{item.name}</p>
                <p className="italic text-gray-400 text-sm">{item.role}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-6 text-gray-500 text-xs text-left">Crafted with care and expertise by a dedicated team of developers.</p>
    </div>
    );


  const ItemsContainer = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={Jobs} title="JOBS" />
      <Item Links={RESOURCES} title="RESOURCES" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
  return (
    <footer className="bg-[#0A0A0A] w-full text-white">
      <ItemsContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2025 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
      <CreditsSection developers={DEVELOPERS} specialThanks={SPECIAL_THANKS} />
    </footer>
  );
}
