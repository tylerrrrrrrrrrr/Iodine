
import React from 'react';
import { MCPackage } from '../types';

interface PackageCardProps {
  pkg: MCPackage;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  const handleAcquire = () => {
    window.open('https://discord.gg/ynW6BrhmUk', '_blank');
  };

  return (
    <div className="mc-card p-4 flex flex-col h-full transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(153,27,27,0.2)] group">
      <div className="relative mb-4 overflow-hidden border-2 border-black rounded shadow-[0_4px_0_black]">
        <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
        <span className="absolute top-2 right-2 bg-red-900 text-white px-2 py-1 text-[10px] font-bold border border-black uppercase font-minecraft">
          {pkg.category}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-2 font-minecraft text-white group-hover:text-red-500 transition-colors uppercase tracking-tighter">{pkg.name}</h3>
      <p className="text-gray-500 text-xs mb-4 flex-grow line-clamp-3 font-mono leading-relaxed">{pkg.description}</p>
      
      <div className="space-y-1 mb-6">
        {pkg.features.slice(0, 3).map((f, i) => (
          <div key={i} className="flex items-center text-[10px] text-gray-500 uppercase tracking-tighter font-mono">
            <span className="text-red-900 mr-2">»</span>
            {f}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-red-950">
        <span className="text-2xl font-bold text-red-600 font-minecraft tracking-widest">${pkg.price.toFixed(2)}</span>
        <button
          onClick={handleAcquire}
          className="mc-button bg-red-900 hover:bg-red-800 active:bg-red-950 text-white px-5 py-2 font-minecraft text-xl uppercase"
        >
          ACQUIRE
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
