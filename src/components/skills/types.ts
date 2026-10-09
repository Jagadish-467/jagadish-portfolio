import React from 'react';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  domain: 'systems' | 'quantum' | 'aiml' | 'protocols' | 'web';
  logo: React.ReactNode;
  brandColor: string;
  brandGlow: string;
  proficiency?: 'Mastery' | 'Production' | 'Advanced' | 'Core';
  experience?: string;
  badge?: string;
  highlight?: boolean;
  projectAssociation?: string;
  description?: string;
}

export interface DomainPillar {
  number: string;
  id: 'quantum' | 'protocols' | 'aiml' | 'web';
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metricLabel: string;
  metricValue: string;
  accentColor: string;
  glowColor: string;
  featuredTechs: string[];
}
