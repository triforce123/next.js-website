import React from 'react';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { RiLinkedinBoxFill, RiTwitterFill, RiGithubFill } from 'react-icons/ri';

export default function PersonalWebsite() {
  const calculators = [
    { name: "Home Loan Simulator", url: "home-loan-calculator.html", icon: <RiMoneyDollarBoxLine className="text-2xl text-primary mr-3" /> },
    { name: "Auto Loan Simulator", url: "auto-loan", icon: <RiMoneyDollarBoxLine className="text-2xl text-primary mr-3" /> },
  ];

  const politicalCartoons = [
    {
      name: "The Washington Post Editorial Cartoons",
      url: "https://www.washingtonpost.com/opinions/cartoons/",
      imageUrl: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/ENXA5ST4KFC2HDKQSZJFHVRYN4.jpg&w=1200"
    },
    {
      name: "Cagle Cartoons",
      url: "https://www.cagle.com/",
      imageUrl: "https://image.cagle.com/289047/830/john-darkow_politicians-changing-their-positions.png"
    },
    {
      name: "The Week's Political Cartoons",
      url: "https://theweek.com/cartoons",
      imageUrl: "https://cdn.mos.cms.futurecdn.net/X78qu4syN2M33TTqhL9PxU-1280-80.jpg.webp"
    },
    {
      name: "U.S. News Cartoons",
      url: "https://www.usnews.com/cartoons",
      imageUrl: "https://www.usnews.com/object/image/00000192-58d1-dffe-a7d3-ddf57b580000/20241003edsuc-a.jpg"
    }
  ];

  const socialMedia = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/lesliegarcia", icon: <RiLinkedinBoxFill className="w-6 h-6 text-gray-800 hover:text-blue-500 transition duration-200" /> },
    { name: "Twitter", url: "https://twitter.com/lesliegarcia", icon: <RiTwitterFill className="w-6 h-6 text-gray-800 hover:text-blue-500 transition duration-200" /> },
    { name: "GitHub", url: "https://github.com/lesliegarcia", icon: <RiGithubFill className="w-6 h-6 text-gray-800 hover:text-blue-500 transition duration-200" /> },
  ];

  return (
    <div className="bg-gray-100">
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans ">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 mt-8">My Calculator AI</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Hi there! I'm an operations analyst with a knack for numbers and a keen interest in politics. 
          I love creating calculators that simplify complex financial concepts, making them accessible to everyone. 
          When I'm not crunching numbers, I enjoy following political cartoons to stay informed about current events 
          and to appreciate the power of visual commentary. This website showcases my work and interests - I hope you 
          find it useful and engaging!
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Calculator Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculators.map((calc, index) => (
            <a
              key={index}
              href={calc.url}
              className="flex items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {calc.icon}
              <h3 className="text-xl font-medium text-gray-800">{calc.name}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Political Cartoons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {politicalCartoons.map((cartoon, index) => (
            <a
              key={index}
              href={cartoon.url}
              className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {cartoon.imageUrl && (
                <img src={cartoon.imageUrl} alt={cartoon.name} className="w-full h-auto rounded-lg mb-2" />
              )}
              <h3 className="text-xl font-medium text-gray-800">{cartoon.name}</h3>
              <p className="text-gray-600">Click to view latest cartoons on {cartoon.name}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Connect with Me</h2>
        <div className="flex space-x-4">
          {socialMedia.map((social, index) => (
            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
              {social.icon}
              <span className="ml-2 text-gray-800">{social.name}</span>
            </a>
          ))}
        </div>
      </footer>
    </div>
    </div>
  );
}
