
import React from 'react';
import { ExperienceItem } from '@/types/experience';

interface ExperienceTabsProps {
  experiences: ExperienceItem[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

const ExperienceTabs: React.FC<ExperienceTabsProps> = ({ 
  experiences, 
  activeTab, 
  onTabClick 
}) => {
  return (
    <div className="md:col-span-4 flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-4 md:space-x-0 md:space-y-2 pb-4 md:pb-0">
      {experiences.map((exp, index) => (
        <button
          key={index}
          onClick={() => onTabClick(index)}
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
  );
};

export default ExperienceTabs;
