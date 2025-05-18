
import React from 'react';
import { Github, Linkedin, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950/30 py-8 px-6 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold text-white">
              Ivan <span className="text-blue-500">Tereshchenko</span>
            </div>
            <p className="text-gray-400 mt-1">Full-Stack Developer</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://github.com/ivantereshchenko" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/ivantereshchenko" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://t.me/ivantereshchenko" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Send className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-900/30 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ivan Tereshchenko. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
