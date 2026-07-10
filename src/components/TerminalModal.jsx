import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const TerminalModal = ({ activeSection, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, [activeSection]);

  if (!activeSection) return null;

  const renderContent = () => {
    switch (activeSection) {
      case 'bio':
        return (
          <div className="space-y-4">
            {portfolioData.bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            <ul className="mt-4 space-y-2 list-none text-center">
              {portfolioData.bio.highlights.map((h, i) => (
                <li key={i} className="text-accent">
                  {h.link ? (
                    <a href={h.link} target="_blank" rel="noreferrer" className="hover:underline">
                      {h.text} ↗
                    </a>
                  ) : (
                    h.text
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-6">
            {portfolioData.experience.map(exp => (
              <div key={exp.id} className="border-l-2 border-accent pl-4">
                <div className="flex justify-between font-bold">
                  <span>{exp.title}</span>
                  <span className="text-accent">{exp.dateRange}</span>
                </div>
                <div className="text-sm opacity-80 mb-2">{exp.organization}</div>
                <ul className="text-sm list-disc list-outside space-y-1 ml-4 mt-2 text-justify">
                  {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                    <li key={idx} className="leading-relaxed opacity-90">{desc}</li>
                  )) : <p className="opacity-90">{exp.description}</p>}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-6">
            {portfolioData.education.map(edu => (
              <div key={edu.id} className="border-l-2 border-accent pl-4">
                <div className="flex justify-between font-bold">
                  <span>{edu.degree}</span>
                  <span className="text-accent">{edu.dateRange}</span>
                </div>
                <div className="text-sm opacity-80 mb-2">{edu.institution} | {edu.grade}</div>
                <p className="text-sm italic">{edu.notable}</p>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-6">
            {Object.entries(portfolioData.skills).map(([cat, items]) => (
              <div key={cat}>
                <h4 className="mb-2 text-accent">{cat}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span key={skill} className="px-2 py-1 border border-accent text-xs rounded">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'research':
        return (
          <div className="space-y-4">
            {portfolioData.research.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-6">
            {portfolioData.projects.map(proj => (
              <div key={proj.id} className="border border-[rgba(0,240,255,0.3)] p-4 rounded">
                <h4 className="font-bold mb-2 text-accent">{proj.title}</h4>
                <p className="text-sm mb-3">{proj.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <div className="flex gap-2">
                    {proj.tags.map(tag => <span key={tag} className="opacity-70">#{tag}</span>)}
                  </div>
                  <a href={proj.sourceLink} target="_blank" rel="noreferrer" className="hover:underline">VIEW_SOURCE</a>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return <p>ERROR: DATA_CORRUPT</p>;
    }
  };

  const sectionTitles = {
    bio: 'BIO_STATION',
    experience: 'EXP_LOG',
    education: 'ACADEMY_ARCHIVE',
    skills: 'WEAPONS_RACK',
    research: 'RESEARCH_LAB',
    projects: 'MISSION_ARCHIVE'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div 
        ref={modalRef}
        tabIndex="-1"
        className="w-full max-w-2xl max-h-[80vh] bg-[var(--color-terminal-bg)] border border-[var(--color-terminal-border)] rounded shadow-[0_0_30px_rgba(0,240,255,0.2)] flex flex-col overflow-hidden outline-none font-mono text-[var(--color-text-main)]"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-[var(--color-terminal-border)] bg-[rgba(0,240,255,0.05)]">
          <h2 className="text-lg font-bold text-accent tracking-widest glow-text">
            &gt; {sectionTitles[activeSection]}
          </h2>
          <button 
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-accent transition-colors p-1"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t border-[var(--color-terminal-border)] text-xs text-center opacity-50 bg-[rgba(0,240,255,0.02)] tracking-widest">
          PRESS [ESC] TO CLOSE
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
