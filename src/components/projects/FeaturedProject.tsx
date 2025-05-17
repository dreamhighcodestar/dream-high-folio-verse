
import React from 'react';
import { Card } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { ProjectType } from '@/types/project';

interface FeaturedProjectProps {
  project: ProjectType;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  return (
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
  );
};

export default FeaturedProject;
