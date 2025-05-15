
import React, { useState } from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  image: string;
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: "Senior Full-Stack Developer",
      company: "Intellias",
      period: "Jan 2021 to Mar 2025",
      description: [
        "Led scalable finance and e-commerce app development using React.js, Laravel, MySQL.",
        "Integrated headless CMS platforms like Strapi and Contentful.",
        "Focused on architecture, performance, and cross-team delivery of high-quality solutions."
      ],
      image: "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png"
    },
    {
      title: "Full-Stack Developer – CMS & E-commerce",
      company: "Program-Ace",
      period: "Mar 2018 to Dec 2020",
      description: [
        "Built CMS & e-commerce platforms with WordPress, React, Laravel.",
        "Developed plugins and themes, integrated Stripe/PayPal.",
        "Prioritized responsiveness, SEO, and performance."
      ],
      image: "/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png"
    },
    {
      title: "Front-End Developer",
      company: "Miratech",
      period: "Jan 2016 to Feb 2018",
      description: [
        "Created responsive websites using HTML, CSS, JavaScript, WordPress.",
        "Developed reusable React components.",
        "Improved SEO and accessibility for better reach and usability."
      ],
      image: "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png"
    }
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-b from-black/0 to-blue-900/10">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
          <span className="text-blue-500">#</span> Work Experience
        </h2>

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-4 md:space-x-0 md:space-y-2 pb-4 md:pb-0">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-3 text-left whitespace-nowrap md:whitespace-normal rounded transition-all ${
                  activeTab === index
                    ? 'bg-blue-900/30 text-white border-l-4 border-blue-500'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-blue-900/10 border-l-4 border-transparent'
                }`}
              >
                <p className="font-medium">{exp.company}</p>
                <p className="text-sm opacity-70">{exp.title}</p>
              </button>
            ))}
          </div>

          <div className="md:col-span-8">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`space-y-4 transition-all duration-300 ${
                  activeTab === index ? 'opacity-100' : 'hidden opacity-0'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {exp.title} <span className="text-blue-500">@ {exp.company}</span>
                    </h3>
                    <p className="text-gray-400">{exp.period}</p>
                  </div>
                  
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-500/10 flex-shrink-0">
                    <img 
                      src={exp.image} 
                      alt={`Working at ${exp.company}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {exp.description.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-blue-500 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-500/20">
                <img 
                  src="/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png" 
                  alt="Education" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Bachelor's Degree in Software Engineering
                </h3>
                <p className="text-gray-300">Lviv Polytechnic National University (2012–2016)</p>
                <p className="text-gray-400 mt-1">GPA: 3.8 / 4.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
