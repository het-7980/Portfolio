import type { Project } from './types';

export const projects: Project[] = [
  {
    name: 'ResUniq',
    tagline:
      'A resume builder app that lets users create, manage and export polished resumes from their phone, with AI assistance for writing the content.',
    problem:
      'Building a well-structured resume is slow and unfamiliar for many students and first-time job seekers — good templates are scattered, and phrasing an objective or role-specific bullet points is the hardest part. ResUniq brings guided creation, ready-made templates, AI-assisted wording and instant PDF export together in one app.',
    role: 'Team of 5 — built the complete application.',
    tech: ['Flutter / Dart', 'Firebase Authentication', 'Firestore', 'Git / GitHub'],
    featured: true,
    features: [
      'Secure user authentication with email/password and Google Sign-In via Firebase Authentication.',
      'Resume creation and management — create, edit, save, rename and revisit multiple resumes from a personal resume list.',
      'AI-assisted content that helps generate professional resume objectives and job-role-based sections.',
      'Multiple templates with in-app preview before download.',
      'PDF generation and download of the finished resume.',
    ],
    category: 'Mobile App',
    repo: 'https://github.com/het-7980/ResUniq',
  },
];
