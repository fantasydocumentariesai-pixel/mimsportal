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
  Menu,
  Volume2,
  VolumeX,
  Play,
  ArrowLeft,
  Maximize,
  Palette,
  ShieldAlert,
  Sparkles,
  Megaphone,
  Loader2
} from 'lucide-react';

export default function App() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const [currentView, setCurrentView] = useState('launcher'); // launcher, home, browse, settings, game
  const [currentCategory, setCurrentCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRainbowActive, setIsRainbowActive] = useState(false);

  // Settings state (hydrated from LocalStorage)
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('dray_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.cloakUrl === 'https://classroom.google.com') {
          parsed.cloakUrl = 'https://vle.learning.moe.edu.sg';
        }
        return {
          theme: parsed.theme || 'default',
          cloakUrl: parsed.cloakUrl || 'https://vle.learning.moe.edu.sg',
          particles: parsed.particles !== undefined ? parsed.particles : true
        };
      } catch (e) {
        // Fallback below
      }
    }
    return {
      theme: 'default',
      cloakUrl: 'https://vle.learning.moe.edu.sg',
      particles: true
    };
  });

  // Music & Database States
  const [musicMuted, setMusicMuted] = useState(true);
  const [musicShouldPlay, setMusicShouldPlay] = useState(false);
  const [currentTrackFile, setCurrentTrackFile] = useState(null);
  const [announcement, setAnnouncement] = useState('Welcome back to the System!');
  const [activeGame, setActiveGame] = useState(null);

  // Audio Reference
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const themesList = ['default', 'cyberpunk', 'matrix', 'crimson', 'abyss', 'vaporwave', 'gold'];

  // Mock database or template values for Games
  const gamesData = useMemo(() => [
    { id: '1', title: 'Retro Racer', category: 'Arcade', description: 'Classic high-speed racing simulation.', url: 'https://example.com/game1' },
    { id: '2', title: 'Shadow Blade', category: 'Action', description: 'Fast-paced platformer action combat.', url: 'https://example.com/game2' },
    { id: '3', title: 'Neon Blocks', category: 'Puzzle', description: 'Deconstruct complex geometric block puzzles.', url: 'https://example.com/game3' },
    { id: '4', title: 'Grand Conquest', category: 'Strategy', description: 'Turn-based empire management and war tactics.', url: 'https://example.com/game4' },
    { id: '5', title: 'Pixel Pitch', category: 'Sports', description: 'Retro 8-bit soccer arcade matches.', url: 'https://example.com/game5' },
    { id: '6', title: 'Hyperspace Jump', category: 'Extra', description: 'Bonus cosmic arcade test runner.', url: 'https://example.com/game6' },
  ], []);

  const tracksList = useMemo(() => [
    { name: "Let The World Burn", file: "lettheworldburn.mp3" },
    { name: "Heavenly Jumpstyle",  file: "heavenjump.mp3" },
    { name: "Tiki Tiki",           file: "tikitiki.mp3" },
    { name: "Ronaldo Phonk",       file: "nobatido.mp3" },
    { name: "IBFF",                file: "ibff.mp3" }
  ], []);

  // ==========================================
  // SIDE EFFECTS
  // ==========================================
  
  // Theme styling configurations injected directly to document body attributes
  useEffect(() => {
    document.body.setAttribute('data-theme', settings.theme);
    localStorage.setItem('dray_settings', JSON.stringify(settings));
  }, [settings]);

  // Check Cloak state on initialize
  useEffect(() => {
    const isCloaked = window.location.href === 'about:blank' || 
                      window.location.href === 'about:srcdoc' || 
                      localStorage.getItem('hr_safer_alt_used') === '1';
    
    localStorage.removeItem('hr_safer_alt_used');
    
    if (isCloaked) {
      setCurrentView('home');
      setMusicShouldPlay(true);
      if (tracksList.length > 0) {
        setCurrentTrackFile(tracksList[0].file);
      }
    } else {
      setMusicShouldPlay(false);
      setCurrentView('launcher');
    }
  }, [tracksList]);

  // Handle Music playing states
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (musicShouldPlay && currentTrackFile && !musicMuted) {
      audioRef.current.src = currentTrackFile;
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [musicShouldPlay, currentTrackFile, musicMuted]);

  // Interactive Background Canvas Handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle Array Setup
    const particlesArray = [];
    if (settings.particles) {
      for (let i = 0; i < 40; i++) {
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (settings.particles) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        particlesArray.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [settings.particles]);

  // ==========================================
  // EVENT FUNCTIONS
  // ==========================================
  const playDing = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046, ctx.currentTime);
      osc.frequency.setValueAtTime(1318, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.2);
    } catch(e) {}
  };

  const handleLaunchCloaked = () => {
    localStorage.setItem('hr_safer_alt_used', '1');
    let newWin = window.open('about:blank', '_blank');
    if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
      alert("Popup blocked! Please allow popups for this site, or just click into the system directly.");
    } else {
      newWin.document.open();
      newWin.document.write(`<!DOCTYPE html><html>${document.documentElement.innerHTML}</html>`);
      newWin.document.close();
      window.location.replace(settings.cloakUrl || 'https://vle.learning.moe.edu.sg');
    }
  };

  const handleCloakPanic = () => {
    window.location.replace(settings.cloakUrl || 'https://vle.learning.moe.edu.sg');
  };

  const handleSaveCloak = (urlValue) => {
    let cleanUrl = urlValue.trim() || 'https://vle.learning.moe.edu.sg';
    if(!cleanUrl.startsWith('http')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    setSettings(prev => ({ ...prev, cloakUrl: cleanUrl }));
    playDing();
  };

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  // Filter games matching query and categories
  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesCat = currentCategory === 'All' || game.category === currentCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [gamesData, currentCategory, searchQuery]);

  return (
    <div className={`relative overflow-hidden font-sans select-none w-full h-screen bg-theme-bg text-theme-text ${isRainbowActive ? 'rainbow-active' : ''}`}>
      
      {/* Interactive Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-theme-alt transition-colors duration-500" />

      {/* Embedded Dynamic App Themes CSS Overrides */}
      <style>{`
        :root, [data-theme="default"] {
          --theme-bg: 0 0 0;
          --theme-alt: 9 9 11;
          --theme-card: 24 24 27;
          --theme-text: 255 255 255;
          --theme-muted: 161 161 170;
          --theme-accent: 255 255 255;
        }
        [data-theme="cyberpunk"] {
          --theme-bg: 5 0 20;
          --theme-alt: 10 0 38;
          --theme-card: 25 5 70;
          --theme-text: 0 255 204;
          --theme-muted: 179 102 255;
          --theme-accent: 255 0 255;
        }
        [data-theme="matrix"] {
          --theme-bg: 0 5 0;
          --theme-alt: 0 15 0;
          --theme-card: 0 30 0;
          --theme-text: 0 255 0;
          --theme-muted: 0 170 0;
          --theme-accent: 0 255 0;
        }
        [data-theme="crimson"] {
          --theme-bg: 10 0 0;
          --theme-alt: 20 0 0;
          --theme-card: 35 0 0;
          --theme-text: 255 200 200;
          --theme-muted: 255 100 100;
          --theme-accent: 255 0 0;
        }
        [data-theme="abyss"] {
          --theme-bg: 0 5 15;
          --theme-alt: 0 10 30;
          --theme-card: 0 25 60;
          --theme-text: 150 200 255;
          --theme-muted: 100 150 200;
          --theme-accent: 0 150 255;
        }
        [data-theme="vaporwave"] {
          --theme-bg: 20 0 30;
          --theme-alt: 35 10 50;
          --theme-card: 55 20 80;
          --theme-text: 255 150 255;
          --theme-muted: 150 200 255;
          --theme-accent: 0 255 255;
        }
        [data-theme="gold"] {
          --theme-bg: 10 10 5;
          --theme-alt: 20 20 10;
          --theme-card: 35 30 15;
          --theme-text: 255 215 0;
          --theme-muted: 200 180 100;
          --theme-accent: 255 180 0;
        }
        @keyframes rainbow-nuke {
          0% { filter: hue-rotate(0deg) saturate(200%); }
          50% { filter: hue-rotate(180deg) saturate(500%); }
          100% { filter: hue-rotate(360deg) saturate(200%); }
        }
        .rainbow-active {
          animation: rainbow-nuke 2s linear infinite !important;
        }
        .bg-theme-bg { background-color: rgb(var(--theme-bg)); }
        .bg-theme-alt { background-color: rgb(var(--theme-alt)); }
        .bg-theme-card { background-color: rgb(var(--theme-card)); }
        .text-theme-text { color: rgb(var(--theme-text)); }
        .text-theme-muted { color: rgb(var(--theme-muted)); }
        .text-theme-accent { color: rgb(var(--theme-accent)); }
        .border-theme-text\\/10 { border-color: rgba(var(--theme-text), 0.1); }
        .border-theme-text\\/20 { border-color: rgba(var(--theme-text), 0.2); }
        .border-theme-accent { border-color: rgb(var(--theme-accent)); }
        .shadow-glow { box-shadow: 0 0 20px rgba(var(--theme-accent), 0.2); }
        .shadow-glow-lg { box-shadow: 0 0 40px rgba(var(--theme-accent), 0.4); }
        .font-retro { font-family: 'Press Start 2P', cursive; }
      `}</style>

      {/* Main Container */}
      <div className="relative z-10 h-full w-full">

        {/* ==================== 1. LAUNCHER / CLOAK CHECK VIEW ==================== */}
        {currentView === 'launcher' && (
          <div className="flex flex-col items-center justify-center h-full w-full relative z-20 p-6 bg-theme-bg/90 backdrop-blur-xl">
            <div className="text-center space-y-6 max-w-lg bg-theme-card p-8 md:p-12 rounded-3xl border border-theme-text/10 shadow-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-theme-accent/5 to-transparent pointer-events-none"></div>
              
              <h2 className="text-3xl font-bold text-theme-text tracking-tight">History Notes📖</h2>
              <p className="text-theme-muted text-sm leading-relaxed">
                Indulge yourself in the rich history of Singapore through this comprehensive History Guide. Click on any chapter to get started!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 relative z-10">
                <button 
                  onClick={handleLaunchCloaked}
                  className="px-14 py-3 bg-theme-text text-theme-bg font-bold rounded-xl hover:scale-105 transition-all shadow-glow hover:bg-theme-accent"
                >
                  Chapter 1
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('home');
                    setMusicShouldPlay(true);
                    if (tracksList.length > 0) setCurrentTrackFile(tracksList[0].file);
                  }}
                  className="px-6 py-3 bg-theme-text/10 text-theme-text font-bold rounded-xl hover:bg-theme-text/20 transition-all border border-theme-text/10"
                >
                  Play Here
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. HOME VIEW ==================== */}
        {currentView === 'home' && (
          <div className="flex flex-col items-center justify-center h-full w-full relative z-10 p-6">
            <div className="text-center space-y-8 animate-[bounce_6s_ease-in-out_infinite]">
              <div className="space-y-2">
                <p className="text-theme-muted tracking-[0.5em] text-sm font-bold uppercase">Welcome to</p>
                <h1 className="text-6xl md:text-9xl font-retro text-theme-text drop-shadow-md">
                  HR
                </h1>
                <p className="text-theme-muted font-sans text-lg md:text-xl tracking-widest border-t border-b border-theme-text/10 py-2 mt-4 inline-block">
                  HISTORY REVISIONS 2!
                </p>
              </div>

              <div className="pt-8">
                <button 
                  onClick={() => { playDing(); setCurrentView('browse'); }}
                  className="group relative px-12 py-6 bg-theme-text/5 backdrop-blur-sm border border-theme-text/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-theme-text/10 hover:border-theme-text/30 hover:shadow-glow-lg hover:scale-105 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-theme-text/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-xl text-theme-text tracking-widest">ENTER SYSTEM</span>
                    <div className="bg-theme-text text-theme-bg rounded-full p-1">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                </button>
              </div>
              <p className="mt-5 text-xs font-bold tracking-widest animate-pulse text-red-600">
                ⚠ LOWER YOUR VOLUME — MUSIC IS PLAYING!
              </p>
            </div>
            <div className="absolute bottom-8 text-center text-theme-muted text-xs opacity-50">
              <p>PEAK NONCHALANCE • V 1.0.0</p>
            </div>
          </div>
        )}

        {/* ==================== MAIN WORKSPACE APPS (Sidebar Content Ecosystem) ==================== */}
        {['browse', 'settings', 'game'].includes(currentView) && (
          <div className="flex h-full w-full absolute inset-0">
            
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div 
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-theme-bg/80 z-40 md:hidden backdrop-blur-md"
              />
            )}

            {/* Sidebar component */}
            <aside className={`fixed md:relative z-50 h-full w-64 flex flex-col transition-transform duration-300 transform bg-theme-alt border-r border-theme-text/5 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
              <div className="relative z-10 flex flex-col h-full">
                <div className="p-6">
                  <h1 className="font-retro text-2xl text-theme-text">HR</h1>
                  <p className="text-xs text-theme-muted mt-1 tracking-widest uppercase">History Revisions</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                  <div className="text-xs font-semibold text-theme-muted mb-2 px-4 uppercase tracking-wider">Discover</div>
                  
                  {[
                    { cat: 'All', icon: LayoutGrid, label: 'All Games' },
                    { cat: 'Extra', icon: Info, label: 'Extra' },
                    { cat: 'Arcade', icon: Gamepad2, label: 'Arcade' },
                    { cat: 'Action', icon: Sword, label: 'Action' },
                    { cat: 'Puzzle', icon: Puzzle, label: 'Puzzle' },
                    { cat: 'Strategy', icon: Zap, label: 'Strategy' },
                    { cat: 'Sports', icon: Trophy, label: 'Sports' }
                  ].map(tab => {
                    const IconComp = tab.icon;
                    const isActive = currentView === 'browse' && currentCategory === tab.cat;
                    return (
                      <button 
                        key={tab.cat}
                        onClick={() => {
                          setCurrentCategory(tab.cat);
                          setCurrentView('browse');
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                          isActive 
                            ? 'bg-theme-text/10 text-theme-text shadow-glow border-theme-text/10 translate-x-1' 
                            : 'text-theme-muted hover:bg-theme-text/5 hover:text-theme-text hover:translate-x-1 border-transparent'
                        }`}
                      >
                        <IconComp className="w-5 h-5" /> {tab.label}
                      </button>
                    );
                  })}

                  <div className="mt-8 text-xs font-semibold text-theme-muted mb-2 px-4 uppercase tracking-wider">System</div>
                  <button 
                    onClick={() => { setCurrentView('settings'); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      currentView === 'settings' 
                        ? 'bg-theme-text/10 text-theme-text shadow-glow border-theme-text/10 translate-x-1' 
                        : 'text-theme-muted hover:bg-theme-text/5 hover:text-theme-text hover:translate-x-1 border-transparent'
                    }`}
                  >
                    <Settings className="w-5 h-5" /> Settings
                  </button>
                </nav>

                <div className="p-4 border-t border-theme-text/5">
                  <div className="bg-theme-card/40 p-4 rounded-xl border border-theme-text/5 backdrop-blur-md">
                    <h4 className="text-theme-text font-bold text-sm mb-1">HR's Status</h4>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-theme-accent"></span>
                      </span>
                      <span className="text-xs text-theme-muted">Not Caught by the AYM</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full w-full relative z-10">
              
              {/* Header inside Workspace */}
              <header className="h-20 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="absolute inset-0 bg-gradient-to-b from-theme-bg/90 to-transparent backdrop-blur-[2px] pointer-events-none"></div>

                <div className="flex items-center gap-4 flex-1 z-10">
                  <button 
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden p-2 text-theme-muted hover:text-theme-text bg-theme-card/50 backdrop-blur-md rounded-lg border border-theme-text/10 transition-colors"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-4 z-10">
                  <button 
                    onClick={() => setMusicMuted(!musicMuted)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all duration-300 ${
                      !musicMuted 
                        ? 'text-theme-accent border-theme-accent/30 bg-theme-text/10' 
                        : 'bg-theme-card/50 text-theme-muted border-theme-text/20 hover:text-theme-text'
                    }`}
                    title="Toggle Music"
                  >
                    {musicMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span className="text-xs font-bold hidden sm:inline">{musicMuted ? 'MUTED' : 'MUSIC'}</span>
                  </button>
                  
                  <button 
                    onClick={handleCloakPanic}
                    className="group flex items-center gap-2 px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-200 rounded-lg border border-red-500/20 backdrop-blur-md transition-all duration-300 hover:shadow-glow-lg"
                    title="Panic Button"
                  >
                    <EyeOff className="w-4 h-4" />
                    <span className="text-xs font-bold hidden sm:inline">CLOAK</span>
                  </button>

                  <div 
                    onClick={() => setIsRainbowActive(!isRainbowActive)}
                    className="h-9 w-9 rounded-full bg-gradient-to-b from-theme-card to-theme-bg flex items-center justify-center font-bold text-theme-text text-xs border border-theme-text/20 shadow-glow cursor-pointer hover:scale-110 transition-transform"
                  >
                    D
                  </div>
                </div>
              </header>

              {/* Main Workspace Body Content */}
              <main className="flex-1 flex flex-col overflow-y-auto relative p-4 h-full">

                {/* Announcement banner components */}
                {announcement && (
                  <div className="my-2 max-w-7xl mx-auto w-full px-4 relative z-40 transition-all duration-500">
                    <div className="flex items-center gap-4 bg-theme-accent/10 border border-theme-accent/30 text-theme-accent px-6 py-4 rounded-2xl shadow-glow backdrop-blur-md">
                      <Megaphone className="w-6 h-6 animate-pulse" />
                      <div className="flex-1 text-sm md:text-base font-semibold tracking-wide">
                        {announcement}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* ====== VIEW: BROWSE GRID ====== */}
                {currentView === 'browse' && (
                  <div className="max-w-7xl w-full mx-auto px-4 pb-20 flex-1">
                    <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
                      <h1 className="text-4xl md:text-6xl font-bold text-theme-text mb-4 font-sans tracking-tight">
                        Games Library
                      </h1>
                      <p className="text-theme-muted text-sm md:text-base mb-8 max-w-lg">
                        Explore History Revision's premium collection of unblocked games.
                      </p>
                      
                      <div className="relative w-full max-w-xl group">
                        <div className="absolute -inset-0.5 bg-theme-accent opacity-20 group-hover:opacity-40 rounded-full blur transition duration-500"></div>
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted w-5 h-5" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search games..."
                            className="w-full bg-theme-card/90 border border-theme-text/20 rounded-full py-4 pl-12 pr-6 text-theme-text placeholder-theme-muted focus:ring-1 focus:ring-theme-accent focus:border-theme-accent outline-none text-base transition-all backdrop-blur-md shadow-2xl"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Render Filtered Grid List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                      {filteredGames.map(game => (
                        <div 
                          key={game.id} 
                          onClick={() => { setActiveGame(game); setCurrentView('game'); }}
                          className="bg-theme-card/80 border border-theme-text/10 rounded-2xl p-5 hover:border-theme-accent/40 hover:shadow-glow hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-theme-muted border border-theme-text/10 px-2.5 py-1 rounded-full bg-theme-bg/50">
                              {game.category}
                            </span>
                            <h3 className="text-lg font-bold text-theme-text mt-3 tracking-tight group-hover:text-theme-accent">
                              {game.title}
                            </h3>
                            <p className="text-theme-muted text-xs mt-1.5 leading-relaxed line-clamp-2">
                              {game.description}
                            </p>
                          </div>
                          <div className="mt-5 pt-3 border-t border-theme-text/5 flex items-center justify-between text-xs font-bold tracking-wide text-theme-text/60">
                            <span>LAUNCH INTEGRATION</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ====== VIEW: ACTIVE GAME PLAYER ====== */}
                {currentView === 'game' && activeGame && (
                  <div className="flex-col h-full max-w-7xl w-full mx-auto px-4 pb-8 flex flex-1">
                    <div className="flex items-center justify-between py-4 mb-2">
                      <button 
                        onClick={() => setCurrentView('browse')}
                        className="flex items-center gap-2 text-theme-muted hover:text-theme-text bg-theme-text/5 hover:bg-theme-text/10 px-4 py-2 rounded-xl transition-all border border-theme-text/10 hover:border-theme-text/30 backdrop-blur-md font-medium text-sm"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Library
                      </button>
                      
                      <h2 className="text-theme-text font-bold text-lg md:text-xl">
                        {activeGame.title}
                      </h2>

                      <button 
                        onClick={toggleFullscreen}
                        className="flex items-center gap-2 text-theme-muted hover:text-theme-text bg-theme-text/5 hover:bg-theme-text/10 px-4 py-2 rounded-xl transition-all border border-theme-text/10 hover:border-theme-text/30 backdrop-blur-md font-medium text-sm"
                      >
                        <Maximize className="w-4 h-4" /> <span className="hidden sm:inline">Fullscreen</span>
                      </button>
                    </div>

                    <div className="flex-1 w-full h-[65vh] bg-theme-bg rounded-2xl border border-theme-text/10 shadow-glow-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-theme-alt pointer-events-none -z-10">
                        <Loader2 className="w-10 h-10 text-theme-accent/50 animate-spin mb-4" />
                        <span className="text-theme-muted font-retro text-xs animate-pulse">BOOTING CARTRIDGE...</span>
                      </div>
                      
                      <iframe 
                        id="game-iframe" 
                        src={activeGame.url} 
                        className="w-full h-full border-none relative z-10 bg-transparent" 
                        allow="fullscreen; autoplay; keyboard" 
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        title={activeGame.title}
                      />
                    </div>
                  </div>
                )}

                {/* ====== VIEW: SETTINGS ====== */}
                {currentView === 'settings' && (
                  <div className="flex-col h-full max-w-5xl w-full mx-auto px-4 pb-20">
                    <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
                      <h1 className="text-4xl md:text-5xl font-bold text-theme-text mb-4 font-sans tracking-tight">
                        System Settings
                      </h1>
                      <p className="text-theme-muted text-sm md:text-base mb-8 max-w-lg">
                        Customize your arcade experience.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      
                      {/* Theme Selection Panel */}
                      <div className="bg-theme-card border border-theme-text/10 rounded-2xl p-6 shadow-glow transition-all">
                        <h3 className="text-xl font-bold text-theme-text mb-6 flex items-center gap-3 border-b border-theme-text/10 pb-4">
                          <Palette className="w-6 h-6 text-theme-accent" /> Appearance Themes
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {themesList.map(t => {
                            const isActive = t === settings.theme;
                            return (
                              <button
                                key={t}
                                onClick={() => setSettings(prev => ({ ...prev, theme: t }))}
                                className={`px-4 py-3 rounded-xl border transition-all duration-300 font-bold text-xs uppercase tracking-wider ${
                                  isActive 
                                    ? 'bg-theme-accent text-theme-bg border-theme-accent shadow-glow' 
                                    : 'bg-theme-bg text-theme-text border-theme-text/10 hover:border-theme-accent/50 hover:text-theme-accent'
                                }`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Controls & Preferences Panel */}
                      <div className="bg-theme-card border border-theme-text/10 rounded-2xl p-6 shadow-glow flex flex-col gap-8 transition-all">
                        
                        {/* Cloak Link Config */}
                        <div>
                          <h3 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-3 border-b border-theme-text/10 pb-4">
                            <ShieldAlert className="w-6 h-6 text-red-500" /> Cloak Settings
                          </h3>
                          <label className="block text-theme-muted text-xs font-bold mb-3 uppercase tracking-wider">Panic Button URL</label>
                          <div className="flex gap-2">
                            <input 
                              id="cloak-input-field"
                              type="text" 
                              defaultValue={settings.cloakUrl}
                              className="flex-1 bg-theme-bg border border-theme-text/20 rounded-xl px-4 py-3 text-theme-text text-sm focus:outline-none focus:border-theme-accent focus:ring-1 focus:ring-theme-accent transition-all placeholder-theme-muted/50" 
                              placeholder="vle.learning.moe.edu.sg" 
                            />
                            <button 
                              onClick={() => {
                                const inputVal = document.getElementById('cloak-input-field')?.value;
                                if (inputVal !== undefined) handleSaveCloak(inputVal);
                              }}
                              className="bg-theme-accent/20 text-theme-accent hover:bg-theme-accent hover:text-theme-bg border border-theme-accent/30 px-6 py-3 rounded-xl transition-all font-bold text-sm shadow-sm"
                            >
                              Save
                            </button>
                          </div>
                        </div>

                        {/* Effects Preferences */}
                        <div>
                          <h3 className="text-xl font-bold text-theme-text mb-4 flex items-center gap-3 border-b border-theme-text/10 pb-4">
                            <Sparkles className="w-6 h-6 text-theme-accent" /> Visual Effects
                          </h3>
                          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-theme-text/5 transition-colors">
                            <div>
                              <span class="text-theme-text font-bold text-sm block mb-1">Background Particles</span>
                              <span class="text-theme-muted text-xs block">Toggle the interactive canvas background</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={settings.particles}
                                onChange={(e) => setSettings(prev => ({ ...prev, particles: e.target.checked }))}
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-theme-bg border border-theme-text/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-accent"></div>
                            </label>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

              </main>
            </div>
          </div>
        )}

      </div>

      {/* Lobby Hidden Audio Engine Element */}
      <audio ref={audioRef} loop style={{ display: 'none' }} />
    </div>
  );
}
