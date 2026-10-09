export interface HackathonItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  project: string;
  date: string;
  year: string;
  result: string;
  resultBadge: string;
  image: string;
  statement: string;
  description: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  technologies: string[];
  category: string;
}

export type HackathonDesignMode = 'dossier' | 'blades' | 'timeline' | 'bento' | 'original';
