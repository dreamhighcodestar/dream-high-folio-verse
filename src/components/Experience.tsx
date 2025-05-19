
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { experiences } from '../data/experienceData';
import ExperienceTabs from './experience/ExperienceTabs';
import ExperienceItem from './experience/ExperienceItem';
import ExperienceDetailsDialog from './experience/ExperienceDetailsDialog';
import { ExperienceItem as ExperienceItemType } from '@/types/experience';

// Modify experience items to include different detail images if needed
experiences.forEach(exp => {
  if (!exp.details) exp.details = {};
  // Add distinct detailsImage for each experience - personal photos for details view
  if (!exp.details.detailsImage) {
    // Using personal photos for the details view
    const imageMap: Record<string, string> = {
      "Senior Full-Stack Developer": "/lovable-uploads/93b09091-b536-4f7f-9950-22149026a95d.png",
      "Full-Stack Developer – CMS & E-commerce": "/lovable-uploads/662b99c4-f9e4-47f8-b29c-5c5ab2daf70f.png",
      "Front-End Developer": "/lovable-uploads/6c1c300e-5fd1-422a-9d24-2eefcd8e9afe.png"
    };
    
    // Set a different detailsImage based on the job title or default to the original
    exp.details.detailsImage = imageMap[exp.title] || exp.image;
  }
});

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showExperienceDetails, setShowExperienceDetails] = useState(false);
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
      </div>

      {/* Experience Details Dialog */}
      <Dialog open={showExperienceDetails} onOpenChange={setShowExperienceDetails}>
        <ExperienceDetailsDialog experience={selectedExperience} />
      </Dialog>
    </section>
  );
};

export default Experience;
