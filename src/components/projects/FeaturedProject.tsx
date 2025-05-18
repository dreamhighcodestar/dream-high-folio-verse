
import React from 'react';
import { Card } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { ProjectType } from '@/types/project';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import ProjectDetailsDialog from './ProjectDetailsDialog';

interface FeaturedProjectProps {
  project: ProjectType;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ project }) => {
  return (
    <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <Card className="overflow-hidden bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-900/40 h-64">
          <div className="relative h-full overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end">
              <div className="p-4">
                <h3 className="text-lg font-medium text-white mb-1">
                  {project.title.length > 20 ? `${project.title.substring(0, 20)}...` : project.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2 mb-3">{project.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">{project.technologies.slice(0, 3).join(", ")}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 p-1 h-auto">
                        <ExternalLink size={16} />
                      </Button>
                    </DialogTrigger>
                    <ProjectDetailsDialog project={project} />
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default FeaturedProject;
