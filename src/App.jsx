import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  X,
  Play,
  Menu,
  Volume2,
  VolumeX,
  ArrowLeft,
  Maximize,
  Loader2,
  Palette,
  ShieldAlert,
  Sparkles,
  Megaphone,
  Joystick,
  MonitorPlay,
  AlignJustify
} from 'lucide-react';

/**
 * APP.JSX - REFACTORED FROM LEGACY HTML
 * Includes: Theme Engine, Game Library, Cloak System, and Audio Manager.
 */

const App = () => {
  // --- State Management ---
  const [activeView, setActiveView] = useState('launcher'); // launcher, home, browse, settings, active-game
  const [theme, setTheme] = useState(localStorage.getItem('hr_theme') || 'default');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('All');
  const [isMusicMuted, setIsMusicMuted] = useState(true);
  const [cloakUrl, setCloakUrl] = useState(localStorage.getItem('hr_cloak_url') || 'vle.learning.moe.edu.sg');
  const [activeGame, setActiveGame] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(JSON.parse(localStorage.getItem('hr_particles') ?? 'true'));
  const [announcement, setAnnouncement] = useState("Welcome to History Revisions! Study hard, play harder.");

  const audioRef = useRef(null);

  // --- Theme Definitions ---
  const themes = ['default', 'cyberpunk', 'matrix', 'crimson', 'abyss', 'vaporwave', 'gold'];

  // --- Mock Games Data ---
  const GAMES = [
    { id: 1, title: "Retro Drift", cat: "Arcade", url: "https://example.com/game1" },
    { id: 2, title: "Logic Quest", cat: "Puzzle", url: "https://example.com/game2" },
    { id: 3, title: "Shadow Blade", cat: "Action", url: "https://example.com/game3" },
    { id: 4, title: "Grand Prix", cat: "Sports", url: "https://example.com/game4" },
  ];

  // --- Effects ---
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hr_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('hr_cloak_url', cloakUrl);
  }, [cloakUrl]);

  useEffect(() => {
    localStorage.setItem('hr_particles', JSON.stringify(particlesEnabled));
  }, [particlesEnabled]);

  // --- Handlers ---
  const handlePanic = () => {
    const target = cloakUrl.startsWith('http') ? cloakUrl : `https://${cloakUrl}`;
    window.location.replace(target);
  };

  const handleLaunchCloaked = () => {
    const newWin = window.open('about:blank', '_blank');
    if (newWin) {
      newWin.document.write(`<html><body style="margin:0;padding:0;"><iframe src="${window.location.href}" style="width:100%;height:100%;border:none;"></iframe></body></html>`);
      window.location.replace(`https://${cloakUrl}`);
    } else {
      alert("Popup blocked! Enable popups or 'Play Here'.");
    }
  };

  const filteredGames = useMemo(() => {
    return GAMES.filter(g => 
      (currentCategory === 'All' || g.cat === currentCategory) &&
      g.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentCategory]);

  return (
    <div className="relative min-h-screen bg-theme-bg text-theme-text font-sans overflow-hidden selection:bg-theme-accent selection:text-theme-bg">
      {/* Background Layer */}
      <div className={`fixed inset-0 z-0 bg-theme-alt transition-colors duration-500 ${particlesEnabled ? 'opacity-100' : 'opacity-20'}`}>
         {/* In a real app, you'd init your canvas logic here */}
      </div>

      {/* View: Launcher */}
      {activeView === 'launcher' && (
        <div className="relative z-20 flex flex-col items-center justify-center h-screen w-full p-6 bg-theme-bg/90 backdrop-blur-xl animate-fadeIn">
          <div className="text-center space-y-6 max-w-lg bg-theme-card p-8 md:p-12 rounded-3xl border border-theme-text/10 shadow-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-theme-accent/5 to-transparent pointer-events-none"></div>
            <h2 className="text-3xl font-bold font-sans tracking-tight">History Notes 📖</h2>
            <p className="text-theme-muted text-sm leading-relaxed">
              Indulge yourself in the rich history of Singapore through this comprehensive History Guide. 
              Click on a chapter to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 relative z-10">
              <button 
                onClick={handleLaunchCloaked}
                className="px-14 py-3 bg-theme-text text-theme-bg font-bold rounded-xl hover:scale-105 transition-all shadow-glow hover:bg-theme-accent"
              >
                Chapter 1
              </button>
              <button 
                onClick={() => setActiveView('home')}
                className="px-8 py-3 bg-theme-card text-theme-text border border-theme-text/10 rounded-xl hover:bg-theme-text/5 transition-all"
              >
                Read Online
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View: Home */}
      {activeView === 'home' && (
        <div className="relative z-10 flex flex-col items-center justify-center h-screen w-full animate-float">
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <p className="text-theme-muted tracking-[0.5em] text-sm font-bold uppercase">Welcome to</p>
              <h1 className="text-6xl md:text-9xl font-retro drop-shadow-glow">HR</h1>
              <p className="text-theme-muted text-lg tracking-widest border-y border-theme-text/10 py-2 mt-4 inline-block">
                HISTORY REVISIONS 2!
              </p>
            </div>
            <div className="pt-8">
              <button 
                onClick={() => setActiveView('browse')}
                className="group relative px-12 py-6 bg-theme-text/5 backdrop-blur-sm border border-theme-text/10 rounded-full overflow-hidden transition-all hover:bg-theme-text/10 hover:shadow-glow-lg hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-xl tracking-widest">ENTER SYSTEM</span>
                  <div className="bg-theme-text text-theme-bg rounded-full p-1">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View: Library / Settings / Active Game (Sidebar Layout) */}
      {(activeView === 'browse' || activeView === 'settings' || activeView === 'active-game') && (
        <div className="flex h-screen w-full absolute inset-0">
          {/* Sidebar */}
          <aside className={`fixed md:relative z-50 h-full w-64 flex flex-col transition-transform duration-300 border-r border-theme-text/5 bg-theme-alt/80 backdrop-blur-xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="p-6">
              <h1 className="font-retro text-2xl drop-shadow-glow">HR</h1>
              <p className="text-xs text-theme-muted tracking-widest uppercase">History Revisions</p>
            </div>
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
              <div className="text-xs font-semibold text-theme-muted mb-2 px-4 uppercase tracking-wider">Discover</div>
              {[
                { label: 'All Games', icon: LayoutGrid, cat: 'All' },
                { label: 'Arcade', icon: Joystick, cat: 'Arcade' },
                { label: 'Action', icon: Sword, cat: 'Action' },
                { label: 'Puzzle', icon: Puzzle, cat: 'Puzzle' },
                { label: 'Strategy', icon: MonitorPlay, cat: 'Strategy' }
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => { setActiveView('browse'); setCurrentCategory(item.cat); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${currentCategory === item.cat && activeView === 'browse' ? 'bg-theme-text/10 text-theme-text shadow-glow' : 'text-theme-muted hover:bg-theme-text/5'}`}
                >
                  <item.icon className="w-5 h-5" /> {item.label}
                </button>
              ))}
              <div className="mt-8 text-xs font-semibold text-theme-muted mb-2 px-4 uppercase tracking-wider">System</div>
              <button 
                onClick={() => { setActiveView('settings'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeView === 'settings' ? 'bg-theme-text/10 text-theme-text' : 'text-theme-muted hover:bg-theme-text/5'}`}
              >
                <Settings className="w-5 h-5" /> Settings
              </button>
            </nav>
            <div className="p-4 border-t border-theme-text/5">
              <div className="bg-theme-card/40 p-4 rounded-xl border border-theme-text/5 backdrop-blur-md">
                <h4 className="font-bold text-sm mb-1">HR Status</h4>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-theme-accent opacity-75"></span>
                    <span className="relative h-2 w-2 rounded-full bg-theme-accent"></span>
                  </span>
                  <span className="text-[10px] text-theme-muted">UNDETECTED</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-full w-full relative z-10 overflow-hidden">
            <header className="h-20 flex items-center justify-between px-6 z-50">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-theme-muted bg-theme-card/50 rounded-lg border border-theme-text/10">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4 ml-auto">
                <button 
                  onClick={() => setIsMusicMuted(!isMusicMuted)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-theme-card/50 text-theme-muted rounded-lg border border-theme-text/20 backdrop-blur-md transition-all"
                >
                  {isMusicMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-theme-accent" />}
                  <span className="text-xs font-bold hidden sm:inline">{isMusicMuted ? 'MUTED' : 'MUSIC'}</span>
                </button>
                <button 
                  onClick={handlePanic}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-900/20 text-red-400 rounded-lg border border-red-500/20 backdrop-blur-md hover:bg-red-900/40"
                >
                  <EyeOff className="w-4 h-4" />
                  <span className="text-xs font-bold hidden sm:inline">CLOAK</span>
                </button>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
              {/* Announcement */}
              <div className="mb-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4 bg-theme-accent/10 border border-theme-accent/30 text-theme-accent px-6 py-4 rounded-2xl">
                  <Megaphone className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-semibold">{announcement}</span>
                </div>
              </div>

              {/* Browse View */}
              {activeView === 'browse' && (
                <div className="max-w-7xl mx-auto animate-fadeIn">
                  <div className="text-center py-8">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-glow">Games Library</h1>
                    <div className="relative max-w-xl mx-auto group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Search games..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-theme-card/90 border border-theme-text/20 rounded-full py-4 pl-12 pr-6 outline-none focus:ring-1 focus:ring-theme-accent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {filteredGames.map(game => (
                      <div 
                        key={game.id} 
                        onClick={() => { setActiveGame(game); setActiveView('active-game'); }}
                        className="group bg-theme-card border border-theme-text/10 p-4 rounded-2xl hover:border-theme-accent/50 transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        <div className="aspect-video bg-theme-alt rounded-lg mb-4 flex items-center justify-center">
                          <Gamepad2 className="w-12 h-12 text-theme-muted group-hover:text-theme-accent transition-colors" />
                        </div>
                        <h3 className="font-bold">{game.title}</h3>
                        <p className="text-xs text-theme-muted">{game.cat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Game View */}
              {activeView === 'active-game' && activeGame && (
                <div className="h-full flex flex-col animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setActiveView('browse')} className="flex items-center gap-2 text-theme-muted hover:text-theme-text bg-theme-text/5 px-4 py-2 rounded-xl border border-theme-text/10">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <h2 className="font-bold text-xl">{activeGame.title}</h2>
                    <button className="p-2 text-theme-muted hover:text-theme-text"><Maximize className="w-5 h-5" /></button>
                  </div>
                  <div className="flex-1 bg-black rounded-2xl overflow-hidden border border-theme-text/10 relative shadow-glow-lg">
                    <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 bg-theme-alt">
                      <Loader2 className="w-10 h-10 animate-spin text-theme-accent mb-2" />
                      <span className="font-retro text-[10px] text-theme-muted">LOADING CARTRIDGE...</span>
                    </div>
                    <iframe src={activeGame.url} className="w-full h-full border-none" title="game-frame" />
                  </div>
                </div>
              )}

              {/* Settings View */}
              {activeView === 'settings' && (
                <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
                  <h1 className="text-4xl font-bold text-center mb-8">System Settings</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-theme-card border border-theme-text/10 p-6 rounded-2xl">
                      <h3 className="flex items-center gap-2 font-bold mb-4 border-b border-theme-text/5 pb-2">
                        <Palette className="w-5 h-5 text-theme-accent" /> Themes
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {themes.map(t => (
                          <button 
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`py-2 px-4 rounded-lg border text-xs font-bold uppercase transition-all ${theme === t ? 'bg-theme-accent text-theme-bg border-theme-accent' : 'bg-theme-bg border-theme-text/10 hover:border-theme-accent'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-theme-card border border-theme-text/10 p-6 rounded-2xl space-y-6">
                      <div>
                        <h3 className="flex items-center gap-2 font-bold mb-4 border-b border-theme-text/5 pb-2">
                          <ShieldAlert className="w-5 h-5 text-red-500" /> Cloak
                        </h3>
                        <input 
                          type="text" 
                          value={cloakUrl}
                          onChange={(e) => setCloakUrl(e.target.value)}
                          className="w-full bg-theme-bg border border-theme-text/10 rounded-xl px-4 py-3 text-sm focus:border-theme-accent outline-none"
                          placeholder="e.g. google.com"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-sm">Background Particles</p>
                          <p className="text-xs text-theme-muted">Toggle visual effects</p>
                        </div>
                        <button 
                          onClick={() => setParticlesEnabled(!particlesEnabled)}
                          className={`w-12 h-6 rounded-full transition-colors relative ${particlesEnabled ? 'bg-theme-accent' : 'bg-theme-text/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${particlesEnabled ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* Tailwind & CSS Variables Logic */}
      <style>{`
        :root, [data-theme="default"] { --theme-bg: 0 0 0; --theme-alt: 9 9 11; --theme-card: 24 24 27; --theme-text: 255 255 255; --theme-muted: 161 161 170; --theme-accent: 255 255 255; }
        [data-theme="cyberpunk"] { --theme-bg: 5 0 20; --theme-alt: 10 0 38; --theme-card: 25 5 70; --theme-text: 0 255 204; --theme-muted: 179 102 255; --theme-accent: 255 0 255; }
        [data-theme="matrix"] { --theme-bg: 0 5 0; --theme-alt: 0 15 0; --theme-card: 0 30 0; --theme-text: 0 255 0; --theme-muted: 0 170 0; --theme-accent: 0 255 0; }
        [data-theme="crimson"] { --theme-bg: 10 0 0; --theme-alt: 20 0 0; --theme-card: 35 0 0; --theme-text: 255 200 200; --theme-muted: 255 100 100; --theme-accent: 255 0 0; }
        
        .bg-theme-bg { background-color: rgb(var(--theme-bg)); }
        .bg-theme-alt { background-color: rgb(var(--theme-alt)); }
        .bg-theme-card { background-color: rgb(var(--theme-card)); }
        .text-theme-text { color: rgb(var(--theme-text)); }
        .text-theme-muted { color: rgb(var(--theme-muted)); }
        .text-theme-accent { color: rgb(var(--theme-accent)); }
        .border-theme-accent { border-color: rgb(var(--theme-accent)); }
        .shadow-glow { box-shadow: 0 0 15px rgba(var(--theme-accent), 0.3); }
        .font-retro { font-family: 'Press Start 2P', cursive; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default App;
