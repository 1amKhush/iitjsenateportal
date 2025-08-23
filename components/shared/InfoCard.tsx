"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CardProps {
  title: string;
  imageurl: string;
}

const InfoCard: React.FC<CardProps> = ({ title, imageurl }) => {
  
  const parts = title.split(/(-|\(|\))/).map(part => part.trim()).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 h-96 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/80 flex flex-col p-6 hover:bg-gradient-to-br hover:from-slate-800/95 hover:to-slate-900/95"
    >
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

      {/* Logo Section - Much larger */}
      <div className="relative z-10 flex-shrink-0 flex justify-center items-center h-52 mb-6 p-6 bg-slate-700/30 rounded-xl group-hover:bg-slate-600/40 transition-all duration-500 border border-slate-600/30 group-hover:border-slate-500/50">
        <div className="relative w-48 h-48 group-hover:scale-105 transition-transform duration-500 ease-out">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
          <Image
            src={imageurl}
            alt={title}
            width={192}
            height={192}
            className="relative z-10 object-contain w-full h-full filter brightness-110 contrast-110 group-hover:brightness-125 transition-all duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/IITJ/logo/iitjlogo.png';
            }}
          />
        </div>
      </div>
      
      {/* Text Content - More space */}
      <div className="relative z-10 flex-1 flex flex-col justify-center text-center space-y-4">
        <div className="space-y-3">
          {parts.map((part, index) => {
            if (part === '-' || part === '(' || part === ')') return null;
            const isName = parts[index - 1] === '-';
            const isAcronym = parts[index - 1] === '(';

            if (isName || isAcronym) {
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  className="text-slate-400 group-hover:text-slate-300 font-semibold text-sm tracking-widest uppercase transition-colors duration-300"
                >
                  {part}
                </motion.div>
              );
            }

            return (
              <motion.h3 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                className="text-xl font-bold text-white group-hover:text-blue-100 leading-tight transition-colors duration-300"
              >
                {part}
              </motion.h3>
            );
          })}
        </div>
        
        {/* Enhanced decorative elements */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full opacity-40 group-hover:opacity-80 transition-all duration-500"></div>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full opacity-70 group-hover:opacity-100 group-hover:w-20 group-hover:h-1 transition-all duration-500 shadow-lg group-hover:shadow-blue-500/50"></div>
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent rounded-full opacity-40 group-hover:opacity-80 transition-all duration-500"></div>
        </div>

        {/* Subtle pulse indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-blue-500 rounded-full opacity-30 group-hover:opacity-60 animate-pulse transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-20 group-hover:opacity-50 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default InfoCard;