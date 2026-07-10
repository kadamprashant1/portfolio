import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Code } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const FallbackPage = () => {
  const { profile, bio, experience, education, skills, research, projects } = portfolioData;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-16">
      {/* Hero Section */}
      <header className="flex flex-col gap-6 items-center border-b border-[var(--color-terminal-border)] pb-12">
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-accent glow-border shrink-0">
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-accent glow-text">{profile.name}</h1>
          <h2 className="text-xl md:text-2xl font-mono text-[var(--color-text-muted)]">/// {profile.role}</h2>
          <p className="italic font-mono text-sm opacity-80">"{profile.tagline}"</p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {profile.badges.map(badge => (
              <span key={badge} className="px-3 py-1 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] rounded-full text-xs font-mono text-accent">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* About Me */}
      <section>
        <h3 className="text-2xl mb-6 font-mono text-center text-accent tracking-widest border-b border-[var(--color-terminal-border)] pb-2">## BIO_STATION</h3>
        <div className="space-y-4 text-lg leading-relaxed">
          {bio.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {bio.highlights.map((h, i) => (
            <li key={i} className="bg-[var(--color-terminal-bg)] p-4 rounded border border-[var(--color-terminal-border)] font-mono text-sm flex items-center justify-center text-center gap-2">
              {h.link ? (
                <a href={h.link} target="_blank" rel="noreferrer" className="text-accent hover:underline flex items-center gap-2">
                  {h.text} ↗
                </a>
              ) : (
                <span>{h.text}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Work Experience */}
      <section>
        <h3 className="text-2xl mb-6 font-mono text-center text-accent tracking-widest border-b border-[var(--color-terminal-border)] pb-2">## EXP_LOG</h3>
        <div className="space-y-8">
          {experience.map(exp => (
            <div key={exp.id} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-accent before:rounded-full before:glow-border border-l border-[var(--color-terminal-border)] pb-8 last:border-0 last:pb-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                <h4 className="text-xl font-bold">{exp.title}</h4>
                <span className="font-mono text-accent text-sm">{exp.dateRange}</span>
              </div>
              <p className="text-[var(--color-text-muted)] font-mono mb-3">{exp.organization}</p>
              <ul className="list-disc list-outside space-y-2 ml-6 text-justify">
                {Array.isArray(exp.description) ? exp.description.map((desc, idx) => (
                  <li key={idx} className="leading-relaxed">{desc}</li>
                )) : <p>{exp.description}</p>}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 className="text-2xl mb-6 font-mono text-center text-accent tracking-widest border-b border-[var(--color-terminal-border)] pb-2">## ACADEMY_ARCHIVE</h3>
        <div className="grid gap-6">
          {education.map(edu => (
            <div key={edu.id} className="bg-[var(--color-terminal-bg)] p-6 rounded border border-[var(--color-terminal-border)]">
              <div className="flex flex-col md:flex-row md:justify-between mb-2">
                <h4 className="text-lg font-bold">{edu.degree}</h4>
                <span className="font-mono text-accent text-sm">{edu.dateRange}</span>
              </div>
              <p className="text-[var(--color-text-muted)] mb-2">{edu.institution} | {edu.grade}</p>
              <p className="text-sm italic border-t border-[var(--color-terminal-border)] pt-2 mt-2">{edu.notable}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-2xl mb-6 font-mono text-center text-accent tracking-widest border-b border-[var(--color-terminal-border)] pb-2">## WEAPONS_RACK</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-mono text-[var(--color-text-muted)] mb-3">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-sm hover:border-accent hover:text-accent transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research */}
      <section>
        <h3 className="text-2xl mb-6 font-mono text-center text-accent tracking-widest border-b border-[var(--color-terminal-border)] pb-2">## RESEARCH_LAB</h3>
        <div className="bg-[var(--color-terminal-bg)] p-6 rounded border border-[var(--color-terminal-border)] space-y-4">
          {research.paragraphs.map((p, i) => (
             <p key={i} dangerouslySetInnerHTML={{
               __html: p.split(' ').map(word => 
                 research.keyTerms.some(term => word.toLowerCase().includes(term.toLowerCase())) 
                   ? `<strong class="text-accent">${word}</strong>` 
                   : word
               ).join(' ')
             }} />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h3 className="text-2xl mb-6 font-mono border-l-4 border-accent pl-4 text-accent">## MISSION_ARCHIVE</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map(proj => (
            <div key={proj.id} className="group bg-[var(--color-terminal-bg)] p-6 rounded border border-[var(--color-terminal-border)] hover:border-accent hover:glow-border transition-all flex flex-col h-full">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Code size={20} className="text-accent" /> {proj.title}
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-[var(--color-text-muted)]">#{tag}</span>
                ))}
              </div>
              <p className="flex-grow mb-6 text-sm">{proj.description}</p>
              <a href={proj.sourceLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-accent hover:text-white transition-colors uppercase text-sm self-start">
                <FaGithub size={16} /> View Source
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-[var(--color-terminal-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-[var(--color-text-muted)]">
        <div className="flex items-center gap-4">
          <span>{profile.version}</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ONLINE</span>
        </div>
        <div className="flex gap-4">
          <a href={profile.github} className="hover:text-accent transition-colors"><FaGithub size={20} /></a>
          <a href={profile.linkedin} className="hover:text-accent transition-colors"><FaLinkedin size={20} /></a>
          <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors"><Mail size={20} /></a>
        </div>
        <div>COORD: 42.3601 N, 71.0589 W</div>
      </footer>
    </div>
  );
};

export default FallbackPage;
