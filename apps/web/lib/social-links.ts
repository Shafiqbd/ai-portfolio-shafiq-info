import type { ComponentType, SVGProps } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon, YoutubeIcon } from "@/components/common/brand-icons";
import type { Profile } from "@shafiq-info/types";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const SOCIAL_ICON_MAP: Record<string, IconComponent> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  YouTube: YoutubeIcon,
  Facebook: FacebookIcon,
  Email: Mail,
};

// Generic platform homepages — used only until a real profile URL is set in
// data/profile.json, so the icons are clickable rather than dead links.
const FALLBACK_URL: Record<string, string> = {
  GitHub: "https://github.com/Shafiqbd",
  LinkedIn: "https://www.linkedin.com/in/shafiq-info",
  YouTube: "https://www.youtube.com/@shafiqdotinfo",
  Facebook: "https://www.facebook.com/shafiq.info.bd",
  Email: "mailto:shafiqinfo.dev@gmail.com",
};

export interface SocialItem {
  label: string;
  Icon: IconComponent;
  href: string;
  external: boolean;
}

export function getSocialItems(profile: Profile): SocialItem[] {
  return profile.socialLinks
    .filter((link) => link.platform in SOCIAL_ICON_MAP)
    .map((link) => {
      const href = link.url || FALLBACK_URL[link.platform];
      return {
        label: link.platform,
        Icon: SOCIAL_ICON_MAP[link.platform],
        href,
        external: !href.startsWith("mailto:"),
      };
    });
}
