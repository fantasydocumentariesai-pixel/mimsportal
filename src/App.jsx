import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Settings, 
  Gamepad2, 
  Ghost, 
  Puzzle, 
  Sword, 
  Trophy, 
  Zap, 
  Shield, 
  Music, 
  EyeOff, 
  LayoutGrid,
  ExternalLink,
  ChevronRight,
  Info,
  X
} from 'lucide-react';

// 1. ADD YOUR GAMES HERE
// To add a new game: add an object with id, title, category, and url.
const GAMES_DATA = [
  { id: 1, title: 'Poly Track F1', category: 'Racing', tag: 'EXTRA', color: 'bg-red-500', url: 'https://polytrack-4apk.vercel.app' },
  { id: 2, title: 'Whatsapp Channel', category: 'Extra', tag: 'EXTRA', color: 'bg-green-500', url: '#' },
  { id: 3, title: 'Link Unblocker', category: 'Extra', tag: 'NEW!', color: 'bg-blue-500', url: '#' },
  { id: 4, title: 'G*mes Form', category: 'Extra', tag: 'EXTRA', color: 'bg-yellow-500', url: '#' },
  { id: 5, title: 'Polytrack Form', category: 'Extra', tag: 'EXTRA', color: 'bg-orange-500', url: '#' },
  { id: 8, title: 'Escape Road 2', category: 'Racing', tag: 'EXTRA', color: 'bg-red-600', url: 'https://escaperoad.io/' },
  { id: 9, title: 'Highway Racer', category: 'Racing', tag: 'HOT', color: 'bg-orange-600', url: '#' },
  { id: 10, title: 'Blade Ball', category: 'Action', tag: 'HOT', color: 'bg-indigo-500', url: '#' },
  { id: 11, title: 'Minecraft 1.12', category: 'Sandbox', tag: 'EXTRA', color: 'bg-emerald-600', url: '#' },
  { id: 12, title: 'Super Mario 64', category: 'Strategy', tag: 'EXTRA', color: 'bg-red-400', url: '#' },
  { id: 13, title: 'Solar Smash', category: 'Simulation', tag: 'HOT', color: 'bg-gray-700', url: '#' },
  { id: 14, title: 'Sandbox city', category: 'Sandbox', tag: 'EXTRA', color: 'bg-teal-500', url: '#' },
  { id: 15, title: 'Five nights at Epstein\'s', category: 'Horror', tag: 'HOT', color: 'bg-black', url: '#' },
  { id: 16, title: 'Granny', category: 'Horror', tag: 'HOT', color: 'bg-neutral-800', url: '#' },
  { id: 17, title: 'Drift Hunters', category: 'Racing', tag: 'EXTRA', color: 'bg-slate-900', url: 'https://drift-hunters.com/' },
  { id: 18, title: 'Subway Surfers', category: 'Arcade', tag: 'EXTRA', color: 'bg-yellow-400', url: '#' },
  { id: 19, title: 'Balatro', category: 'Strategy', tag: 'NEW!', color: 'bg-red-700', url: '#' },
  { id: 20, title: 'Chrome Dino', category: 'Arcade', tag: 'EXTRA', color: 'bg-gray-400', url: '#' },
];

const THEMES = {
  DEFAULT: 'from-gray-900 to-black',
  CYBERPUNK: 'from-purple-900 via-blue-900 to-black',
  MATRIX: 'from-green-900 to-black',
  CRIMSON: 'from-red-900 to-black',
  ABYSS: 'from-blue-950 to-black',
  VAPORWAVE: 'from-pink-900 via-purple-900 to-indigo-900',
  GOLD: 'from-amber-900 to-black',
};

