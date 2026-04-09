import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { siteConfig, services, projects, values, stats } from "@/lib/constants";
import {
  Building2,
  ClipboardCheck,
  Wrench,
  Layers,
  Hammer,
  Compass,
  Shield,
  Users,
  Leaf,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Building2,
  ClipboardCheck,
  Wrench,
  Layers,
  Hammer,
  Compass,
  Shield,
  Users,
  Leaf,
};

export default function HomePage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="relative min-h-screen flex items-center bg-surface-dark overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        {/* Accent glow */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />

        <div className="container-main relative z-10 py-32">
          <div className="max-w-3xl">
            <Reveal>
              <SectionLabel>Engineering Excellence Since {siteConfig.foundedYear}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 text-display-xl font-heading text-text-inverse text-balance">
                We build the{" "}
                <span className="gradient-text">infrastructure</span> that
                powers progress.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-body-lg text-text-inverse-secondary max-w-xl">
                {siteConfig.description}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" size="lg" arrow>
                  Get a Quote
                </Button>
                <Button href="/projects" variant="secondary" size="lg">
                  View Our Projects
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Stats bar */}
          <Reveal delay={0.4}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border-dark pt-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-display-md font-heading text-accent-400">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-body-sm text-text-inverse-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== SERVICES PREVIEW ====== */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <Reveal>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="mt-4 text-display-md font-heading">
              Comprehensive engineering{" "}
              <span className="gradient-text">solutions</span>
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary max-w-xl">
              From commercial construction to architectural design, we deliver
              end-to-end services that bring your vision to life.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <Reveal key={service.id} delay={i * 0.1}>
                  <div className="card group h-full">
                    <div className="w-12 h-12 rounded-lg bg-accent-50 flex items-center justify-center mb-5 group-hover:bg-accent-100 transition-colors">
                      {Icon && <Icon size={24} className="text-accent-600" />}
                    </div>
                    <h3 className="text-heading-md font-heading">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-body-md text-text-secondary">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-10 text-center">
              <Button href="/services" variant="outline" arrow>
                View All Services
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== VALUES ====== */}
      <section className="section-padding bg-surface-dark">
        <div className="container-main">
          <Reveal>
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="mt-4 text-display-md font-heading text-text-inverse">
              Built on <span className="gradient-text">values</span> that matter
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = iconMap[value.icon];
              return (
                <Reveal key={value.title} delay={i * 0.1}>
                  <div className="card-dark h-full">
                    <div className="w-12 h-12 rounded-lg bg-accent-500/10 flex items-center justify-center mb-5">
                      {Icon && <Icon size={24} className="text-accent-400" />}
                    </div>
                    <h3 className="text-heading-md font-heading text-text-inverse">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-body-md text-text-inverse-secondary">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="section-padding-sm bg-accent-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="container-main relative z-10 text-center">
          <Reveal>
            <h2 className="text-display-md font-heading text-white">
              Ready to start your project?
            </h2>
            <p className="mt-4 text-body-lg text-white/80 max-w-lg mx-auto">
              Get in touch with us today to discuss your requirements. We&apos;ll
              provide a detailed quote within 24 hours.
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                arrow
                className="bg-white text-accent-700 hover:bg-primary-50 border-none"
              >
                Contact Us Now
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
