import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, navigation } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark border-t border-border-dark">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">FJS</span>
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-text-inverse">
                FJS{" "}
                <span className="text-accent-400">Holding</span>
              </span>
            </Link>
            <p className="mt-4 text-body-sm text-text-inverse-secondary max-w-xs">
              A civil engineering and construction company dedicated to
              delivering high-quality services and innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-text-inverse mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-text-inverse-secondary hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-body-sm text-text-inverse-secondary hover:text-accent-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-text-inverse mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/services"
                  className="text-body-sm text-text-inverse-secondary hover:text-accent-400 transition-colors"
                >
                  Commercial Construction
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-body-sm text-text-inverse-secondary hover:text-accent-400 transition-colors"
                >
                  Project Management
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-body-sm text-text-inverse-secondary hover:text-accent-400 transition-colors"
                >
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-body-sm text-text-inverse-secondary hover:text-accent-400 transition-colors"
                >
                  Renovation & Remodeling
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-text-inverse mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-body-sm text-text-inverse-secondary hover:text-accent-400 transition-colors group"
                >
                  <Mail
                    size={16}
                    className="text-accent-500 group-hover:text-accent-400 flex-shrink-0"
                  />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex items-center gap-3 text-body-sm text-text-inverse-secondary hover:text-accent-400 transition-colors group"
                >
                  <Phone
                    size={16}
                    className="text-accent-500 group-hover:text-accent-400 flex-shrink-0"
                  />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-body-sm text-text-inverse-secondary">
                  <MapPin
                    size={16}
                    className="text-accent-500 flex-shrink-0"
                  />
                  {siteConfig.location}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-text-tertiary">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-body-sm text-text-tertiary">
            Developed by{" "}
            <a
              href="https://nkosihut.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 transition-colors"
            >
              Nkosi Hut
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
