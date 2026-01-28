
import React, { useState, useEffect, useMemo } from 'react';
import { MCPackage, PackageCategory } from './types';
import { INITIAL_PACKAGES } from './constants';
import PackageCard from './components/PackageCard';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [packages, setPackages] = useState<MCPackage[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeCategory, setActiveCategory] = useState<PackageCategory | 'All'>('All');
  const [username, setUsername] = useState('');

  // Initial load from persistent storage
  useEffect(() => {
    const saved = localStorage.getItem('kirps_market_packages');
    if (saved) {
      setPackages(JSON.parse(saved));
    } else {
      setPackages(INITIAL_PACKAGES);
      localStorage.setItem('kirps_market_packages', JSON.stringify(INITIAL_PACKAGES));
    }
  }, []);

  // Save to persistent storage whenever packages are updated by admin
  const savePackages = (newPackages: MCPackage[]) => {
    setPackages(newPackages);
    localStorage.setItem('kirps_market_packages', JSON.stringify(newPackages));
  };

  // Secret Admin Trigger
  const handleUsernameChange = (val: string) => {
    setUsername(val);
    if (val === 'BlaBlaHULU') {
      setShowAdmin(true);
    }
  };

  const filteredPackages = useMemo(() => {
    return packages.filter(p => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      return matchesCat;
    });
  }, [packages, activeCategory]);

  const categories: (PackageCategory | 'All')[] = ['All', 'Ranks', 'Coins', 'Keys', 'Cosmetics'];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b-4 border-black sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-900 rounded flex items-center justify-center border-2 border-black mc-button p-1">
               <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
               </svg>
            </div>
            <div>
              <h1 className="text-3xl font-minecraft text-white leading-none">KIRPS BLACK MARKET</h1>
              <p className="text-xs text-red-500 font-bold tracking-widest uppercase">The Unofficial Underground</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://discord.gg/ynW6BrhmUk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 mc-button bg-[#5865F2] hover:bg-[#4752C4] px-6 py-2 border-2 border-black transition-colors"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.076.076 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/>
              </svg>
              <span className="font-minecraft text-lg text-white">JOIN DISCORD</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-cover bg-center py-20 relative overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1587573089734-09cb9944476c?auto=format&fit=crop&q=80&w=1200)' }}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[4px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-minecraft mb-4 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)] uppercase">KIRP'S SECRET CACHE</h2>
          <p className="text-xl md:text-2xl font-minecraft text-gray-400 mb-10 tracking-widest uppercase">Direct peer-to-peer deals. No middleman.</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
             <div className="flex flex-col items-start w-72">
               <label className="text-xs font-bold text-red-500 mb-1 ml-1 uppercase">Identify Yourself</label>
               <input 
                type="text" 
                placeholder="MC Username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                className="mc-button bg-black border-2 border-red-900 px-6 py-4 font-minecraft text-2xl text-white w-full focus:outline-none focus:border-red-600 transition-colors"
               />
             </div>
             <a 
               href="https://discord.gg/ynW6BrhmUk" 
               target="_blank" 
               className="mc-button bg-red-800 hover:bg-red-700 px-12 py-4 mt-5 font-minecraft text-2xl text-white shadow-2xl flex items-center"
             >
                OPEN MARKET
             </a>
          </div>
        </div>
      </section>

      {/* Main Store Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="flex flex-col md:flex-row gap-10">
          <aside className="w-full md:w-64 space-y-8">
            <div className="mc-card p-6 border-red-900/50">
              <h3 className="text-2xl font-minecraft text-red-500 mb-4 border-b border-red-900 pb-2 uppercase tracking-tighter">Inventory</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left font-minecraft text-xl py-2 px-3 transition-all ${activeCategory === cat ? 'bg-red-900 text-white shadow-[inset_0_0_10px_black]' : 'hover:bg-red-900/20 text-gray-500'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mc-card p-6 bg-gradient-to-br from-red-900/10 to-transparent border-red-900/30">
               <h3 className="text-2xl font-minecraft text-red-400 mb-2 tracking-tighter uppercase">Market Status</h3>
               <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] text-emerald-500 font-bold font-mono">ENCRYPTED CONNECTION</span>
               </div>
               <p className="text-[10px] text-gray-600 font-mono mb-1 leading-tight">Syncing with Kirp's Private Server...</p>
               <div className="h-1.5 w-full bg-black border border-red-950 rounded-full overflow-hidden">
                 <div className="h-full bg-red-700 w-[88%]"></div>
               </div>
            </div>
          </aside>

          <div className="flex-grow">
            <div className="flex items-center justify-between mb-8 border-b-2 border-red-950 pb-4">
               <h2 className="text-4xl font-minecraft text-white uppercase tracking-wider">{activeCategory} STOCK</h2>
               <div className="text-sm text-red-900 font-minecraft">{filteredPackages.length} ASSETS LISTED</div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>

            {filteredPackages.length === 0 && (
              <div className="text-center py-32 mc-card border-dashed border-red-900 bg-transparent">
                <h3 className="text-3xl font-minecraft text-red-950 uppercase">STOCK DEPLETED</h3>
                <p className="text-gray-700 font-mono text-xs uppercase tracking-widest mt-2">Wait for the next shipment.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-red-950 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-minecraft text-red-600 mb-2">KIRPS BLACK MARKET</h3>
            <p className="text-gray-600 text-sm max-w-sm">Not an official Minecraft product. All transactions are handled through our encrypted Discord channel. Buy at your own risk.</p>
          </div>
          
          <div className="flex gap-10 text-red-900 font-minecraft text-xl uppercase tracking-widest">
            <a href="https://discord.gg/ynW6BrhmUk" target="_blank" className="hover:text-red-500 transition-colors">SUPPORT</a>
            <a href="#" className="hover:text-red-500 transition-colors">TOS</a>
            <a href="#" className="hover:text-red-500 transition-colors">VOID</a>
            <button 
              onClick={() => setShowAdmin(true)} 
              className="text-black/0 select-none cursor-default opacity-0"
            >
              ADMINKIRP
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Panel Overlay */}
      {showAdmin && (
        <AdminPanel 
          packages={packages} 
          onAddPackage={(pkg) => savePackages([pkg, ...packages])}
          onDeletePackage={(id) => savePackages(packages.filter(p => p.id !== id))}
          onClose={() => setShowAdmin(false)} 
        />
      )}
    </div>
  );
};

export default App;
