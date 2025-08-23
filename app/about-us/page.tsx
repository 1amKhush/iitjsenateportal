import React from "react";
import { Github } from "lucide-react";
import Image from "next/image";

const developers = [
  {
    name: "Amrit Kumar Yadav",
    github: "https://github.com/DeveloperAmrit",
    image:
      "https://412fvv95i7.ufs.sh/f/rhzgxTlEyzmMhfQnta1nwALUzhiJOrGlbjVNadHTBtuRWY12",
  },
  {
    name: "Khushvendra Singh",
    github: "https://github.com/1amkhush",
    image:
      "https://412fvv95i7.ufs.sh/f/rhzgxTlEyzmMIHNZX02rlCtyuQhRTVH8EvYWUgswfek7SDmJ",
  },
  // {
  //   name: "Anmol Mishra",
  //   github: "https://github.com/AnmolM-777",
  //   image:
  //     "",
  // },
];

const AboutUsPage = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col items-center justify-center p-10">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 tracking-tight">
        Meet Our Developers
      </h1>

      {/* Developer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-3xl">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center border border-gray-800 hover:border-amber-400 transition-all duration-300 hover:shadow-amber-500/20 hover:scale-105"
          >
            {/* Avatar */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-400 shadow-lg">
              <Image
                src={dev.image}
                alt={dev.name}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>

            {/* Name */}
            <h2 className="text-2xl font-semibold mb-4">{dev.name}</h2>

            {/* GitHub Link */}
            <a
              href={dev.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-amber-500 hover:text-white transition"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
