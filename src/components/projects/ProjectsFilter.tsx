
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectsFilterProps {
  onFilterChange: (value: string) => void;
}

const ProjectsFilter: React.FC<ProjectsFilterProps> = ({ onFilterChange }) => {
  return (
    <TabsList className="bg-blue-900/20 border border-blue-900/40 mb-8">
      <TabsTrigger value="all">All Projects</TabsTrigger>
      <TabsTrigger value="web">Web Apps</TabsTrigger>
      <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
      <TabsTrigger value="cms">CMS</TabsTrigger>
    </TabsList>
  );
};

export default ProjectsFilter;
