import type { Metadata } from "next";

import { ArchitectureFlow } from "@/components/home/architecture-flow";
import { ArticleCard } from "@/components/cards/article-card";
import { ProjectCard } from "@/components/cards/project-card";
import { OutcomeCard } from "@/components/home/outcome-card";
import { SectionHeading } from "@/components/home/section-heading";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag-list";
import { siteConfig } from "@/config/site";
import { getPublishedArticles } from "@/lib/content/blog";
import { getAllProjects } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata/create-page-metadata";
import { createWebPageStructuredData } from "@/lib/seo/structured-data";

const outcomes = [
  {
    title: "Prediction",
    description: "Systems that use industrial data to estimate future states, demand, quality, or equipment behavior.",
  },
  {
    title: "Optimization",
    description: "Decision systems that evaluate constraints and identify better operating choices.",
  },
  {
    title: "Anomaly Detection",
    description: "Monitoring systems that surface unusual patterns for investigation and response.",
  },
  {
    title: "Automation",
    description: "Reliable workflows that connect data, models, decisions, and operational actions.",
  },
  {
    title: "Operational Intelligence",
    description: "Systems that turn telemetry and context into information teams can use.",
  },
] as const;

const engineeringFocus = [
  "Production AI",
  "Industrial AI",
  "AI Infrastructure",
  "MLOps",
  "Edge AI",
  "Computer Vision",
  "Industrial Data",
] as const;

const principles = [
  "Production over prototype",
  "Measurable outcomes over model metrics alone",
  "Reliability over unnecessary complexity",
  "Architecture before implementation",
  "Observability from day one",
] as const;

const homepageDescription =
  "Rajat Nath is an AI Systems & Infrastructure Engineer building production AI systems for advanced manufacturing.";

export const metadata: Metadata = createPageMetadata({
  title: "Production AI Systems for Advanced Manufacturing",
  description: homepageDescription,
  path: "/",
});

export default function Home() {
  const featuredArticles = getPublishedArticles().filter(({ metadata: article }) => article.featured);
  const featuredProjects = getAllProjects().filter((project) => project.featured && !project.placeholder);
  return (
    <>
      <JsonLd
        data={createWebPageStructuredData({
          name: "Production AI Systems for Advanced Manufacturing",
          description: homepageDescription,
          path: "/",
        })}
      />

      <Section aria-labelledby="hero-title" spacing="wide">
        <Container>
          <div className="max-w-5xl border-l-2 border-[var(--accent)] pl-6 sm:pl-10">
            <p className="mb-5 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              {siteConfig.professionalTitle}
            </p>
            <h1 id="hero-title" className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Production AI Systems for Advanced Manufacturing
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              Rajat Nath is an AI Systems &amp; Infrastructure Engineer building production AI systems that turn industrial data into reliable predictions, decisions, automation, and operational intelligence.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/systems">Explore Systems</ButtonLink>
              <ButtonLink href="/projects" variant="secondary">View Projects</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="outcomes-title" className="border-t border-[var(--line)]" id="systems">
        <Container>
          <SectionHeading
            eyebrow="01 / What I build"
            id="outcomes-title"
            title="Systems designed around operational outcomes"
            description="Production AI connects data, models, infrastructure, and operational workflows. These are the system outcomes this portfolio will examine."
          />
          <div className="mt-10 grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-5">
            {outcomes.map((outcome, index) => (
              <OutcomeCard {...outcome} index={index + 1} key={outcome.title} />
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="architecture-title" className="border-t border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="02 / System architecture"
            id="architecture-title"
            title="From industrial data to operational decisions"
            description="A production AI system is an operating chain, not an isolated model. Each layer must support the reliability of the next."
          />
          <ArchitectureFlow />
        </Container>
      </Section>

      <Section aria-labelledby="focus-title" className="border-t border-[var(--line)]">
        <Container className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <SectionHeading eyebrow="03 / Engineering focus" id="focus-title" title="The production AI stack" />
          <div className="self-end">
            <TagList label="Engineering focus areas" tags={engineeringFocus} />
          </div>
        </Container>
      </Section>

      {featuredProjects.length ? <Section aria-labelledby="projects-title" className="border-t border-[var(--line)]" id="featured-projects">
        <Container>
          <SectionHeading
            eyebrow="04 / Featured projects"
            id="projects-title"
            title="Engineering case studies"
            description="Verified projects will be added here with their constraints, architecture, implementation status, limitations, and evidence."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {featuredProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}
          </div>
        </Container>
      </Section> : null}

      <Section aria-labelledby="writing-title" className="border-t border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow={`${featuredProjects.length ? "05" : "04"} / Technical writing`}
            id="writing-title"
            title="Notes on production AI engineering"
            description="Published technical writing on architecture, deployment, observability, and reliability in industrial AI systems."
          />
          {featuredArticles.length ? (
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {featuredArticles.map(({ metadata: article }) => <ArticleCard article={article} key={article.slug} />)}
            </div>
          ) : <p className="mt-10 text-[var(--muted)]">No technical article has been published yet.</p>}
        </Container>
      </Section>

      <Section aria-labelledby="principles-title" className="border-t border-[var(--line)]">
        <Container className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <SectionHeading eyebrow={`${featuredProjects.length ? "06" : "05"} / Engineering principles`} id="principles-title" title="How systems should be built" />
          <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {principles.map((principle, index) => (
              <li className="grid grid-cols-[2.5rem_1fr] gap-3 py-5" key={principle}>
                <span aria-hidden="true" className="font-mono text-sm text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{principle}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaSection
        actionHref="/contact"
        actionLabel="Start a technical conversation"
        description="Let's discuss the system, data, constraints, and deployment requirements."
        id="contact"
        title="Have a manufacturing AI problem?"
      />
    </>
  );
}
