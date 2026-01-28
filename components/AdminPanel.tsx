
import React, { useState } from 'react';
import { MCPackage, PackageCategory } from '../types';
import { generatePackageDescription } from '../services/geminiService';

interface AdminPanelProps {
  packages: MCPackage[];
  onAddPackage: (pkg: MCPackage) => void;
  onDeletePackage: (id: string) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ packages, onAddPackage, onDeletePackage, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Ranks' as PackageCategory,
    image: 'https://picsum.photos/seed/' + Math.random() + '/400/300'
  });

  const handleGenerate = async () => {
    if (!formData.name) return alert("Please enter a package name first!");
    setIsGenerating(true);
    const data = await generatePackageDescription(formData.name, formData.category);
    
    const newPkg: MCPackage = {
      id: Date.now().toString(),
      name: formData.name,
      description: data.description,
      price: parseFloat(formData.price) || 0,
      category: formData.category,
      image: formData.image,
      features: data.features
    };

    onAddPackage(newPkg);
    setFormData({ name: '', price: '', category: 'Ranks', image: 'https://picsum.photos/seed/' + Math.random() + '/400/300' });
    setIsGenerating(false);
  };

  const copyDeploymentCode = () => {
    const code = JSON.stringify(packages, null, 2);
    navigator.clipboard.writeText(code);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 md:p-10 flex flex-col border-4 border-red-600 m-2 rounded-lg shadow-[0_0_100px_rgba(220,38,38,0.2)]">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold font-minecraft text-red-600 tracking-tighter uppercase leading-none">BLACK MARKET OVERSEER</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Authorized Access: Kirp Admin</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={copyDeploymentCode}
            className={`mc-button ${copyFeedback ? 'bg-emerald-600' : 'bg-blue-800'} px-6 py-3 font-minecraft text-xl text-white transition-colors`}
          >
            {copyFeedback ? 'COPIED TO CLIPBOARD!' : 'GENERATE DEPLOYMENT CODE'}
          </button>
          <button onClick={onClose} className="mc-button bg-red-800 hover:bg-red-700 px-8 py-3 font-minecraft text-2xl text-white">DISCONNECT</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 flex-grow overflow-hidden">
        {/* ADD NEW PACKAGE */}
        <div className="mc-card p-8 flex flex-col h-full bg-[#080808] border-red-900/40">
          <h2 className="text-3xl font-minecraft mb-8 text-red-500 uppercase tracking-widest border-b border-red-950 pb-2">List New Asset</h2>
          <div className="space-y-6 flex-grow overflow-y-auto pr-4 custom-scrollbar">
            <div>
              <label className="block text-[10px] font-bold text-red-900 uppercase mb-2 font-mono">Item Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black border-2 border-red-950 p-3 rounded font-minecraft text-xl text-red-500 focus:outline-none focus:border-red-600 transition-all"
                placeholder="VIP Rank, 1000 Gold..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-red-900 uppercase mb-2 font-mono">Value ($)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-black border-2 border-red-950 p-3 rounded font-minecraft text-xl text-red-500 focus:outline-none focus:border-red-600"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-red-900 uppercase mb-2 font-mono">Asset Class</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as PackageCategory })}
                  className="w-full bg-black border-2 border-red-950 p-3 rounded font-minecraft text-xl text-red-500 focus:outline-none"
                >
                  <option value="Ranks">Ranks</option>
                  <option value="Coins">Coins</option>
                  <option value="Keys">Keys</option>
                  <option value="Cosmetics">Cosmetics</option>
                </select>
              </div>
            </div>
            
            <div className="pt-6">
              <button
                disabled={isGenerating}
                onClick={handleGenerate}
                className={`w-full mc-button ${isGenerating ? 'bg-gray-800 cursor-not-allowed text-gray-500' : 'bg-red-900 hover:bg-red-800 text-white'} py-5 font-minecraft text-2xl uppercase transition-all shadow-[0_0_30px_rgba(153,27,27,0.3)]`}
              >
                {isGenerating ? 'GENERATE SPECS...' : 'CONFIRM LISTING'}
              </button>
              <p className="text-[10px] text-gray-600 font-mono mt-4 uppercase text-center">Note: AI will generate professional descriptions and features automatically.</p>
            </div>
          </div>
        </div>

        {/* CURRENT PACKAGES LIST */}
        <div className="mc-card p-8 flex flex-col h-full bg-[#080808] border-red-900/40">
          <div className="flex justify-between items-end mb-8 border-b border-red-950 pb-2">
            <h2 className="text-3xl font-minecraft text-red-500 uppercase tracking-widest">Active Stock</h2>
            <span className="text-[10px] text-gray-600 font-mono mb-1">{packages.length} ITEMS TOTAL</span>
          </div>
          <div className="overflow-y-auto flex-grow space-y-4 pr-4 custom-scrollbar">
            {packages.map((pkg) => (
              <div key={pkg.id} className="flex items-center justify-between p-4 bg-black border border-red-950 group hover:border-red-700 transition-all">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img src={pkg.image} className="w-14 h-14 object-cover border border-black grayscale group-hover:grayscale-0 transition-all" />
                    <div className="absolute inset-0 bg-red-900/10 group-hover:bg-transparent"></div>
                  </div>
                  <div>
                    <h4 className="font-minecraft text-xl text-white leading-none mb-1 group-hover:text-red-500 transition-colors uppercase">{pkg.name}</h4>
                    <span className="text-[10px] font-mono text-red-950 uppercase tracking-widest">{pkg.category} // ${pkg.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if(confirm(`Are you sure you want to REDACT "${pkg.name}"? (This will update your local stock immediately)`)) {
                      onDeletePackage(pkg.id);
                    }
                  }}
                  className="text-red-950 hover:text-red-600 font-minecraft text-xl px-4 py-2 border border-transparent hover:border-red-900 hover:bg-red-900/10 transition-all uppercase"
                >
                  [REDACT]
                </button>
              </div>
            ))}
            {packages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <p className="font-minecraft text-2xl text-gray-500">NO ACTIVE STOCK</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-red-950/20 border border-red-900/30 rounded text-center">
        <p className="text-xs text-red-400 font-mono uppercase tracking-widest">
          To publish these changes to everyone, click "Generate Deployment Code" and send the text to your developer/AI assistant.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
