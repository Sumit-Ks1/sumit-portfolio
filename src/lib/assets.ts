import { existsSync } from "node:fs";
import { join } from "node:path";

const inPublic = (file: string) => existsSync(join(process.cwd(), "public", file));

// Drop a photo at public/profile.jpg (or .jpeg/.png/.webp) and it shows up in the hero.
export function profilePhoto(): string | null {
  const candidates = ["profile.jpg", "profile.jpeg", "profile.png", "profile.webp"];
  const found = candidates.find(inPublic);
  return found ? `/${found}` : null;
}

// Drop a résumé at public/resume.pdf to enable the download buttons everywhere.
export function hasResume(): boolean {
  return inPublic("resume.pdf");
}
