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
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
