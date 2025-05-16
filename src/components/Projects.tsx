import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Github, Globe, Layers } from 'lucide-react';

interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [animatedProjects, setAnimatedProjects] = useState<ProjectType[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Project data
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "FinTrack Dashboard",
      description: "An AI-powered financial tracking application with real-time analytics, custom reporting, and predictive spending suggestions.",
      image: "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
      category: "web",
      technologies: ["React", "Node.js", "Express", "MongoDB", "TensorFlow.js"],
      liveUrl: "https://fintrack-demo.netlify.app",
      githubUrl: "https://github.com/ivantereshchenko/fintrack",
      features: ["Real-time financial analytics", "AI-based spending predictions", "Custom report generation", "Multi-account management"]
    },
    {
      id: 2,
      title: "EcoStore E-commerce Platform",
      description: "A full-featured e-commerce platform for sustainable products with headless CMS, custom checkout flow, and inventory management.",
      image: "/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png",
      category: "ecommerce",
      technologies: ["Next.js", "Strapi", "PostgreSQL", "Stripe", "Docker"],
      liveUrl: "https://eco-store-demo.vercel.app",
      features: ["Headless CMS integration", "Advanced filtering", "Secure payment processing", "Inventory management"]
    },
    {
      id: 3,
      title: "MindSpace Meditation App",
      description: "A meditation application with guided sessions, progress tracking, and personalized recommendations based on user preferences.",
      image: "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
      category: "web",
      technologies: ["Vue.js", "Firebase", "Web Audio API", "TailwindCSS"],
      liveUrl: "https://mindspace-med.web.app",
      features: ["Guided meditation sessions", "Progress tracking", "Customizable ambient sounds", "Sleep stories"]
    },
    {
      id: 4,
      title: "ContentFlow CMS",
      description: "A custom content management system for publishers with AI-assisted content creation, editorial workflow, and multi-platform publishing.",
      image: "/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png",
      category: "cms",
      technologies: ["React", "Laravel", "MySQL", "Redis", "OpenAI API"],
      githubUrl: "https://github.com/ivantereshchenko/contentflow",
      features: ["AI content generation", "Editorial workflow", "Multi-platform publishing", "SEO optimization tools"]
    },
    {
      id: 5,
      title: "DevConnect Developer Network",
      description: "A social platform for developers to share projects, connect, collaborate, and find job opportunities in the tech industry.",
      image: "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png",
      category: "web",
      technologies: ["React", "Express", "MongoDB", "Socket.io", "AWS"],
      liveUrl: "https://dev-connect-network.herokuapp.com",
      features: ["Developer profiles", "Project showcasing", "Real-time messaging", "Job board integration"]
    },
    {
      id: 6,
      title: "HealthTracker App",
      description: "A comprehensive health tracking application with nutrition monitoring, workout plans, and progress visualization.",
      image: "/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png",
      category: "web",
      technologies: ["React Native", "Node.js", "MongoDB", "Chart.js"],
      features: ["Nutrition tracking", "Custom workout plans", "Progress charts", "Health insights"]
    },
    {
      id: 7,
      title: "PropertyPro Real Estate Platform",
      description: "A real estate listing platform with virtual tours, neighborhood analytics, and mortgage calculator tools.",
      image: "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png",
      category: "web",
      technologies: ["Angular", "Express", "PostgreSQL", "Three.js"],
      liveUrl: "https://property-pro-demo.netlify.app",
      features: ["Virtual property tours", "Neighborhood analytics", "Mortgage calculator", "Agent messaging"]
    },
    {
      id: 8,
      title: "LearningHub LMS",
      description: "A comprehensive learning management system with course creation tools, student progress tracking, and interactive assessments.",
      image: "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
      category: "cms",
      technologies: ["React", "Laravel", "MySQL", "WebSockets"],
      githubUrl: "https://github.com/ivantereshchenko/learning-hub",
      features: ["Course creation tools", "Student progress tracking", "Interactive assessments", "Live virtual classrooms"]
    },
    {
      id: 9,
      title: "TravelPlanner App",
      description: "A travel planning application with itinerary building, budget management, and local recommendations based on user preferences.",
      image: "/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png",
      category: "web",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Google Maps API"],
      liveUrl: "https://travel-planner-app.netlify.app",
      features: ["Itinerary builder", "Budget management", "Local recommendations", "Offline maps"]
    },
    {
      id: 10,
      title: "EventMaster Management System",
      description: "An event management platform with ticketing, attendee tracking, and promotional tools for event organizers.",
      image: "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
      category: "web",
      technologies: ["React", "Express", "MySQL", "Stripe", "SendGrid"],
      features: ["Ticket sales", "Attendee management", "Event promotions", "Event analytics"]
    },
    {
      id: 11,
      title: "RecipeBox Cooking Platform",
      description: "A recipe sharing platform with meal planning tools, ingredient substitution suggestions, and social features for home cooks.",
      image: "/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png",
      category: "web",
      technologies: ["Next.js", "GraphQL", "MongoDB", "Cloudinary"],
      liveUrl: "https://recipe-box-cooking.vercel.app",
      features: ["Recipe sharing", "Meal planning", "Ingredient substitutions", "Cooking timers"]
    },
    {
      id: 12,
      title: "ArtGallery Portfolio System",
      description: "A custom portfolio system for artists with virtual exhibitions, artwork sales, and commission management tools.",
      image: "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png",
      category: "cms",
      technologies: ["React", "WordPress", "WooCommerce", "ThreeJS"],
      githubUrl: "https://github.com/ivantereshchenko/art-gallery",
      features: ["Virtual exhibitions", "Artwork sales", "Commission management", "3D artwork viewing"]
    },
    {
      id: 13,
      title: "ProjectBoard Management Tool",
      description: "A project management platform with task tracking, team collaboration features, and time management tools for development teams.",
      image: "/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png",
      category: "web",
      technologies: ["React", "Express", "PostgreSQL", "Redis", "Socket.io"],
      liveUrl: "https://project-board-tool.herokuapp.com",
      features: ["Task tracking", "Team collaboration", "Time management", "Project analytics"]
    },
    {
      id: 14,
      title: "FashionStore E-commerce",
      description: "A fashion e-commerce platform with virtual fitting room, personalized recommendations, and social shopping features.",
      image: "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png",
      category: "ecommerce",
      technologies: ["React", "Node.js", "MongoDB", "Shopify API", "AWS"],
      features: ["Virtual fitting room", "Personalized recommendations", "Social shopping", "Loyalty program"]
    },
    {
      id: 15,
      title: "BlogEngine Publishing Platform",
      description: "A modern blogging platform with markdown support, SEO tools, and monetization options for content creators.",
      image: "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
      category: "cms",
      technologies: ["Next.js", "GraphQL", "MongoDB", "Algolia"],
      githubUrl: "https://github.com/ivantereshchenko/blog-engine",
      features: ["Markdown editor", "SEO optimization", "Content monetization", "Analytics dashboard"]
    },
    {
      id: 16,
      title: "JobMatch Recruitment Platform",
      description: "A recruitment platform with AI-powered job matching, applicant tracking, and interview scheduling for employers and job seekers.",
      image: "/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png",
      category: "web",
      technologies: ["React", "Django", "PostgreSQL", "Redis", "TensorFlow"],
      features: ["AI job matching", "Applicant tracking", "Interview scheduling", "Resume parsing"]
    },
    {
      id: 17,
      title: "MusicStudio Production App",
      description: "A web-based music production application with recording, mixing, and collaboration tools for musicians.",
      image: "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
      category: "web",
      technologies: ["Vue.js", "Web Audio API", "Firebase", "WebRTC"],
      liveUrl: "https://music-studio-production.web.app",
      features: ["Audio recording", "Track mixing", "Collaboration tools", "Virtual instruments"]
    },
    {
      id: 18,
      title: "DataViz Analytics Dashboard",
      description: "A data visualization dashboard with custom charting tools, report generation, and data import/export capabilities.",
      image: "/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png",
      category: "web",
      technologies: ["React", "D3.js", "Node.js", "MongoDB", "AWS"],
      githubUrl: "https://github.com/ivantereshchenko/data-viz",
      features: ["Interactive charts", "Custom reports", "Data import/export", "Scheduled reports"]
    },
    {
      id: 19,
      title: "GreenThumb Gardening App",
      description: "A gardening application with plant identification, care schedules, and community forums for gardening enthusiasts.",
      image: "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png",
      category: "web",
      technologies: ["React Native", "Express", "MongoDB", "TensorFlow"],
      features: ["Plant identification", "Care schedules", "Community forums", "Garden planning tools"]
    },
    {
      id: 20,
      title: "BookClub Social Platform",
      description: "A social reading platform with book discussions, reading challenges, and personalized recommendations for book lovers.",
      image: "/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png",
      category: "web",
      technologies: ["React", "Node.js", "PostgreSQL", "GraphQL"],
      liveUrl: "https://book-club-social.herokuapp.com",
      features: ["Book discussions", "Reading challenges", "Personalized recommendations", "Reading progress tracking"]
    },
    {
      id: 21,
      title: "HomeSmart IoT Dashboard",
      description: "A smart home control dashboard with device management, automation rules, and energy consumption monitoring.",
      image: "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png",
      category: "web",
      technologies: ["React", "Node.js", "MongoDB", "MQTT", "WebSockets"],
      githubUrl: "https://github.com/ivantereshchenko/home-smart",
      features: ["Device management", "Automation rules", "Energy monitoring", "Voice commands"]
    },
    {
      id: 22,
      title: "CryptoTracker Portfolio Manager",
      description: "A cryptocurrency portfolio tracker with real-time prices, historical data visualization, and investment performance analysis.",
      image: "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
      category: "web",
      technologies: ["Vue.js", "Express", "MongoDB", "Chart.js", "CoinGecko API"],
      liveUrl: "https://crypto-tracker-portfolio.netlify.app",
      features: ["Real-time prices", "Portfolio tracking", "Performance analysis", "Price alerts"]
    }
  ];
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  // Animation on scroll
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = projectRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setAnimatedProjects(prev => {
              if (!prev.find(p => p.id === filteredProjects[index].id)) {
                return [...prev, filteredProjects[index]];
              }
              return prev;
            });
          }
        }
      });
    }, options);
    
    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      projectRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [filteredProjects]);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          <span className="text-blue-500">#</span> Projects
        </h2>
        <p className="text-gray-300 mb-12 max-w-2xl">
          Explore my portfolio of web applications, e-commerce sites, and content management systems that showcase my expertise in full-stack development.
        </p>

        <Tabs defaultValue="all" className="mb-12" onValueChange={setFilter}>
          <TabsList className="bg-blue-900/20 border border-blue-900/40 mb-8">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="web">Web Apps</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="cms">CMS</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className={`transform transition-all duration-700 ${
                animatedProjects.find(p => p.id === project.id) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-16 opacity-0'
              }`}
            >
              <Card className="overflow-hidden h-full bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-900/40 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
                <div className="relative h-48 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <div className="flex space-x-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                          <Github size={18} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                          <Globe size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-200 mb-2 flex items-center">
                      <Layers size={16} className="mr-2 text-blue-500" /> Key Features
                    </h4>
                    <ul className="text-xs text-gray-300 space-y-1 pl-6 list-disc">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-blue-900/30">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/30 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <a 
            href="https://github.com/dreamhighcodestar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-600/80 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
          >
            <Github size={18} />
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>

      {/* Featured Projects Carousel */}
      <div className="container mx-auto mt-20">
        <h3 className="text-2xl font-bold mb-8 text-white">Featured Projects</h3>
        
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {projects.slice(0, 6).map((project) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-900/40">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-white">{project.title}</h3>
                          <p className="text-xs text-gray-300">{project.technologies.slice(0, 3).join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
