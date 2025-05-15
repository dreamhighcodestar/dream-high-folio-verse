
import React from 'react';

interface SkillCategory {
  name: string;
  skills: string[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "Vue.js", "Three.js", "Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "WordPress"]
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "Laravel", "PHP", "CodeIgniter", "NestJS"]
    },
    {
      name: "Database",
      skills: ["MySQL", "MongoDB", "MariaDB"]
    },
    {
      name: "Other",
      skills: ["API Integration with AI Tools", "Webhook and Automation Tools", "AI Content Generation", "Shopify", "REST API", "Authentication", "CRUD", "WebSockets", "Responsive Design", "Testing"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
          <span className="text-blue-500">#</span> Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            {skillCategories.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 mr-2"></span>
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 bg-blue-900/20 text-blue-300 rounded-md text-sm border border-blue-900/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full h-full overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png" 
                  alt="Ivan Tereshchenko" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg -z-0"></div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 p-6 rounded-lg border border-blue-900/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Clean & Modern UI</h3>
            </div>
            <p className="text-gray-400">Building beautiful, responsive interfaces that provide excellent user experiences across all devices.</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 p-6 rounded-lg border border-blue-900/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Robust Backend</h3>
            </div>
            <p className="text-gray-400">Developing secure, scalable, and efficient server-side solutions that power complex applications.</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 p-6 rounded-lg border border-blue-900/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">AI Integration</h3>
            </div>
            <p className="text-gray-400">Leveraging artificial intelligence to enhance applications with smart, automated capabilities.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
