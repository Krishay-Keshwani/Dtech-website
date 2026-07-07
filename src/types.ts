export interface UpdateNews {
  id: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  details?: string[];
  education?: string[];
  avatarSeed: string; // for custom stylized generated SVG avatars
}

export interface InternMember {
  name: string;
  role: string;
  quote: string;
  avatarSeed: string;
}

export interface SandboxStatus {
  activeHazard: 'none' | 'flood' | 'seismic';
  sensorValue: number;
  alertLevel: 'normal' | 'warn' | 'critical';
  robotStatus: 'idle' | 'scanning' | 'navigating' | 'active';
  logs: string[];
}
