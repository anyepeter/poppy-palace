// Site content types for admin management

export interface Dog {
  id: number;
  name: string;
  breed: string;
  age: string;
  size: string;
  personality: string[];
  description: string;
  images: string[]; // Changed from single image to array
  location: string;
  isSponsored: boolean;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
  };
  stats: Stat[];
  features: Feature[];
  cta: {
    title: string;
    description: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  experience: string;
}

export interface AboutContent {
  mission: {
    title: string;
    description: string;
  };
  story: {
    title: string;
    paragraphs: string[];
  };
  values: Feature[];
  team: TeamMember[];
}

export interface ProcessStep {
  title: string;
  description: string;
  duration: string;
}

export interface Requirement {
  title: string;
  description: string;
}

export interface AdoptionFee {
  category: string;
  fee: string;
  includes: string;
}

export interface ProcessContent {
  header: {
    title: string;
    description: string;
  };
  steps: ProcessStep[];
  requirements: Requirement[];
  fees: AdoptionFee[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
  hours: string;
}

export interface SiteContent {
  home: HomeContent;
  about: AboutContent;
  process: ProcessContent;
  contact: ContactInfo;
}
