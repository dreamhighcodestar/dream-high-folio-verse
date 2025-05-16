
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Globe, Layers } from 'lucide-react';
import { ProjectType } from '@/types/project';

interface ProjectCardProps {
  project: ProjectType;
  isAnimated: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isAnimated }) => {
  return (
    <div 
      className={`transform transition-all duration-700 ${
        isAnimated 
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
  );
};

export default ProjectCard;
