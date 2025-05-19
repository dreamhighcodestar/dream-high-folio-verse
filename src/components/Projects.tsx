
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ProjectsFilter from './projects/ProjectsFilter';
import ProjectsGrid from './projects/ProjectsGrid';
import ViewMoreButton from './projects/ViewMoreButton';
import FeaturedProjects from './projects/FeaturedProjects';
import { projects } from '@/data/projectsData';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  // Add additional images to projects for the slider
  useEffect(() => {
    projects.forEach(project => {
      if (!project.additionalImages) {
        // Set additional images for each project
        const additionalImagesMap: Record<number, string[]> = {
          1: ["/lovable-uploads/5c034d24-a6db-4244-87fd-c2d77198fd98.png", "/lovable-uploads/ae96836f-f532-4f21-9be2-96f9d544d0b6.png"],
          2: ["/lovable-uploads/58c56fe5-d4d3-4c32-98b2-c8d8ec49a943.png", "/lovable-uploads/09078728-35d9-4783-9d28-15947c1490bd.png"],
          3: ["/lovable-uploads/fa6d9c26-38a7-457e-bd55-4f7326a9f667.png", "/lovable-uploads/30ffc5ed-1824-406f-bc23-a5cdb81925e0.png"],
          4: ["/lovable-uploads/169db3fd-53f8-46d7-92bd-7dd911814e1b.png", "/lovable-uploads/ac5301d6-7fd5-468e-949c-dfa0ff0abcbc.png"],
          5: ["/lovable-uploads/9af9d2b5-35c1-4c39-8395-060570167bdc.png", "/lovable-uploads/a7cde80a-cb92-475a-9077-63f598e6d3c1.png"],
          6: ["/lovable-uploads/98f7be9f-b081-48e8-b7fc-107570bae7f3.png", "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png"],
        };
        
        project.additionalImages = additionalImagesMap[project.id] || [
          "/lovable-uploads/9af9d2b5-35c1-4c39-8395-060570167bdc.png",
          "/lovable-uploads/fa6d9c26-38a7-457e-bd55-4f7326a9f667.png"
        ];
      }
    });
  }, []);
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Get the count based on the currently selected filter
  const getProjectCount = () => {
    switch (filter) {
      case 'all':
        return 24;
      case 'cms-ecommerce':
        return 10;
      case 'ai-integration':
        return 4;
      case 'front-end':
        return 6;
      case 'full-stack':
        return 4;
      default:
        return filteredProjects.length;
    }
  };

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
          <ProjectsFilter onFilterChange={setFilter} />
        </Tabs>

        <div className="text-gray-300 mb-6">
          Showing {getProjectCount()} {filter === 'all' ? 'projects' : `${filter.replace('-', ' ')} projects`}
        </div>

        <ProjectsGrid projects={filteredProjects} />
        
        <ViewMoreButton />
      </div>

      {/* Featured Projects Carousel */}
      <FeaturedProjects projects={projects} />
    </section>
  );
};

export default Projects;
