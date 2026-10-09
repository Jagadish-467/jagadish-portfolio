import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, X, CheckCircle2, Shield, Cpu, Network } from 'lucide-react';

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Distributed & Systems' | 'Quantum & AI' | 'Fullstack & Apps' | '3D & Creative' | 'Fullstack' | 'Systems & AI' | 'DISTRIBUTED & SYSTEMS' | 'QUANTUM & AI' | 'FULL-STACK & APPS';
  summary: string;
  description: string[];
  techStack: string[];
  architectureHighlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: string;
  year?: string;
  techBadge?: string;
  previewImage?: string;
  keyTags?: string[];
}

interface ProjectCardProps {
  project: ProjectData;
  onOpenModal?: (project: ProjectData) => void;
}

export const ProjectModal: React.FC<{ project: ProjectData | null; onClose: () => void }> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="project-modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="project-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs font-bold text-[#10b981] tracking-wider">
            // {project.number} ARCHITECTURAL SPEC
          </span>
          <span className="text-[0.65rem] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
            {project.status}
          </span>
          {project.year && (
            <span className="text-[0.65rem] font-mono text-[#00f0ff] ml-auto">
              RELEASE: {project.year}
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          {project.title}
        </h2>
        <p className="font-mono text-sm text-[#10b981] font-semibold mb-6">
          {project.subtitle}
        </p>

        {/* Preview image if available */}
        {project.previewImage && (
          <div className="mb-6 rounded-xl overflow-hidden border border-white/10 max-h-[220px]">
            <img 
              src={project.previewImage} 
              alt={project.title}
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Architectural Highlights */}
        <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-gray-300 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#10b981]" />
            Key Engineering Deliverables &amp; Pillars
          </h4>
          <ul className="space-y-2">
            {project.architectureHighlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Description */}
        <div className="mb-6 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-gray-300">
            Technical Blueprint &amp; Workflow
          </h4>
          {project.description.map((paragraph, idx) => (
            <p key={idx} className="text-sm text-gray-400 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Full Tech Arsenal */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-gray-300 mb-2.5 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#10b981]" />
            Technology Stack Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-gray-200 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-[0.7rem] font-mono text-gray-400">
            AUTHOR: PONNADA JAGADISH KUMAR • B.TECH CSE
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white font-mono text-xs font-semibold hover:bg-[#10b981] hover:text-black transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white font-mono text-xs font-semibold hover:border-[#10b981] hover:text-[#10b981] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LAUNCH APPLICATION</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="project-card-root group">
        <div>
          {/* Card Top Row: Number & Category Badge */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="project-card-number">{project.number}</span>
            <span className="font-mono text-[0.68rem] tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/10 text-gray-700 font-medium">
              {project.category}
            </span>
          </div>

          {/* Project Title & Subtitle */}
          <h3 className="project-card-title group-hover:text-[#10b981] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="project-card-subtitle">
            {project.subtitle}
          </p>

          {/* Summary description */}
          <p className="project-card-desc">
            {project.summary}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.slice(0, 5).map((tech) => (
              <span key={tech} className="project-card-tag">
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="project-card-tag font-semibold text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20">
                +{project.techStack.length - 5} MORE
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Action Buttons */}
        <div className="pt-4 border-t border-black/10 flex items-center justify-between mt-auto">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-black group-hover:text-[#10b981] transition-colors"
          >
            <span>DEEP DIVE / ARCH</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-gray-600 hover:text-black hover:border-black/30 hover:bg-black/5 transition-all"
                aria-label={`View ${project.title} source on GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-gray-600 hover:text-black hover:border-black/30 hover:bg-black/5 transition-all"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Deep-Dive Architectural Modal */}
      <ProjectModal 
        project={isModalOpen ? project : null} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
