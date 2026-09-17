import type { SkillGroup } from './types';

/** Grouped exactly from the stated skill set — nothing inferred or added. */
export const skillGroups: SkillGroup[] = [
  {
    name: 'Mobile Development',
    icon: 'phone',
    skills: ['Flutter / Dart', 'Android Development'],
  },
  {
    name: 'Web Development',
    icon: 'browser',
    skills: ['HTML / CSS / JavaScript', 'Flutter Web'],
  },
  {
    name: 'Backend & Database',
    icon: 'database',
    skills: ['Firebase Authentication & Firestore', 'PHP + MySQL'],
  },
  {
    name: 'Programming Languages',
    icon: 'code',
    skills: ['C', 'C++', 'Java', 'Python'],
  },
  {
    name: 'Tools',
    icon: 'branch',
    skills: ['Git / GitHub'],
  },
];
