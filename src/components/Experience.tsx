
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AnimatedImage from './AnimatedImage';

interface ExperienceItem {
  title: string;
  company: string;
  companyLogo: string;
  period: string;
  description: string[];
  image: string;
  details?: {
    projects?: string[];
    achievements?: string[];
    technologies?: string[];
  };
}

interface EducationItem {
  degree: string;
  institution: string;
  institutionLogo: string;
  period: string;
  description: string;
  gpa: string;
  image: string;
  details?: {
    courses?: string[];
    achievements?: string[];
  };
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: "Senior Full-Stack Developer",
      company: "Intellias",
      companyLogo: "/lovable-uploads/54aa4a3c-d004-4b18-81f4-24b583c49334.png",
      period: "Jan 2021 to Mar 2025",
      description: [
        "Led scalable finance and e-commerce app development using React.js, Laravel, MySQL.",
        "Integrated headless CMS platforms like Strapi and Contentful.",
        "Focused on architecture, performance, and cross-team delivery of high-quality solutions."
      ],
      image: "/lovable-uploads/54aa4a3c-d004-4b18-81f4-24b583c49334.png",
      details: {
        projects: [
          "Enterprise finance management system with real-time analytics and reporting",
          "E-commerce platform with personalized product recommendations",
          "Content management system with AI-assisted content creation"
        ],
        achievements: [
          "Reduced page load time by 40% through optimization",
          "Implemented CI/CD pipelines that reduced deployment time by 65%",
          "Led team of 8 developers across 3 time zones"
        ],
        technologies: [
          "React.js", "Laravel", "MySQL", "Docker", "AWS", "Redis", "Elasticsearch", "Strapi", "Contentful"
        ]
      }
    },
    {
      title: "Full-Stack Developer – CMS & E-commerce",
      company: "Program-Ace",
      companyLogo: "/lovable-uploads/30ffc5ed-1824-406f-bc23-a5cdb81925e0.png",
      period: "Mar 2018 to Dec 2020",
      description: [
        "Built CMS & e-commerce platforms with WordPress, React, Laravel.",
        "Developed plugins and themes, integrated Stripe/PayPal.",
        "Prioritized responsiveness, SEO, and performance."
      ],
      image: "/lovable-uploads/30ffc5ed-1824-406f-bc23-a5cdb81925e0.png",
      details: {
        projects: [
          "Custom WordPress e-commerce platform for fashion retailer",
          "Headless CMS for multi-channel publishing",
          "Subscription-based content platform with tiered access"
        ],
        achievements: [
          "Increased client's conversion rate by 25% through UX improvements",
          "Created reusable component library reducing development time by 30%",
          "Optimized database queries reducing server load by 50%"
        ],
        technologies: [
          "WordPress", "WooCommerce", "React", "Laravel", "MySQL", "Stripe API", "PayPal API", "Redis"
        ]
      }
    },
    {
      title: "Front-End Developer",
      company: "Miratech",
      companyLogo: "/lovable-uploads/98f7be9f-b081-48e8-b7fc-107570bae7f3.png",
      period: "Jan 2016 to Feb 2018",
      description: [
        "Created responsive websites using HTML, CSS, JavaScript, WordPress.",
        "Developed reusable React components.",
        "Improved SEO and accessibility for better reach and usability."
      ],
      image: "/lovable-uploads/98f7be9f-b081-48e8-b7fc-107570bae7f3.png",
      details: {
        projects: [
          "Corporate websites for financial institutions",
          "Interactive product showcase applications",
          "Analytics dashboards with data visualization"
        ],
        achievements: [
          "Implemented responsive designs reducing bounce rate by 15%",
          "Created component library used across 5+ projects",
          "Improved website accessibility to WCAG 2.1 AA standards"
        ],
        technologies: [
          "HTML5", "CSS3", "JavaScript", "React", "WordPress", "SASS", "jQuery", "Bootstrap"
        ]
      }
    }
  ];

  const education: EducationItem = {
    degree: "Bachelor's Degree in Software Engineering",
    institution: "Lviv Polytechnic National University",
    institutionLogo: "/lovable-uploads/6c1c300e-5fd1-422a-9d24-2eefcd8e9afe.png",
    period: "2012–2016",
    description: "Comprehensive software engineering education with focus on software development methodologies, algorithms, data structures, and practical programming skills.",
    gpa: "3.8 / 4.0",
    image: "/lovable-uploads/6c1c300e-5fd1-422a-9d24-2eefcd8e9afe.png",
    details: {
      courses: [
        "Advanced Algorithms and Data Structures",
        "Database Systems",
        "Object-Oriented Programming",
        "Web Development",
        "Software Project Management",
        "System Analysis and Design",
        "Computer Networks",
        "Operating Systems"
      ],
      achievements: [
        "Dean's List for Academic Excellence (2013-2016)",
        "1st Place in University Web Development Competition",
        "Research Assistant in the Computer Science Department",
        "Lead Developer for University Student Portal"
      ]
    }
  };

  const [activeTab, setActiveTab] = useState(0);
  const [showExperienceDetails, setShowExperienceDetails] = useState(false);
  const [showEducationDetails, setShowEducationDetails] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  const handleShowExperienceDetails = (experience: ExperienceItem) => {
    setSelectedExperience(experience);
    setShowExperienceDetails(true);
  };

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
                    <AnimatedImage
                      src={exp.companyLogo}
                      alt={`${exp.company} logo`}
                      className="w-full h-full object-contain p-2"
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

                <div className="pt-4">
                  <button
                    onClick={() => handleShowExperienceDetails(exp)}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>View Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            <span className="text-blue-500">#</span> Education
          </h2>
          <div 
            className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-6 md:p-8 cursor-pointer hover:bg-blue-900/30 transition-colors"
            onClick={() => setShowEducationDetails(true)}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-500/20 bg-white/5">
                <AnimatedImage 
                  src={education.institutionLogo} 
                  alt={education.institution}
                  className="w-full h-full object-contain p-2" 
                />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {education.degree}
                </h3>
                <p className="text-gray-300">{education.institution} ({education.period})</p>
                <p className="text-gray-400 mt-1">GPA: {education.gpa}</p>
                
                <div className="mt-4">
                  <span className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    <span>View Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Details Dialog */}
      <Dialog open={showExperienceDetails} onOpenChange={setShowExperienceDetails}>
        <DialogContent className="max-w-3xl bg-gradient-to-br from-blue-900/90 to-black/95 border-blue-900/40 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {selectedExperience?.title}
              <span className="text-blue-400">@ {selectedExperience?.company}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <div className="aspect-video overflow-hidden rounded-lg mb-6 bg-white/5 flex items-center justify-center">
                <AnimatedImage
                  src={selectedExperience?.companyLogo || ''}
                  alt={selectedExperience?.company || ''}
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Key Projects</h4>
                  <ul className="space-y-1">
                    {selectedExperience?.details?.projects?.map((project, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                        <span className="text-gray-300 text-sm">{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Achievements</h4>
                <ul className="space-y-1">
                  {selectedExperience?.details?.achievements?.map((achievement, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperience?.details?.technologies?.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 text-xs rounded-full bg-blue-900/40 text-blue-300 border border-blue-900/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold text-gray-300">Period:</span> {selectedExperience?.period}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Education Details Dialog */}
      <Dialog open={showEducationDetails} onOpenChange={setShowEducationDetails}>
        <DialogContent className="max-w-3xl bg-gradient-to-br from-blue-900/90 to-black/95 border-blue-900/40 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {education.degree}
              <span className="text-blue-400">@ {education.institution}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <div className="aspect-video overflow-hidden rounded-lg mb-6 bg-white/5 flex items-center justify-center">
                <AnimatedImage
                  src={education.institutionLogo}
                  alt={education.institution}
                  className="w-4/5 h-4/5 object-contain"
                />
              </div>
              
              <div>
                <p className="text-gray-300">{education.description}</p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Period</p>
                    <p className="font-medium text-white">{education.period}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">GPA</p>
                    <p className="font-medium text-white">{education.gpa}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Key Courses</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {education.details?.courses?.map((course, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-300 text-sm">{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Achievements</h4>
                <ul className="space-y-2">
                  {education.details?.achievements?.map((achievement, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-blue-400 flex-shrink-0 mt-1">•</span>
                      <span className="text-gray-300 text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Experience;
