import React, { useState, useEffect } from 'react';
import FlightScene from './components/FlightScene';
import HUD from './components/HUD';
import TerminalModal from './components/TerminalModal';
import FallbackPage from './components/FallbackPage';

function App() {
  const [viewState, setViewState] = useState('landing'); // landing, flight, fallback
  const [activeSection, setActiveSection] = useState(null);
  const [visitedStations, setVisitedStations] = useState(new Set());
  
  // HUD State
  const [hudData, setHudData] = useState({
    position: { x: 0, y: 0, z: 0 },
    velocity: 0,
    nearestStation: null
  });

  const handleHUDUpdate = (key, value) => {
    setHudData(prev => ({ ...prev, [key]: value }));
  };

  const handleDock = (stationId) => {
    setVisitedStations(prev => new Set(prev).add(stationId));
    setActiveSection(stationId);
  };

  const closeDock = () => {
    setActiveSection(null);
  };

  // Prevent scroll when in flight mode
  useEffect(() => {
    if (viewState === 'flight') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [viewState]);

  if (viewState === 'landing') {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[var(--color-bg)] text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
        <div className="z-10 space-y-8 max-w-2xl">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-accent glow-text tracking-widest">
              MISSION CONTROL
            </h1>
            <h2 className="text-lg md:text-xl font-mono text-[var(--color-text-muted)] tracking-widest">
              PORTFOLIO // SYS v3.0
            </h2>
          </div>
          
          <div className="bg-[var(--color-terminal-bg)] border border-accent p-6 rounded text-left font-mono text-sm leading-relaxed shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <p className="mb-4"><span className="text-accent">&gt;</span> WELCOME PILOT.</p>
            <p className="mb-4">
              Your mission is to navigate the orbital data nodes to review credentials, experience logs, and project archives. 
            </p>
            <p className="text-accent opacity-80">
              WARNING: 3D Flight Interface requires keyboard input. For a standard 2D view, engage the SKIP_TO_DOCS protocol.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
            <button 
              onClick={() => setViewState('flight')}
              className="bg-[rgba(0,240,255,0.2)] hover:bg-[rgba(0,240,255,0.4)] border border-accent px-8 py-3 rounded font-mono font-bold text-accent transition-all hover:scale-105"
            >
              BEGIN MISSION [3D]
            </button>
            <button 
              onClick={() => setViewState('fallback')}
              className="bg-transparent hover:bg-white/5 border border-[var(--color-text-muted)] px-8 py-3 rounded font-mono text-[var(--color-text-muted)] transition-all"
            >
              SKIP TO DOCS [2D]
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === 'fallback') {
    return (
      <div className="min-h-screen pb-12 relative">
        <button 
          onClick={() => setViewState('landing')}
          className="fixed top-4 left-4 bg-[var(--color-terminal-bg)] border border-[var(--color-terminal-border)] px-4 py-2 rounded text-xs font-mono hover:text-accent hover:border-accent transition-colors z-50 backdrop-blur-sm"
        >
          &lt; ABORT TO MAIN
        </button>
        <FallbackPage />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <FlightScene onHUDUpdate={handleHUDUpdate} onDock={handleDock} />
      
      {!activeSection && (
        <HUD 
          position={hudData.position}
          velocity={hudData.velocity}
          nearestStation={hudData.nearestStation}
          stationsVisited={visitedStations.size}
          totalStations={6}
          onSkip={() => setViewState('fallback')}
        />
      )}
      
      <TerminalModal 
        activeSection={activeSection} 
        onClose={closeDock} 
      />
    </div>
  );
}

export default App;
