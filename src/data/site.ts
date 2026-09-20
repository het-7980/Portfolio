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
  /** Also referenced by index.html, public/sitemap.xml and public/robots.txt. */
  url: 'https://hetchikhaliya.in',
  /** This site's own repository, linked from the footer. */
  repo: 'https://github.com/het-7980/Portfolio',
};
