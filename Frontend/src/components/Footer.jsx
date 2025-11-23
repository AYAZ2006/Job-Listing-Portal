import React, { Fragment } from "react";

export default function Footer() {
  const PRODUCTS = [
    { name: "Drag And Drop", link: "#" },
    { name: "Visual Studio X", link: "#" },
    { name: "Easy Content", link: "#" },
  ];

  const RESOURCES = [
    { name: "Industries and tools", link: "#" },
    { name: "Use cases", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Online event", link: "#" },
    { name: "Nostrud exercitation", link: "#" },
  ];

  const COMPANY = [
    { name: "Diversity & inclusion", link: "#" },
    { name: "About us", link: "#" },
    { name: "Press", link: "#" },
    { name: "Customer Stories", link: "#" },
    { name: "Online communities", link: "#" },
  ];

  const SUPPORT = [
    { name: "Documentation", link: "#" },
    { name: "Tutorials & guides", link: "#" },
    { name: "Webinars", link: "#" },
    { name: "Open-source", link: "#" },
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
      <Item Links={PRODUCTS} title="PRODUCTS" />
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
