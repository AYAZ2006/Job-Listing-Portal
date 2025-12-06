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

  const SocialIcons = ({ Icons }) => (
    <div className="flex justify-center items-center gap-3">
        {Icons.map((icon) => (
        <a key={icon.name} href={icon.link} className="w-9 h-9 flex justify-center items-center rounded-full bg-gray-300 hover:bg-teal-400 transition">
            <img src={icon.icon} alt={icon.name} className={icon.size} />
        </a>
        ))}
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
    </footer>
  );
}
