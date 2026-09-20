export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Articles", href: "/articles" },
  { label: "Services", href: "/services" },
  // { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

/**
 * Footer "Resources" column. Entries whose pages don't exist yet stay
 * commented out (same convention as the Resume entry above) — uncomment
 * when the page ships rather than linking a 404.
 */
export const footerResourceNav: NavItem[] = [
  { label: "Blog", href: "/articles" },
    { label: "Projects", href: "/projects" },
    { label: "Case Studies", href: "/case-studies" },
     { label: "Services", href: "/services" },
];

export const footerExploreeNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  // { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
