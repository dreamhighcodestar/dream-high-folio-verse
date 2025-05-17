
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectsFilterProps {
  onFilterChange: (value: string) => void;
}

const ProjectsFilter: React.FC<ProjectsFilterProps> = ({ onFilterChange }) => {
  return (
    <TabsList className="bg-blue-900/20 border border-blue-900/40 mb-8">
      <TabsTrigger value="all">All Projects</TabsTrigger>
      <TabsTrigger value="cms-ecommerce">CMS & E-commerce</TabsTrigger>
      <TabsTrigger value="ai-integration">AI Integration</TabsTrigger>
      <TabsTrigger value="front-end">Front-End</TabsTrigger>
      <TabsTrigger value="full-stack">Full-Stack</TabsTrigger>
    </TabsList>
  );
};

export default ProjectsFilter;
