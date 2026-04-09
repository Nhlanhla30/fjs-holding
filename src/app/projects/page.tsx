import { generatePageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { projects } from "@/lib/constants";
import Image from "next/image";

export const metadata = generatePageMetadata({
  title: "Our Projects",
  description:
    "Explore FJS Holding's portfolio of completed construction and engineering projects including bund walls, oil storage facilities, and structural rehabilitation.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-surface-dark pt-32 pb-section-sm">
        <div className="container-main">
          <Reveal>
            <SectionLabel>Our Projects</SectionLabel>
            <h1 className="mt-4 text-display-lg font-heading text-text-inverse text-balance">
              Built with precision,{" "}
              <span className="gradient-text">delivered with pride</span>
            </h1>
            <p className="mt-6 text-body-lg text-text-inverse-secondary max-w-2xl">
              Every project is a testament to our commitment to quality,
              safety, and innovation. Explore our recent work below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-surface">
        <div className="container-main space-y-24">
          {projects.map((project, i) => (
            <Reveal key={project.id}>
              <div>
                {/* Project Header */}
                <div className="mb-8">
                  <span className="text-label uppercase tracking-widest text-accent-600 font-heading">
                    {project.category}
                  </span>
                  <h2 className="mt-2 text-display-md font-heading">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-body-lg text-text-secondary max-w-2xl">
                    {project.description}
                  </p>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((img, j) => (
                    <Reveal key={img} delay={j * 0.1}>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-surface-secondary group">
                        <Image
                          src={img}
                          alt={`${project.title} — Photo ${j + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-accent-500">
        <div className="container-main text-center">
          <Reveal>
            <h2 className="text-display-md font-heading text-white">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-body-lg text-white/80 max-w-lg mx-auto">
              We&apos;d love to hear about your next construction or engineering
              project. Let&apos;s build something great together.
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                arrow
                className="bg-white text-accent-700 hover:bg-primary-50 border-none"
              >
                Start a Conversation
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
