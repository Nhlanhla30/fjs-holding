import { generatePageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { values, siteConfig } from "@/lib/constants";
import { Shield, Users, Leaf, Target, Eye } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Users,
  Leaf,
};

export const metadata = generatePageMetadata({
  title: "About Us",
  description:
    "Learn about FJS Holding — a South African civil engineering and construction company dedicated to quality craftsmanship, innovation, and client satisfaction.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-surface-dark pt-32 pb-section-sm">
        <div className="container-main">
          <Reveal>
            <SectionLabel>About Us</SectionLabel>
            <h1 className="mt-4 text-display-lg font-heading text-text-inverse text-balance">
              Engineering excellence,{" "}
              <span className="gradient-text">delivered with pride</span>
            </h1>
            <p className="mt-6 text-body-lg text-text-inverse-secondary max-w-2xl">
              FJS Holding is a civil engineering and construction company
              dedicated to providing high-quality services and products in the
              commercial and industrial sectors. We take pride in delivering
              innovative solutions and exceptional results for our clients at
              affordable prices.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-surface">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <SectionLabel>Our Story</SectionLabel>
                <h2 className="mt-4 text-display-md font-heading">
                  A team built on <span className="gradient-text">expertise</span>
                </h2>
                <p className="mt-6 text-body-lg text-text-secondary">
                  With a team of experienced professionals and a strong commitment
                  to excellence, we strive to meet and exceed our clients&apos;
                  expectations. Our services include Civil, Electrical/Electronic,
                  and Mechanical works, as well as the supply of tools and
                  equipment in these fields.
                </p>
                <p className="mt-4 text-body-lg text-text-secondary">
                  Since our founding, we have built a reputation for delivering
                  projects on time, within budget, and to the highest quality
                  standards. Every project we undertake reflects our commitment
                  to craftsmanship and our clients&apos; vision.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-secondary rounded-xl p-6 text-center">
                  <p className="text-display-md font-heading text-accent-600">5+</p>
                  <p className="text-body-sm text-text-secondary mt-1">Years Experience</p>
                </div>
                <div className="bg-surface-secondary rounded-xl p-6 text-center">
                  <p className="text-display-md font-heading text-accent-600">50+</p>
                  <p className="text-body-sm text-text-secondary mt-1">Projects Completed</p>
                </div>
                <div className="bg-surface-secondary rounded-xl p-6 text-center">
                  <p className="text-display-md font-heading text-accent-600">6</p>
                  <p className="text-body-sm text-text-secondary mt-1">Core Services</p>
                </div>
                <div className="bg-surface-secondary rounded-xl p-6 text-center">
                  <p className="text-display-md font-heading text-accent-600">100%</p>
                  <p className="text-body-sm text-text-secondary mt-1">Client Focused</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-surface-secondary">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="card h-full">
                <div className="w-12 h-12 rounded-lg bg-accent-50 flex items-center justify-center mb-5">
                  <Target size={24} className="text-accent-600" />
                </div>
                <h3 className="text-heading-lg font-heading">Our Mission</h3>
                <p className="mt-3 text-body-lg text-text-secondary">
                  Our mission is to provide high-quality products and services to
                  leave our customers with great satisfaction. We offer
                  high-quality Civil, Electrical/Electronic, Mechanical works as
                  well as supply of tools and equipment in the above-mentioned
                  fields.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card h-full">
                <div className="w-12 h-12 rounded-lg bg-accent-50 flex items-center justify-center mb-5">
                  <Eye size={24} className="text-accent-600" />
                </div>
                <h3 className="text-heading-lg font-heading">Our Vision</h3>
                <p className="mt-3 text-body-lg text-text-secondary">
                  To be a leading engineering and construction company in South
                  Africa, recognised for innovation, sustainable practices, and
                  the delivery of world-class infrastructure that transforms
                  communities and drives economic growth.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface-dark">
        <div className="container-main">
          <Reveal>
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="mt-4 text-display-md font-heading text-text-inverse">
              The principles that <span className="gradient-text">guide us</span>
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

      {/* CTA */}
      <section className="section-padding-sm bg-accent-500">
        <div className="container-main text-center">
          <Reveal>
            <h2 className="text-display-md font-heading text-white">
              Ready to work with us?
            </h2>
            <p className="mt-4 text-body-lg text-white/80 max-w-lg mx-auto">
              Let&apos;s discuss how FJS Holding can bring your next project to
              life.
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                arrow
                className="bg-white text-accent-700 hover:bg-primary-50 border-none"
              >
                Get in Touch
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
