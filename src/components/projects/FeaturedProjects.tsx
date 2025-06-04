
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import FeaturedProject from './FeaturedProject';
import { ProjectType } from '@/types/project';

interface FeaturedProjectsProps {
  projects: ProjectType[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const featuredProjects = projects.slice(0, 6);
  const [centerIndex, setCenterIndex] = useState(0);
  
  return (
    <div className="container mx-auto mt-20">
      <h3 className="text-2xl font-bold mb-8 text-white">Featured Projects</h3>
      
      <div className="relative">
        <Carousel
          opts={{ 
            align: "center", 
            loop: true,
            containScroll: "trimSnaps"
          }}
          className="w-full"
          setApi={(api) => {
            if (api) {
              api.on('select', () => {
                setCenterIndex(api.selectedScrollSnap());
              });
            }
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {featuredProjects.map((project, index) => (
              <FeaturedProject 
                key={project.id} 
                project={project} 
                isCenter={index === centerIndex}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-blue-900/50 border-blue-500/30 hover:bg-blue-800/70" />
          <CarouselNext className="right-2 bg-blue-900/50 border-blue-500/30 hover:bg-blue-800/70" />
        </Carousel>
        
        {/* Side fade overlays to make side projects barely visible */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
