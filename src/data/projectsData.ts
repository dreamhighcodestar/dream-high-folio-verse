import { ProjectType } from '@/types/project';

export const projects: ProjectType[] = [
  {
    id: 1,
    title: "FinTrack Dashboard",
    description: "An AI-powered financial tracking application with real-time analytics, custom reporting, and predictive spending suggestions.",
    image: "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
    additionalImages: [
      "/lovable-uploads/5c034d24-a6db-4244-87fd-c2d77198fd98.png",
      "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png"
    ],
    category: "ai-integration",
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
    additionalImages: [
      "/lovable-uploads/9af9d2b5-35c1-4c39-8395-060570167bdc.png",
      "/lovable-uploads/fa6d9c26-38a7-457e-bd55-4f7326a9f667.png"
    ],
    category: "cms-ecommerce",
    technologies: ["Next.js", "Strapi", "PostgreSQL", "Stripe", "Docker"],
    liveUrl: "https://eco-store-demo.vercel.app",
    features: ["Headless CMS integration", "Advanced filtering", "Secure payment processing", "Inventory management"]
  },
  {
    id: 3,
    title: "MindSpace Meditation App",
    description: "A meditation application with guided sessions, progress tracking, and personalized recommendations based on user preferences.",
    image: "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
    additionalImages: [
      "/lovable-uploads/30ffc5ed-1824-406f-bc23-a5cdb81925e0.png",
      "/lovable-uploads/fa6d9c26-38a7-457e-bd55-4f7326a9f667.png"
    ],
    category: "front-end",
    technologies: ["Vue.js", "Firebase", "Web Audio API", "TailwindCSS"],
    liveUrl: "https://mindspace-med.web.app",
    features: ["Guided meditation sessions", "Progress tracking", "Customizable ambient sounds", "Sleep stories"]
  },
  {
    id: 4,
    title: "ContentFlow CMS",
    description: "A custom content management system for publishers with AI-assisted content creation, editorial workflow, and multi-platform publishing.",
    image: "/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png",
    additionalImages: [
      "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
      "/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png"
    ],
    category: "cms-ecommerce",
    technologies: ["React", "Laravel", "MySQL", "Redis", "OpenAI API"],
    githubUrl: "https://github.com/ivantereshchenko/contentflow",
    features: ["AI content generation", "Editorial workflow", "Multi-platform publishing", "SEO optimization tools"]
  },
  {
    id: 5,
    title: "DevConnect Developer Network",
    description: "A social platform for developers to share projects, connect, collaborate, and find job opportunities in the tech industry.",
    image: "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png",
    additionalImages: [
      "/lovable-uploads/98f7be9f-b081-48e8-b7fc-107570bae7f3.png",
      "/lovable-uploads/5c034d24-a6db-4244-87fd-c2d77198fd98.png"
    ],
    category: "full-stack",
    technologies: ["React", "Express", "MongoDB", "Socket.io", "AWS"],
    liveUrl: "https://dev-connect-network.herokuapp.com",
    features: ["Developer profiles", "Project showcasing", "Real-time messaging", "Job board integration"]
  },
  {
    id: 6,
    title: "HealthTracker App",
    description: "A comprehensive health tracking application with nutrition monitoring, workout plans, and progress visualization.",
    image: "/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png",
    additionalImages: [
      "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
      "/lovable-uploads/ac5301d6-7fd5-468e-949c-dfa0ff0abcbc.png"
    ],
    category: "front-end",
    technologies: ["React Native", "Node.js", "MongoDB", "Chart.js"],
    features: ["Nutrition tracking", "Custom workout plans", "Progress charts", "Health insights"]
  },
  {
    id: 7,
    title: "PropertyPro Real Estate Platform",
    description: "A real estate listing platform with virtual tours, neighborhood analytics, and mortgage calculator tools.",
    image: "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png",
    additionalImages: [
      "/lovable-uploads/5c034d24-a6db-4244-87fd-c2d77198fd98.png",
      "/lovable-uploads/9af9d2b5-35c1-4c39-8395-060570167bdc.png"
    ],
    category: "front-end",
    technologies: ["Angular", "Express", "PostgreSQL", "Three.js"],
    liveUrl: "https://property-pro-demo.netlify.app",
    features: ["Virtual property tours", "Neighborhood analytics", "Mortgage calculator", "Agent messaging"]
  },
  {
    id: 8,
    title: "LearningHub LMS",
    description: "A comprehensive learning management system with course creation tools, student progress tracking, and interactive assessments.",
    image: "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
    additionalImages: [
      "/lovable-uploads/fa6d9c26-38a7-457e-bd55-4f7326a9f667.png",
      "/lovable-uploads/30ffc5ed-1824-406f-bc23-a5cdb81925e0.png"
    ],
    category: "cms-ecommerce",
    technologies: ["React", "Laravel", "MySQL", "WebSockets"],
    githubUrl: "https://github.com/ivantereshchenko/learning-hub",
    features: ["Course creation tools", "Student progress tracking", "Interactive assessments", "Live virtual classrooms"]
  },
  {
    id: 9,
    title: "TravelPlanner App",
    description: "A travel planning application with itinerary building, budget management, and local recommendations based on user preferences.",
    image: "/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png",
    additionalImages: [
      "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
      "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png"
    ],
    category: "front-end",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Google Maps API"],
    liveUrl: "https://travel-planner-app.netlify.app",
    features: ["Itinerary builder", "Budget management", "Local recommendations", "Offline maps"]
  },
  {
    id: 10,
    title: "EventMaster Management System",
    description: "An event management platform with ticketing, attendee tracking, and promotional tools for event organizers.",
    image: "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
    additionalImages: [
      "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png",
      "/lovable-uploads/5c034d24-a6db-4244-87fd-c2d77198fd98.png"
    ],
    category: "full-stack",
    technologies: ["React", "Express", "MySQL", "Stripe", "SendGrid"],
    features: ["Ticket sales", "Attendee management", "Event promotions", "Event analytics"]
  },
  {
    id: 11,
    title: "RecipeBox Cooking Platform",
    description: "A recipe sharing platform with meal planning tools, ingredient substitution suggestions, and social features for home cooks.",
    image: "/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png",
    additionalImages: [
      "/lovable-uploads/ac5301d6-7fd5-468e-949c-dfa0ff0abcbc.png",
      "/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png"
    ],
    category: "front-end",
    technologies: ["Next.js", "GraphQL", "MongoDB", "Cloudinary"],
    liveUrl: "https://recipe-box-cooking.vercel.app",
    features: ["Recipe sharing", "Meal planning", "Ingredient substitutions", "Cooking timers"]
  },
  {
    id: 12,
    title: "ArtGallery Portfolio System",
    description: "A custom portfolio system for artists with virtual exhibitions, artwork sales, and commission management tools.",
    image: "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png",
    additionalImages: [
      "/lovable-uploads/98f7be9f-b081-48e8-b7fc-107570bae7f3.png",
      "/lovable-uploads/fa6d9c26-38a7-457e-bd55-4f7326a9f667.png"
    ],
    category: "cms-ecommerce",
    technologies: ["React", "WordPress", "WooCommerce", "ThreeJS"],
    githubUrl: "https://github.com/ivantereshchenko/art-gallery",
    features: ["Virtual exhibitions", "Artwork sales", "Commission management", "3D artwork viewing"]
  },
  {
    id: 13,
    title: "ProjectBoard Management Tool",
    description: "A project management platform with task tracking, team collaboration features, and time management tools for development teams.",
    image: "/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png",
    additionalImages: [
      "/lovable-uploads/9af9d2b5-35c1-4c39-8395-060570167bdc.png",
      "/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png"
    ],
    category: "full-stack",
    technologies: ["React", "Express", "PostgreSQL", "Redis", "Socket.io"],
    liveUrl: "https://project-board-tool.herokuapp.com",
    features: ["Task tracking", "Team collaboration", "Time management", "Project analytics"]
  },
  {
    id: 14,
    title: "FashionStore E-commerce",
    description: "A fashion e-commerce platform with virtual fitting room, personalized recommendations, and social shopping features.",
    image: "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png",
    additionalImages: [
      "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
      "/lovable-uploads/30ffc5ed-1824-406f-bc23-a5cdb81925e0.png"
    ],
    category: "cms-ecommerce",
    technologies: ["React", "Node.js", "MongoDB", "Shopify API", "AWS"],
    features: ["Virtual fitting room", "Personalized recommendations", "Social shopping", "Loyalty program"]
  },
  {
    id: 15,
    title: "BlogEngine Publishing Platform",
    description: "A modern blogging platform with markdown support, SEO tools, and monetization options for content creators.",
    image: "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
    additionalImages: [
      "/lovable-uploads/5c034d24-a6db-4244-87fd-c2d77198fd98.png",
      "/lovable-uploads/9af9d2b5-35c1-4c39-8395-060570167bdc.png"
    ],
    category: "cms-ecommerce",
    technologies: ["Next.js", "GraphQL", "MongoDB", "Algolia"],
    githubUrl: "https://github.com/ivantereshchenko/blog-engine",
    features: ["Markdown editor", "SEO optimization", "Content monetization", "Analytics dashboard"]
  },
  {
    id: 16,
    title: "JobMatch Recruitment Platform",
    description: "A recruitment platform with AI-powered job matching, applicant tracking, and interview scheduling for employers and job seekers.",
    image: "/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png",
    additionalImages: [
      "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png",
      "/lovable-uploads/fa6d9c26-38a7-457e-bd55-4f7326a9f667.png"
    ],
    category: "ai-integration",
    technologies: ["React", "Django", "PostgreSQL", "Redis", "TensorFlow"],
    features: ["AI job matching", "Applicant tracking", "Interview scheduling", "Resume parsing"]
  },
  {
    id: 17,
    title: "MusicStudio Production App",
    description: "A web-based music production application with recording, mixing, and collaboration tools for musicians.",
    image: "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
    additionalImages: [
      "/lovable-uploads/ac5301d6-7fd5-468e-949c-dfa0ff0abcbc.png",
      "/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png"
    ],
    category: "front-end",
    technologies: ["Vue.js", "Web Audio API", "Firebase", "WebRTC"],
    liveUrl: "https://music-studio-production.web.app",
    features: ["Audio recording", "Track mixing", "Collaboration tools", "Virtual instruments"]
  },
  {
    id: 18,
    title: "DataViz Analytics Dashboard",
    description: "A data visualization dashboard with custom charting tools, report generation, and data import/export capabilities.",
    image: "/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png",
    additionalImages: [
      "/lovable-uploads/98f7be9f-b081-48e8-b7fc-107570bae7f3.png",
      "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png"
    ],
    category: "ai-integration",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "AWS"],
    githubUrl: "https://github.com/ivantereshchenko/data-viz",
    features: ["Interactive charts", "Custom reports", "Data import/export", "Scheduled reports"]
  },
  {
    id: 19,
    title: "GreenThumb Gardening App",
    description: "A gardening application with plant identification, care schedules, and community forums for gardening enthusiasts.",
    image: "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png",
    additionalImages: [
      "/lovable-uploads/30ffc5ed-1824-406f-bc23-a5cdb81925e0.png",
      "/lovable-uploads/5c034d24-a6db-4244-87fd-c2d77198fd98.png"
    ],
    category: "ai-integration",
    technologies: ["React Native", "Express", "MongoDB", "TensorFlow"],
    features: ["Plant identification", "Care schedules", "Community forums", "Garden planning tools"]
  },
  {
    id: 20,
    title: "BookClub Social Platform",
    description: "A social reading platform with book discussions, reading challenges, and personalized recommendations for book lovers.",
    image: "/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png",
    additionalImages: [
      "/lovable-uploads/9af9d2b5-35c1-4c39-8395-060570167bdc.png",
      "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png"
    ],
    category: "cms-ecommerce",
    technologies: ["React", "Node.js", "PostgreSQL", "GraphQL"],
    liveUrl: "https://book-club-social.herokuapp.com",
    features: ["Book discussions", "Reading challenges", "Personalized recommendations", "Reading progress tracking"]
  },
  {
    id: 21,
    title: "HomeSmart IoT Dashboard",
    description: "A smart home control dashboard with device management, automation rules, and energy consumption monitoring.",
    image: "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png",
    additionalImages: [
      "/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png",
      "/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png"
    ],
    category: "cms-ecommerce",
    technologies: ["React", "Node.js", "MongoDB", "MQTT", "WebSockets"],
    githubUrl: "https://github.com/ivantereshchenko/home-smart",
    features: ["Device management", "Automation rules", "Energy monitoring", "Voice commands"]
  },
  {
    id: 22,
    title: "CryptoTracker Portfolio Manager",
    description: "A cryptocurrency portfolio tracker with real-time prices, historical data visualization, and investment performance analysis.",
    image: "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
    additionalImages: [
      "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
      "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png"
    ],
    category: "cms-ecommerce",
    technologies: ["Vue.js", "Express", "MongoDB", "Chart.js", "CoinGecko API"],
    liveUrl: "https://crypto-tracker-portfolio.netlify.app",
    features: ["Real-time prices", "Portfolio tracking", "Performance analysis", "Price alerts"]
  },
  {
    id: 23,
    title: "TaskFlow Project Management",
    description: "An agile project management tool with kanban boards, time tracking, and customizable workflows for development teams.",
    image: "/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png",
    additionalImages: [
      "/lovable-uploads/fa6d9c26-38a7-457e-bd55-4f7326a9f667.png",
      "/lovable-uploads/ac5301d6-7fd5-468e-949c-dfa0ff0abcbc.png"
    ],
    category: "full-stack",
    technologies: ["React", "Express", "PostgreSQL", "Redis", "Socket.io"],
    githubUrl: "https://github.com/ivantereshchenko/taskflow",
    features: ["Kanban boards", "Time tracking", "Customizable workflows", "Performance analytics"]
  },
  {
    id: 24,
    title: "PhotoPortfolio Showcase",
    description: "A minimalist photography portfolio platform with image optimization, gallery layouts, and client proofing capabilities.",
    image: "/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png",
    additionalImages: [
      "/lovable-uploads/45cc8efd-c724-4c9b-b7c3-c09e75c3a556.png",
      "/lovable-uploads/30ffc5ed-1824-406f-bc23-a5cdb81925e0.png"
    ],
    category: "cms-ecommerce",
    technologies: ["Next.js", "GraphQL", "MongoDB", "Cloudinary"],
    liveUrl: "https://photo-portfolio-showcase.vercel.app",
    features: ["Image optimization", "Gallery layouts", "Client proofing", "Print ordering"]
  }
];
