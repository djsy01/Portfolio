import { ExternalLink } from "lucide-react";

export interface PublicProjectLinks {
  github?: string | null;
  site?: string | null;
}

interface ProjectLinksProps {
  links: PublicProjectLinks;
  rowClassName: string;
  linkClassName: string;
  onOpenSite: (url: string) => void;
}

export function ProjectLinks({ links: { github, site }, rowClassName, linkClassName, onOpenSite }: ProjectLinksProps) {
  if (!github && !site) return null;

  return (
    <div className={rowClassName}>
      {github && (
        <a href={github} target="_blank" rel="noreferrer" className={linkClassName}>
          <ExternalLink size={16} aria-hidden="true" />
          GitHub
        </a>
      )}
      {site && (
        <button type="button" className={linkClassName} onClick={() => onOpenSite(site)}>
          <ExternalLink size={16} aria-hidden="true" />
          Live Site
        </button>
      )}
    </div>
  );
}
