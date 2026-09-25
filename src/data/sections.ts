/**
 * The page's sections in document order. This is the single contents listing:
 * the masthead renders its links from here, and the scroll spy derives the
 * sections it watches from those same links.
 */
export const sections = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const;
