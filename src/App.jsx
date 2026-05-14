import React, { useState, useEffect } from 'react';
import { BookOpen, Monitor, ShieldAlert } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNgCgAA_hMsGUTlv-jSJMq_Jnw1pvl0Rs",
  authDomain: "sonion-7ff4c.firebaseapp.com",
  projectId: "sonion-7ff4c",
  databaseURL: "https://sonion-7ff4c-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [view, setView] = useState('launcher'); // launcher, home, main
  const [theme, setTheme] = useState('default');

  const launchCloaked = () => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.write(`
        <html>
          <body style="margin:0;padding:0;">
            <iframe src="${window.location.href}" style="width:100%;height:100%;border:none;"></iframe>
          </body>
        </html>
      `);
      window.location.replace('https://vle.learning.moe.edu.sg');
    } else {
      alert("Please allow popups for cloaking to work!");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans text-white bg-black`}>
      
      {/* LAUNCHER VIEW */}
      {view === 'launcher' && (
        <div className="flex flex-col items-center justify-center h-screen w-full p-6 bg-zinc-950">
          <div className="text-center space-y-6 max-w-lg bg-zinc-900 p-12 rounded-3xl border border-white/10 shadow-2xl">
            <BookOpen className="w-16 h-16 mx-auto text-white mb-4" />
            <h2 className="text-3xl font-bold">History Notes 📖</h2>
            <p className="text-zinc-400 text-sm">Explore Singapore's history securely. Click below to begin.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={launchCloaked}
                className="px-10 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <ShieldAlert size={18} /> Launch Cloaked
              </button>
              <button 
                onClick={() => setView('home')}
                className="px-10 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <Monitor size={18} /> Open Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HOME VIEW (The "HR" Screen) */}
      {view === 'home' && (
        <div className="flex flex-col items-center justify-center h-screen w-full p-6 animate-in fade-in duration-700">
          <div className="text-center space-y-8">
            <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              HR
            </h1>
            <p className="text-zinc-500 tracking-[0.5em] uppercase text-sm">History Revisions 2</p>
            <button 
              onClick={() => alert("System Loading...")}
              className="px-12 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all uppercase tracking-widest"
            >
              Enter System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
