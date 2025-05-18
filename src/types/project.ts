
export interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  additionalImages?: string[];
  category: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}
