import { generatePageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/constants";
import {
  Building2,
  ClipboardCheck,
  Wrench,
  Layers,
  Hammer,
  Compass,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  ClipboardCheck,
  Wrench,
  Layers,
  Hammer,
  Compass,
};

export const metadata = generatePageMetadata({
  title: "Our Services",
  description:
    "FJS Holding offers commercial construction, project management, engineering services, construction materials, renovation, and architectural services across South Africa.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-surface-dark pt-32 pb-section-sm">
        <div className="container-main">
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
            <h1 className="mt-4 text-display-lg font-heading text-text-inverse text-balance">
              End-to-end engineering{" "}
              <span className="gradient-text">& construction services</span>
            </h1>
            <p className="mt-6 text-body-lg text-text-inverse-secondary max-w-2xl">
              From initial architectural design to project completion, we
              provide comprehensive services that cover every aspect of the
              construction lifecycle.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <Reveal key={service.id} delay={i * 0.08}>
                  <div className="card group h-full flex flex-col">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-100 transition-colors">
                        {Icon && (
                          <Icon size={28} className="text-accent-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-heading-lg font-heading">
                          {service.title}
                        </h2>
                        <p className="mt-3 text-body-md text-text-secondary leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-surface-dark">
        <div className="container-main text-center">
          <Reveal>
            <h2 className="text-display-md font-heading text-text-inverse">
              Need a service not listed?
            </h2>
            <p className="mt-4 text-body-lg text-text-inverse-secondary max-w-lg mx-auto">
              We offer custom solutions tailored to your specific project
              requirements. Let&apos;s talk about what you need.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg" arrow>
                Discuss Your Project
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
