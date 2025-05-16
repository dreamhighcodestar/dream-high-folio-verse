
import React from 'react';
import AnimatedImage from '../AnimatedImage';
import { EducationItem } from '@/types/experience';

interface EducationCardProps {
  education: EducationItem;
  onShowDetails: () => void;
}

const EducationCard: React.FC<EducationCardProps> = ({ education, onShowDetails }) => {
  return (
    <div 
      className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-6 md:p-8 cursor-pointer hover:bg-blue-900/30 transition-colors"
      onClick={onShowDetails}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-500/20 bg-white/5">
          <AnimatedImage 
            src={education.institutionLogo} 
            alt={education.institution}
            className="w-full h-full object-contain p-2" 
          />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-2">
            {education.degree}
          </h3>
          <p className="text-gray-300">{education.institution} ({education.period})</p>
          <p className="text-gray-400 mt-1">GPA: {education.gpa}</p>
          
          <div className="mt-4">
            <span className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <span>View Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
