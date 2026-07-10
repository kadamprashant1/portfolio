import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

const HUD = ({ 
  position = { x: 0, y: 0, z: 0 }, 
  velocity = 0,
  stationsVisited = 0,
  totalStations = 6,
  nearestStation = null,
  onSkip
}) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none z-40 p-6 flex flex-col justify-between font-mono text-[var(--color-text-main)] overflow-hidden">
      {/* Top HUD Bar */}
      <div className="flex justify-between items-start">
        <div className="space-y-1 bg-[var(--color-terminal-bg)] p-3 rounded border border-[var(--color-terminal-border)] pointer-events-auto">
          <div className="text-xs opacity-70">CURRENT_POSITION</div>
          <div className="text-accent text-sm md:text-base">
            X: {position.x.toFixed(1).padStart(6, ' ')}
            <br />
            Y: {position.y.toFixed(1).padStart(6, ' ')}
            <br />
            Z: {position.z.toFixed(1).padStart(6, ' ')}
          </div>
          <div className="text-xs opacity-70 mt-2">VELOCITY</div>
          <div className="text-accent text-sm md:text-base">{velocity.toFixed(2)} u/s</div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="bg-[var(--color-terminal-bg)] p-3 rounded border border-[var(--color-terminal-border)] text-right">
            <div className="text-xs opacity-70">DATA_NODES_ACCESSED</div>
            <div className="text-accent text-lg font-bold">{stationsVisited} / {totalStations}</div>
          </div>
          <button 
            onClick={onSkip}
            className="pointer-events-auto bg-[rgba(0,240,255,0.1)] hover:bg-[rgba(0,240,255,0.2)] border border-[var(--color-terminal-border)] px-4 py-2 rounded text-xs text-accent transition-colors backdrop-blur-sm"
          >
            SKIP_TO_DOCS (2D)
          </button>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="pointer-events-auto bg-[rgba(0,240,255,0.1)] hover:bg-[rgba(0,240,255,0.2)] border border-[var(--color-terminal-border)] p-2 rounded text-accent transition-colors backdrop-blur-sm"
            aria-label="Toggle Controls"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-30">
        <div className="w-8 h-[1px] bg-accent absolute"></div>
        <div className="h-8 w-[1px] bg-accent absolute"></div>
        <div className="w-16 h-16 border border-accent rounded-full absolute"></div>
      </div>

      {/* Bottom HUD Bar */}
      <div className="flex justify-between items-end">
        <div className="bg-[var(--color-terminal-bg)] p-3 rounded border border-[var(--color-terminal-border)] pointer-events-auto">
          <div className="text-xs opacity-70">SYS_STATUS</div>
          <div className="flex items-center gap-2 text-accent text-sm md:text-base">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM ONLINE
          </div>
        </div>

        {nearestStation && (
          <div className="bg-[var(--color-terminal-bg)] p-3 rounded border border-[var(--color-terminal-border)] animate-pulse border-accent">
            <div className="text-xs opacity-70">PROXIMITY_ALERT</div>
            <div className="text-accent text-sm font-bold">
              NODE: {nearestStation.name.toUpperCase()}<br/>
              PRESS [E] TO DOCK
            </div>
          </div>
        )}
      </div>

      {/* Controls Overlay */}
      {showHelp && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-terminal-bg)] border border-accent p-6 rounded shadow-[0_0_20px_rgba(0,240,255,0.2)] pointer-events-auto z-50">
          <div className="flex justify-between items-center mb-4 border-b border-accent pb-2">
            <h3 className="text-accent font-bold">FLIGHT_CONTROLS</h3>
            <button onClick={() => setShowHelp(false)} className="text-[var(--color-text-muted)] hover:text-accent"><X size={20}/></button>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between gap-8"><span><kbd className="bg-white/10 px-1 py-0.5 rounded">W</kbd> <kbd className="bg-white/10 px-1 py-0.5 rounded">A</kbd> <kbd className="bg-white/10 px-1 py-0.5 rounded">S</kbd> <kbd className="bg-white/10 px-1 py-0.5 rounded">D</kbd></span> <span>PITCH / YAW</span></li>
            <li className="flex justify-between gap-8"><span><kbd className="bg-white/10 px-1 py-0.5 rounded">SPACE</kbd></span> <span>THRUST</span></li>
            <li className="flex justify-between gap-8"><span><kbd className="bg-white/10 px-1 py-0.5 rounded">SHIFT</kbd></span> <span>BOOST</span></li>
            <li className="flex justify-between gap-8"><span><kbd className="bg-white/10 px-1 py-0.5 rounded">E</kbd></span> <span>DOCK (NEAR NODE)</span></li>
            <li className="flex justify-between gap-8"><span><kbd className="bg-white/10 px-1 py-0.5 rounded">R</kbd></span> <span>RESET POS</span></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HUD;
