
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { experiences, education } from '../data/experienceData';
import ExperienceTabs from './experience/ExperienceTabs';
import ExperienceItem from './experience/ExperienceItem';
import EducationCard from './experience/EducationCard';
import ExperienceDetailsDialog from './experience/ExperienceDetailsDialog';
import EducationDetailsDialog from './experience/EducationDetailsDialog';
import { ExperienceItem as ExperienceItemType } from '@/types/experience';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showExperienceDetails, setShowExperienceDetails] = useState(false);
  const [showEducationDetails, setShowEducationDetails] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItemType | null>(null);

  const handleShowExperienceDetails = (experience: ExperienceItemType) => {
    setSelectedExperience(experience);
    setShowExperienceDetails(true);
  };

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-b from-black/0 to-blue-900/10">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
          <span className="text-blue-500">#</span> Work Experience
        </h2>

        <div className="grid md:grid-cols-12 gap-8">
          <ExperienceTabs 
            experiences={experiences}
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />

          <div className="md:col-span-8">
            {experiences.map((exp, index) => (
              <ExperienceItem 
                key={index}
                experience={exp}
                isActive={activeTab === index}
                onShowDetails={handleShowExperienceDetails}
              />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            <span className="text-blue-500">#</span> Education
          </h2>
          <EducationCard 
            education={education}
            onShowDetails={() => setShowEducationDetails(true)}
          />
        </div>
      </div>

      {/* Experience Details Dialog */}
      <Dialog open={showExperienceDetails} onOpenChange={setShowExperienceDetails}>
        <ExperienceDetailsDialog experience={selectedExperience} />
      </Dialog>

      {/* Education Details Dialog */}
      <Dialog open={showEducationDetails} onOpenChange={setShowEducationDetails}>
        <EducationDetailsDialog education={education} />
      </Dialog>
    </section>
  );
};

export default Experience;
