import Achievements from "@/components/achievements";
import CommandPalette from "@/components/command-palette";
import Contact from "@/components/contact";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Header from "@/components/header";
import Hero from "@/components/hero";
import MobileFab from "@/components/mobile-fab";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Tldr from "@/components/tldr";
import { contact, education, site } from "@/data/profile";
import { hasResume, profilePhoto } from "@/lib/assets";

export default function Home() {
  const photo = profilePhoto();
  const resume = hasResume();

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${contact.email}`,
    telephone: contact.phoneRaw,
    jobTitle: site.role,
    sameAs: [contact.github, contact.linkedin],
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    knowsAbout: [
      "Java",
      "Spring Boot",
      "TypeScript",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "AWS",
      "Docker",
      "System Design",
    ],
  };

  return (
    <>
      <Header />
      <main>
        <Hero photo={photo} hasResume={resume} />
        <Tldr />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Contact hasResume={resume} />
      </main>
      <CommandPalette hasResume={resume} />
      <MobileFab />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
    </>
  );
}