export default function App() {
  const [view, setView] = useState('splash'); // splash, landing, system, cloak, playing
  const [activeCategory, setActiveCategory] = useState('All Games');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('DEFAULT');
  const [panicUrl, setPanicUrl] = useState('https://vle.learning.moe.edu.sg');
  const [showParticles, setShowParticles] = useState(true);
  const [activeGame, setActiveGame] = useState(null);

  // Filter games based on search and category
  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All Games' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Handle Cloak (Panic Button)
  const handleCloak = () => {
    setView('cloak');
  };

  const exitCloak = () => {
    setView('system');
  };

  const handlePlayGame = (game) => {
    setActiveGame(game);
    setView('playing');
  };

  if (view === 'cloak') {
    return (
      <div className="fixed inset-0 bg-white z-[100] flex flex-col">
        <div className="flex items-center justify-between p-2 bg-gray-100 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-700 flex items-center justify-center text-white font-bold rounded">M</div>
            <span className="text-sm font-medium text-gray-800">MIMS Portal</span>
          </div>
          <button onClick={exitCloak} className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors text-gray-700">
            Exit
          </button>
        </div>
        <iframe src={panicUrl} className="flex-1 w-full border-none" title="MIMS" />
      </div>
    );
  }

  // Game Player View (Iframe Loader)
  if (view === 'playing' && activeGame) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        <div className="h-12 bg-neutral-900 border-b border-white/10 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${activeGame.color}`} />
             <span className="text-xs font-bold tracking-widest uppercase">{activeGame.title}</span>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={handleCloak} className="p-2 hover:bg-white/10 rounded-full text-neutral-400 transition-colors">
               <EyeOff size={18} />
             </button>
             <button onClick={() => setView('system')} className="p-2 hover:bg-red-500 rounded-full text-white transition-colors">
               <X size={18} />
             </button>
          </div>
        </div>
        <div className="flex-1 bg-neutral-800">
           {activeGame.url === '#' ? (
             <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <Info size={48} className="text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold">Game URL Not Found</h2>
                <p className="text-neutral-400 mt-2">You need to provide a valid link in the code for this game.</p>
                <button onClick={() => setView('system')} className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-lg">Go Back</button>
             </div>
           ) : (
             <iframe 
                src={activeGame.url} 
                className="w-full h-full border-none" 
                title={activeGame.title}
                allow="fullscreen; autoplay; encrypted-media"
             />
           )}
        </div>
      </div>
    );
  }

  if (view === 'splash') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-6 text-white font-sans">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-500">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            History Notes <LayoutGrid className="w-8 h-8" />
          </h1>
          <p className="text-neutral-400 mb-8 leading-relaxed">
            Indulge yourself in the rich history of Singapore through this comprehensive History Guide. 
            Click on any chapter to get started!
          </p>
          <button 
            onClick={() => setView('landing')}
            className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl font-semibold transition-all transform active:scale-95"
          >
            Chapter 1
          </button>
        </div>
      </div>
    );
  }

  if (view === 'landing') {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(0,1fr))] gap-4 opacity-20 pointer-events-none">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full" />
          ))}
        </div>
        
        <div className="relative z-10 text-center space-y-8 animate-in slide-in-from-bottom-8 duration-700">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.5em] text-neutral-500 uppercase">Welcome to</p>
            <h1 className="text-8xl font-black tracking-tighter">HR</h1>
            <p className="text-sm tracking-widest text-neutral-400 uppercase font-mono">History Revisions 2!</p>
          </div>

          <button 
            onClick={() => setView('system')}
            className="group relative px-10 py-4 bg-transparent border-2 border-neutral-700 rounded-full font-bold text-lg hover:border-white transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              ENTER SYSTEM <Zap className="w-5 h-5 fill-white" />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <style>{`.group:hover span { color: black !important; }`}</style>
          </button>

          <div className="pt-12">
            <p className="text-xs text-red-500 font-bold animate-pulse flex items-center justify-center gap-2">
              ⚠️ LOWER YOUR VOLUME — MUSIC IS PLAYING!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-gradient-to-br ${THEMES[theme]} text-white transition-all duration-1000`}>
      <aside className="w-64 border-r border-white/10 flex flex-col bg-black/40 backdrop-blur-md">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-black italic tracking-tighter">HR</h2>
          <p className="text-[10px] text-neutral-500 font-mono uppercase">History Revisions</p>
        </div>

        <nav className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          <div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 px-2">Discover</p>
            <SidebarItem active={activeCategory === 'All Games'} icon={<LayoutGrid size={18} />} label="All Games" onClick={() => setActiveCategory('All Games')} />
            <SidebarItem active={activeCategory === 'Extra'} icon={<Zap size={18} />} label="Extra" onClick={() => setActiveCategory('Extra')} />
          </div>

          <div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 px-2">Arcade</p>
            <SidebarItem active={activeCategory === 'Arcade'} icon={<Gamepad2 size={18} />} label="Arcade" onClick={() => setActiveCategory('Arcade')} />
            <SidebarItem active={activeCategory === 'Action'} icon={<Sword size={18} />} label="Action" onClick={() => setActiveCategory('Action')} />
            <SidebarItem active={activeCategory === 'Puzzle'} icon={<Puzzle size={18} />} label="Puzzle" onClick={() => setActiveCategory('Puzzle')} />
            <SidebarItem active={activeCategory === 'Strategy'} icon={<Shield size={18} />} label="Strategy" onClick={() => setActiveCategory('Strategy')} />
            <SidebarItem active={activeCategory === 'Sports'} icon={<Trophy size={18} />} label="Sports" onClick={() => setActiveCategory('Sports')} />
            <SidebarItem active={activeCategory === 'Horror'} icon={<Ghost size={18} />} label="Horror" onClick={() => setActiveCategory('Horror')} />
            <SidebarItem active={activeCategory === 'Racing'} icon={<Zap size={18} />} label="Racing" onClick={() => setActiveCategory('Racing')} />
          </div>

          <div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-3 px-2">System</p>
            <SidebarItem active={activeCategory === 'Settings'} icon={<Settings size={18} />} label="Settings" onClick={() => setActiveCategory('Settings')} />
          </div>
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div>
              <p className="text-xs font-bold">HR Status</p>
              <p className="text-[10px] text-neutral-500">Not Caught by the AYM</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-4 text-[10px] font-medium text-neutral-400">
             <Info size={14} /> 
             All Backups and Links In the HR Files
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-md border border-red-500/20 text-xs font-bold hover:bg-red-500/20 transition-colors">
              <Music size={14} /> MUSIC
            </button>
            <button 
              onClick={handleCloak}
              className="flex items-center gap-2 px-3 py-1.5 bg-neutral-800 text-white rounded-md border border-white/10 text-xs font-bold hover:bg-neutral-700 transition-colors"
            >
              <EyeOff size={14} /> CLOAK
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          {showParticles && <Particles theme={theme} />}

          {activeCategory === 'Settings' ? (
            <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section>
                <h1 className="text-4xl font-black mb-2">System Settings</h1>
                <p className="text-neutral-500 text-sm">Customize your arcade experience.</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                      Appearance Themes
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.keys(THEMES).map(t => (
                        <button
                          key={t}
                          onClick={() => setTheme(t)}
                          className={`px-3 py-2 text-[10px] font-bold rounded border transition-all ${
                            theme === t ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:border-white/40'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                      Cloak Settings
                    </h3>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-4">
                      <div>
                        <p className="text-xs font-bold mb-2">PANIC BUTTON URL</p>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={panicUrl}
                            onChange={(e) => setPanicUrl(e.target.value)}
                            className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-2 text-xs focus:border-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section>
                <h1 className="text-4xl font-black mb-2">Games Library</h1>
                <p className="text-neutral-500 text-sm">Explore History Revision's premium collection of unblocked games.</p>
              </section>

              <div className="relative group max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" size={18} />
                <input 
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-white/30 focus:bg-black/60 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGames.length > 0 ? (
                  filteredGames.map(game => (
                    <GameCard key={game.id} game={game} onPlay={() => handlePlayGame(game)} />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-neutral-500">
                    No games found matching "{searchQuery}" in {activeCategory}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group ${
        active ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <span className={active ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function GameCard({ game, onPlay }) {
  return (
    <div className="group relative bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1 shadow-lg flex flex-col h-full">
      <div className={`h-40 ${game.color} relative overflow-hidden flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="text-4xl font-black opacity-20 group-hover:scale-110 transition-transform">{game.title[0]}</span>
        
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-black tracking-widest text-white uppercase">
          {game.category}
        </div>
        
        {game.tag && (
          <div className="absolute top-3 right-3 bg-neutral-100 text-black px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase">
            {game.tag}
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-sm mb-4 line-clamp-1">{game.title}</h3>
        <button 
          onClick={onPlay}
          className="mt-auto w-full flex items-center justify-center gap-2 py-2 bg-neutral-800 group-hover:bg-neutral-100 group-hover:text-black rounded-lg text-xs font-black transition-all"
        >
          <Zap size={14} className="fill-current" /> PLAY NOW
        </button>
      </div>
    </div>
  );
}

function Particles({ theme }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            opacity: Math.random()
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
