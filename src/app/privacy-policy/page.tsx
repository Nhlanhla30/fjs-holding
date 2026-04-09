import { generatePageMetadata } from "@/lib/metadata";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig } from "@/lib/constants";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-surface pt-32 pb-section">
      <div className="container-main max-w-content">
        <Reveal>
          <SectionLabel>Legal</SectionLabel>
          <h1 className="mt-4 text-display-md font-heading">Privacy Policy</h1>
          <p className="mt-4 text-body-sm text-text-tertiary">
            Last updated: {new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 prose prose-lg max-w-none text-text-secondary [&_h2]:text-text-primary [&_h2]:font-heading [&_h2]:text-heading-md [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-text-primary [&_h3]:font-heading [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_li]:leading-relaxed">
            <h2>Introduction</h2>
            <p>
              {siteConfig.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your
              privacy and is committed to protecting your personal data. This
              privacy policy explains how we collect, use, and safeguard your
              information when you visit our website at {siteConfig.url}.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Contact information</strong> you provide through our
                contact form, including your name, email address, phone number,
                company name, and project details.
              </li>
              <li>
                <strong>Usage data</strong> collected automatically, including
                your IP address, browser type, pages visited, and time spent on
                our site.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your enquiries and provide quotes</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Data Protection</h2>
            <p>
              We implement appropriate technical and organisational measures to
              protect your personal data against unauthorised access, alteration,
              disclosure, or destruction. In accordance with the Protection of
              Personal Information Act (POPIA) of South Africa, we ensure that
              your data is processed lawfully and transparently.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              Our website may use third-party services such as Formspree for
              form handling and Vercel for hosting. These services have their own
              privacy policies governing how they handle your data.
            </p>

            <h2>Your Rights</h2>
            <p>
              Under POPIA, you have the right to access, correct, or delete your
              personal information. To exercise these rights, please contact us
              at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent-600 hover:text-accent-700"
              >
                {siteConfig.email}
              </a>
              .
            </p>

            <h2>Contact</h2>
            <p>
              If you have any questions about this privacy policy, please
              contact us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent-600 hover:text-accent-700"
              >
                {siteConfig.email}
              </a>{" "}
              or call us on{" "}
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="text-accent-600 hover:text-accent-700"
              >
                {siteConfig.phone}
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
