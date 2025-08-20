import React from 'react';
import { Github } from 'lucide-react';

const developers = [
    {
    name: 'Amrit Kumar Yadav',
    github: 'https://github.com/DeveloperAmrit',
  },
  {
    name: 'Khushvendra Singh',
    github: 'https://github.com/1amkhush',
  },
  
  {
    name: 'Anmol Mishra',
    github: 'https://github.com/AnmolM-777',
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-8 text-fulvous"></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {developers.map((dev, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">{dev.name}</h2>
            <a
              href={dev.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-400 hover:text-white transition"
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;