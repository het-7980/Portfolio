/** Site-wide configuration: navigation, SEO copy and footer tagline. */

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const;

export const site = {
  tagline: 'Building mobile and web applications.',
  /** Set once the site is deployed so social/canonical tags resolve. */
  url: '',
};
