/** Shape of every piece of content rendered by the site. */

export interface SocialLink {
  label: string;
  href: string;
  /** Key into the icon set in `src/lib/icons.ts`. */
  icon: string;
}

export interface Profile {
  name: string;
  title: string;
  intro: string;
  location?: string;
  email: string;
  /** Path under `public/`, e.g. `/profile.jpg`. Omitted when no photo is used. */
  photo?: string;
  photoAlt?: string;
  socials: SocialLink[];
}

export interface AboutContent {
  paragraphs: string[];
  highlights: Array<{ label: string; value: string }>;
}

export interface SkillGroup {
  name: string;
  icon: string;
  skills: string[];
}

export interface Project {
  name: string;
  tagline: string;
  problem: string;
  role: string;
  tech: string[];
  features: string[];
  category: string;
  /** Path under `public/`. When absent the card renders a generated monogram cover. */
  image?: string;
  imageAlt?: string;
  repo?: string;
  demo?: string;
  featured?: boolean;
}

export interface EducationEntry {
  qualification: string;
  institution: string;
  startYear: string;
  endYear: string;
  /** Free-form notes: specialisation, coursework, achievements. */
  details: string[];
}
